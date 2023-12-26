import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { List, Card, message, Button, Modal, Avatar, Input, Space } from "antd";
import Sidebar from "./Sidebar";
import axios from "axios";

import "../CSS/RequestList.css"; // Import file CSS cho component

export default function RequestList({ isTeacher, checkTokenExpiration }) {
    const { cid } = useParams();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [students, setStudents] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const [name, setName] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    useEffect(() => {
        if (!checkTokenExpiration()) {
            alert("You need to re-login");
            navigate("/login");
        }
    }, [checkTokenExpiration, navigate]);

    useEffect(() => {
        axios
            .get(`http://fall2324w20g9.int3306.freeddns.org/api/teacher/getRequestList/${cid}`, {
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
            .get(`http://fall2324w20g9.int3306.freeddns.org/api/teacher/courses/${cid}/students`, {
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

        axios.post(`http://fall2324w20g9.int3306.freeddns.org/api/teacher/acceptRequest/${id}?code=1`, null, {
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

        axios.post(`http://fall2324w20g9.int3306.freeddns.org/api/teacher/acceptRequest/${id}?code=2`, null, {
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

    const handleInfoClick = (id) => {
        axios.get(`http://fall2324w20g9.int3306.freeddns.org/api/getUser/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        }).then((response) => {
            Modal.info({
                title: 'Student Info',
                content: (
                    <div>
                        <Avatar src={'/storage/' + response.data.ava_url}></Avatar>
                        <p><strong>Name:</strong> {response.data.name}</p>
                        <p><strong>Email:</strong> {response.data.email}</p>
                        <p><strong>Mobile:</strong> {response.data.phone}</p>
                        <p><strong>D.O.B:</strong> {response.data.birthdate}</p>
                        <p><strong>Bio:</strong> {response.data.bio}</p>
                    </div>
                ),
                onOk() {
                    // Đóng Modal khi nhấn OK
                },
            });
        }).catch((error) => {
            console.log(error);
            messageApi.open({
                type: 'error',
                content: 'Failed to fetch student info',
                duration: 5,
            });
        });
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


        axios.delete(`http://fall2324w20g9.int3306.freeddns.org/api/teacher/courses/${cid}/removeStudent/${id}`, {
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

    const handleSearchName = () => {
        axios
            .get(`http://fall2324w20g9.int3306.freeddns.org/api/search/student/notInCourse/${cid}?name=${name}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt"),
                },
            })
            .then((response) => {
                setSearchResults(response.data.map(student => ({ ...student, isButtonClicked: false })));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleAddStudent = (id) => {
        axios.post(`http://fall2324w20g9.int3306.freeddns.org/api/teacher/course/${cid}/addStudent/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            }
        }).then((response) => {
            messageApi.open({
                type: 'success',
                content: 'Add student succeed',
                duration: 5,
            });
        }).catch((error) => {
            console.log(error);
            messageApi.open({
                type: 'error',
                content: 'Add student failed',
                duration: 5,
            });
        })
    }

    return (
        <>
            {contextHolder}
            <div style={{ display: "flex", minHeight: "1000px" }}>
                <Sidebar cid={cid} isTeacher={isTeacher} selected={"6"}></Sidebar>
                <div style={{ display: "flex", flex: 1, padding: "30px" }}>
                    {/* Students Section */}
                    <div style={{ width: '30vw', marginRight: '10vw' }}>
                        <Card title="Students">
                            <List
                                style={{ height: '1000px' }}
                                dataSource={students}
                                renderItem={(item) => (
                                    <List.Item actions={[
                                        <Button
                                            style={{ backgroundColor: '#ff3333', color: 'white' }}
                                            className="remove-button"
                                            key="remove"
                                            onClick={() => {
                                                handleRemoveStudent(item.id);
                                                console.log(item.id)
                                            }}
                                            disabled={item.isButtonClicked}
                                        >
                                            Remove
                                        </Button>,
                                        <Button key="info" type="primary" style={{ width: '80px' }} onClick={() => handleInfoClick(item.user.id)}>
                                            Info
                                        </Button>
                                    ]}>
                                        <List.Item.Meta
                                            title={item.user.name}
                                            description={item.user.email}
                                            avatar={<Avatar src={'/storage/' + item.user.ava_url}></Avatar>}


                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </div>

                    {/* Search Section */}
                    <div style={{ width: '15vw', marginRight: '10vw' }}>
                        <div style={{ marginTop: '30px' }}>
                            <h5>Add student</h5>
                            <br />
                            <Input
                                style={{ width: '50%' }}
                                placeholder="Enter student name..."
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <br />
                            <Button type="primary" style={{ marginTop: '10px' }} onClick={() => {
                                handleSearchName();
                                setIsButtonClicked(true)
                            }}>Search</Button>
                        </div>

                        {isButtonClicked && (
                            searchResults.length !== 0 ? (
                                <Card style={{ marginTop: '50px' }}>
                                    <List
                                        style={{ height: '300px' }}
                                        dataSource={searchResults}
                                        renderItem={(item) => (
                                            <List.Item actions={[
                                                <Button
                                                    className="info-button"
                                                    style={{ width: '80px' }}
                                                    key="info"
                                                    type="primary"
                                                    onClick={() => handleInfoClick(item.user.id)}
                                                >
                                                    Info
                                                </Button>,
                                                <Button
                                                    style={{ width: '80px', backgroundColor: 'green', color: 'white' }}
                                                    type="primary"
                                                    onClick={() => handleAddStudent(item.id)}
                                                    disabled={item.isButtonClicked}>
                                                    Add Student

                                                </Button>
                                            ]}>
                                                <List.Item.Meta
                                                    title={item.user.name}
                                                    description={item.user.email}
                                                    avatar={<Avatar src={'/storage/' + item.user.ava_url}></Avatar>}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                    <Button type="primary" onClick={() => setIsButtonClicked(false)}>OK</Button>
                                </Card>
                            ) : (
                                <Card style={{ marginTop: '50px', minHeight: '200px', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                                    <h6 style={{}}>No Result</h6>
                                    <Button type="primary" onClick={() => setIsButtonClicked(false)}>OK</Button>

                                </Card>
                            )
                        )}
                    </div>

                    {/* Requests Section */}
                    <div style={{ width: '30vw' }}>
                        <Card title="Requests" >
                            <List
                                style={{ height: '1000px' }}
                                dataSource={requests}
                                renderItem={(item) => (
                                    <List.Item actions={[
                                        <Button
                                            style={{ backgroundColor: 'green', color: 'white', width: '80px' }}
                                            className="accept-button"
                                            key="accept"
                                            onClick={() => handleAcceptRequest(item.id)}
                                            disabled={item.isButtonClicked}
                                        >
                                            Accept
                                        </Button>,
                                        <Button
                                            className="deny-button"
                                            style={{ background: '#ff3333', color: 'white', width: '80px' }}
                                            key="deny"
                                            onClick={() => handleDenyRequest(item.id)}
                                            disabled={item.isButtonClicked}
                                        >
                                            Deny
                                        </Button>,
                                        <Button key="info" type="primary" style={{ width: '80px' }} onClick={() => handleInfoClick(item.student.user.id)}>
                                            Info
                                        </Button>,
                                    ]}>
                                        <List.Item.Meta
                                            title={item.student.user.name}
                                            description={item.student.user.email}
                                            avatar={<Avatar src={'/storage/' + item.user.ava_url}></Avatar>}

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
