import React, { useEffect, useState } from 'react';
import { Calendar, Badge } from 'antd';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const CourseCalendar = ({ checkTokenExpiration, isTeacher }) => {
    const { cid } = useParams();
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!checkTokenExpiration()) {
            alert("You need to re-login");
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        // Gọi API để lấy danh sách sự kiện
        axios.get(`http://localhost:8080/api/course/${cid}/calendar`, {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('jwt')
            }
        })
            .then((response) => {
                const eventsFromApi = response.data.events;
                setEvents(eventsFromApi);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const dateCellRender = (value) => {
        const dayEvents = events.filter((event) => {
            // So sánh ngày của sự kiện với ngày hiện tại trong lịch
            const eventDate = new Date(event.date);
            return eventDate.getDate() === value.date() && eventDate.getMonth() === value.month() && eventDate.getFullYear() === value.year();
        });

        return (
            <ul>
                {dayEvents.map((event) => (
                    <li style={{ listStyle: 'none' }} key={event.id}>
                        {event.type === 'success' &&
                            <Link to={`/app/courses/${cid}/notifications`}>
                                <Badge status={event.type} text={event.title} />
                            </Link>
                        }
                        {event.type !== 'success' &&
                            <Link to={`/app/courses/${cid}/exercise/${event.id}`}>
                                <Badge status={event.type} text={'Deadline: ' + event.title} />
                            </Link>
                        }
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div style={{ display: 'flex', minHeight: '1000px' }}>
            <Sidebar cid={cid} isTeacher={isTeacher} selected={'7'}></Sidebar>

            <div className="container" style={{ marginTop: '20px', marginBottom: '20px' }}></div>

            <Calendar dateCellRender={dateCellRender} />
        </div>
    );
};

export default CourseCalendar;
