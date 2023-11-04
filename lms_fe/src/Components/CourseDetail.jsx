import React, { useState, useEffect } from 'react';
import { Collapse, Badge, Button, Card, List, Menu } from 'antd';
import {
  YoutubeFilled,
  NotificationOutlined,
  FileTextOutlined,
  CommentOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import MenuItem from 'antd/es/menu/MenuItem';

const { SubMenu } = Menu;

const CourseDetail = ({ checkTokenExpiration }) => {
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
  const [collapsed, setCollapsed] = useState(false);

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
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: 'flex', height: '1000px' }}>
      <div className='sidenav' style={{ width: collapsed ? 80 : 256, backgroundColor: '#001529' }}>

        <Menu

          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          <Button onClick={toggleCollapsed} style={{ marginBottom: 16, backgroundColor: '#001529', color: 'white', border: '0px' }}>
            {collapsed ? <RightOutlined /> : <LeftOutlined />}
          </Button>
          <Menu.Item key="1" icon={<AppstoreOutlined />}>
            <Link to={`/app/courses/${cid}/notifications`}>Notifications</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            <Link to="/app/course/studentGrade">Grade</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<CommentOutlined />}>
            <Link to={`/app/courses/${cid}/forum`}>Forum</Link>
          </Menu.Item>
        </Menu>
      </div>

      <div style={{ flex: 1 }}>
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
          renderItem={(item) => (
            <List.Item>
              {item.topic}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default CourseDetail;
