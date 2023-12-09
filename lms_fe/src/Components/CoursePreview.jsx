import React, { useEffect, useState } from 'react';
import { Card, Button, message, Row, Col, Avatar } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';




const CoursePreview = ({ checkTokenExpiration }) => {
    const [course, setCourses] = useState({});
    const [teacher, setTeacher] = useState({});
    const [status, setStatus] = useState();
    const { cid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkTokenExpiration()) {
            alert('You need to re-login');
            navigate('/login');
        }
        axios.get(`http://localhost:8080/lms/student/course/preview/${cid}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }
        ).then((response) => {
            setCourses(response.data);
            setTeacher(response.data.teacher.user);
            setStatus(response.data.status);
        })

    }, [])

    const onFinish = () => {
        axios.post(`http://localhost:8080/lms/student/enroll/${cid}`, null, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then((response) => {
                setStatus(0)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Card style={{ minHeight: '1000px' }}>
            <h1>{course.name}</h1>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <div className="teacher-info">
                            <Avatar size={{
                                xs: 24,
                                sm: 32,
                                md: 40,
                                lg: 64,
                                xl: 80,
                                xxl: 100,
                            }} src={"/storage/" + teacher.ava_url} alt={teacher.name} />
                            <h2>Teacher: {teacher.name}</h2>
                            <p><strong>Bio:</strong> {teacher.bio}</p>
                            <p><strong>Birthdate:</strong> {teacher.birthdate}</p>
                            <p><strong>Email:</strong> {teacher.email}</p>
                            <p><strong>Phone:</strong> {teacher.phone}</p>
                        </div>
                    </Card>
                </Col>
                <Col span={16}>
                    <Card>
                        <div className="course-info">
                            <p><strong>Category:</strong> {course.category}</p>
                            <p><strong>Description:</strong> {course.description}</p>
                            <Button disabled={status === 0} onClick={onFinish} htmlType='submit' type="primary">{status === 0 ? 'Enrolled' : 'Enroll'}</Button>
                            {status === 2 &&
                                <p style={{ color: 'red' }}>Your last request has been denied, please send other request!</p>}
                        </div>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
}

export default CoursePreview;