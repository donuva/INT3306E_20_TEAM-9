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
  const [collapsed, setCollapsed] = useState(true);
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

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: 'flex', minHeight: '1000px' }}>
      <div className='sidenav' style={{ width: collapsed ? 80 : 256, backgroundColor: '#001529' }}>

        <Menu

          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          selectedKeys={['0']}
        >
          <Button onClick={toggleCollapsed} style={{ marginBottom: 16, backgroundColor: '#001529', color: 'white', border: '0px' }}>
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </Button>
          <Menu.Item key="0" icon={<AppstoreOutlined />}>
            <Link to={`/app/courses/${cid}`}>
              Course
            </Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<NotificationOutlined />}>
            <Link to={`/app/courses/${cid}/notifications`}>Notifications</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DashboardOutlined />}>
            <Link to="/app/course/studentGrade">Grade</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<CommentOutlined />}>
            <Link to={`/app/courses/${cid}/forum`}>Forum</Link>
          </Menu.Item>
          {isTeacher === true &&
            <Menu.Item key="4" icon={<ExperimentOutlined />}>
              <Link to={`/app/addExercise/${cid}`}>New Exercise</Link>
            </Menu.Item>
          }
          {isTeacher === true &&
            <Menu.Item key="5" icon={<FileTextOutlined />}>
              <Link to={`/app/addLesson/${cid}`}>New Lesson</Link>
            </Menu.Item>
          }
        </Menu>
      </div>

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
