import React, { useEffect, useState } from 'react';
import { Card, Typography, Space } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

const { Title, Text } = Typography;

export default function ExerciseDetail({ checkTokenExpiration, isTeacher }) {
    const navigate = useNavigate();
    const { cid } = useParams();
    const { eid } = useParams();
    const [exercise, setExercise] = useState({});

    useEffect(() => {
        if (!checkTokenExpiration()) {
            alert('You need to re-login');
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8080/lms/exercise/${eid}`,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        };

        axios
            .request(config)
            .then((response) => {
                setExercise(response.data);
            })
            .catch((error) => {
                if (error.response.status === 402) {
                    navigate(`/app/courses/preview/${cid}`);
                }
                console.log(error);
            });
    }, []);

    return (
        <div style={{ display: 'flex', minHeight: '1000px' }}>
            <Sidebar cid={cid} isTeacher={isTeacher} selected={'0'}></Sidebar>
            <div style={{ margin: '30px', flex: '1', textAlign: 'left' }}>
                <h1>{exercise.title}</h1>
                <hr></hr>
                <div style={{ backgroundColor: 'whitesmoke' }}>
                    <p><h6>Created:</h6> <span>{exercise.createdAt}</span>
                        <h6>Deadline:</h6> <span>{exercise.deadline}</span> </p>
                </div>
            </div>
        </div>
    );
}
