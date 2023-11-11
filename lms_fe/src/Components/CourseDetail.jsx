import React, { useState, useEffect } from 'react';
import { Collapse, Badge, Button, Card, List, Menu } from 'antd';
import {
  ExperimentOutlined,
  NotificationOutlined,
  FileTextOutlined,
  CommentOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  BulbOutlined,
  UserOutlined,
  RightOutlined,
  LeftOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';


const CourseDetail = ({ checkTokenExpiration, isTeacher }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    id: null,
    name: '',
    birthdate: '',
    username: '',
    ava_url: null,
    bio: '',
    email: '',
    phone: '',
    role: '',
  });
  const { cid } = useParams();
  const [course, setCourse] = useState({});
  const [exerciseList, setExerciseList] = useState([]);
  const [lessonList, setLessonList] = useState([]);
  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    if (!checkTokenExpiration()) {
      alert('You need to re-login');
      navigate('/login');
    } else {
      setUserData(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/lms/course/${cid}`,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
    };

    axios.request(config).then((response) => {
      setCourse(response.data);
      setExerciseList(response.data.exerciseList);
      setLessonList(response.data.lessonList);
      setTeacher(response.data.teacher.user);
    }).catch((error) => {
      if (error.response.status === 402) {
        navigate(`/app/courses/preview/${cid}`)
      }
      console.log(error);
    });
  }, []);



  return (
    <div style={{ display: 'flex', minHeight: '1000px' }}>
      <Sidebar cid={cid} isTeacher={isTeacher} selected={'0'}></Sidebar>


      <div style={{ flex: 1, marginTop: '30px' }}>
        <h1>{course.name}</h1>
        <div className='course_info' style={{ margin: '50px 40px', textAlign: 'left' }}>

          <article>
            <p><UserOutlined /> <strong>Teacher: </strong> {teacher.name} <br />
              <BulbOutlined /> <strong>Category: </strong> {course.category} <br />
              <ContainerOutlined /> <strong>Description: </strong>{course.description}</p>
          </article>
        </div>
        <List
          header="Exercise List"
          bordered
          dataSource={exerciseList}
          renderItem={(item) => (
            <List.Item>
              {item.title}
            </List.Item>
          )}
        />

        <List
          header="Lesson List"
          bordered
          dataSource={lessonList}
          style={{ marginTop: '30px' }}
          renderItem={(item) => (
            <List.Item>
              {item.topic}
            </List.Item>
          )}
        />
      </div>
    </div >
  );
};

export default CourseDetail;
