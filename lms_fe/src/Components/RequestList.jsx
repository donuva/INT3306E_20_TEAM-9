import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { List, Card, message, Button } from "antd";
import Sidebar from "./Sidebar";
import axios from "axios";

import "../CSS/RequestList.css"; // Import file CSS cho component

export default function RequestList({ isTeacher, checkTokenExpiration }) {
    const { cid } = useParams();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [students, setStudents] = useState([]);

    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (!checkTokenExpiration()) {
            alert("You need to re-login");
            navigate("/login");
        }
    }, [checkTokenExpiration, navigate]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/lms/teacher/getRequestList/${cid}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            })
            .then((response) => {
                setRequests(response.data.map(request => ({ ...request, isButtonClicked: false })));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [cid]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/lms/teacher/courses/${cid}/students`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            })
            .then((response) => {
                setStudents(response.data.map(student => ({ ...student, isButtonClicked: false })));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [cid]);

    const handleAcceptRequest = (id) => {
        const updatedRequests = requests.map(request => {
            if (request.id === id) {
                return { ...request, isButtonClicked: true };
            }
            return request;
        });

        setRequests(updatedRequests);

        const currentItem = updatedRequests.find(request => request.id === id);

        axios.post(`http://localhost:8080/lms/teacher/acceptRequest/${id}?code=1`, null, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((response) => {
            messageApi.open({
                type: 'success',
                content: 'Accepted request',
                duration: 5,
            });
        }).catch((error) => {
            console.log(error);
            messageApi.open({
                type: 'error',
                content: 'Accept fail',
                duration: 5,
            });
        });
        if (currentItem.isButtonClicked) {
            return;
        }
    }

    const handleDenyRequest = (id) => {
        const updatedRequests = requests.map(request => {
            if (request.id === id) {
                return { ...request, isButtonClicked: true };
            }
            return request;
        });

        setRequests(updatedRequests);

        const currentItem = updatedRequests.find(request => request.id === id);

        axios.post(`http://localhost:8080/lms/teacher/acceptRequest/${id}?code=2`, null, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((response) => {
            messageApi.open({
                type: 'warning',
                content: 'Denied request',
                duration: 5,
            });
        }).catch((error) => {
            console.log(error);
            messageApi.open({
                type: 'error',
                content: 'Deny fail',
                duration: 5,
            });
        });
        if (currentItem.isButtonClicked) {
            return;
        }
    }

    const handleRemoveStudent = (id) => {
        const updatedStudents = students.map(student => {
            if (student.id === id) {
                return { ...student, isButtonClicked: true };
            }
            return student;
        });

        setStudents(updatedStudents);

        const currentStudent = updatedStudents.find(student => student.id === id);


        axios.delete(`http://localhost:8080/lms/teacher/courses/${cid}/removeStudent/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((response) => {
            messageApi.open({
                type: 'warning',
                content: 'Remove student succeed',
                duration: 5,
            });
        }).catch((error) => {
            console.log(error);
            messageApi.open({
                type: 'error',
                content: 'Remove student failed',
                duration: 5,
            });
        });
        if (currentStudent.isButtonClicked) {
            return;
        }
    }

    return (
        <>
            {contextHolder}
            <div style={{ display: "flex", minHeight: "1000px" }}>
                <Sidebar cid={cid} isTeacher={isTeacher} selected={"6"}></Sidebar>
                <div style={{ display: "flex", flex: 1, padding: "20px" }}>
                    <div style={{ marginLeft: "5vw", width: '30vw' }}>
                        <Card title="Students">
                            <List
                                style={{ overflowY: 'scroll', height: '1000px' }}
                                dataSource={students}
                                renderItem={(item) => (
                                    <List.Item actions={[
                                        <Button
                                            style={{ backgroundColor: '#ff3333', color: 'white', marginRight: '30px' }}
                                            className="remove-button"
                                            key="remove"
                                            onClick={() => {
                                                handleRemoveStudent(item.id);
                                                console.log(item.id)
                                            }}
                                            disabled={item.isButtonClicked}
                                        >
                                            Remove
                                        </Button>
                                    ]}>
                                        <List.Item.Meta
                                            title={item.user.name}
                                            description={item.user.email}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </div>
                    <div style={{ marginLeft: '20vw', marginRight: "5vw", width: '30vw' }}>
                        <Card title="Requests" >
                            <List
                                style={{ overflowY: 'scroll', height: '1000px' }}
                                dataSource={requests}
                                renderItem={(item) => (
                                    <List.Item actions={[
                                        <Button
                                            style={{ backgroundColor: 'green', color: 'white', width: '100px' }}
                                            className="accept-button"
                                            key="accept"
                                            onClick={() => handleAcceptRequest(item.id)}
                                            disabled={item.isButtonClicked}
                                        >
                                            Accept
                                        </Button>,
                                        <Button
                                            className="deny-button"
                                            style={{ background: '#ff3333', color: 'white', width: '100px', marginRight: '20px' }}
                                            key="deny"
                                            onClick={() => handleDenyRequest(item.id)}
                                            disabled={item.isButtonClicked}
                                        >
                                            Deny
                                        </Button>,
                                    ]}>
                                        <List.Item.Meta
                                            title={item.student.user.name}
                                            description={item.student.user.email}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
