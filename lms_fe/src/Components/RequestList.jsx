import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { List, Card, message, Button } from "antd";
import Sidebar from "./Sidebar";
import axios from "axios";

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
                setRequests(response.data);
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
                setStudents(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [cid]);

    const handleAcceptRequest = (id) => {
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

        })
            .catch((error) => {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: 'Accept fail',
                    duration: 5,
                });
            })
    }

    const handleDenyRequest = (id) => {
        axios.post(`http://localhost:8080/lms/teacher/acceptRequest/${cid}?code=2`, null, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then((response) => {
            messageApi.open({
                type: 'warning',
                content: 'Denied request',
                duration: 5,
            });

        })
            .catch((error) => {
                console.log(error);
                messageApi.open({
                    type: 'error',
                    content: 'Deny fail',
                    duration: 5,
                });
            })
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
                                dataSource={students}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={item.name}
                                            description={item.email}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </div>
                    <div style={{ marginLeft: '20vw', marginRight: "5vw", width: '30vw' }}>
                        <Card title="Requests">
                            <List
                                dataSource={requests}
                                renderItem={(item) => (
                                    <List.Item actions={[
                                        <Button key="accept" onClick={() => handleAcceptRequest(item.id)}>
                                            Accept
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
            </div >
        </>
    );

}
