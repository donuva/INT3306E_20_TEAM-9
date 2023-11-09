import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Collapse, Badge, Button, Card, List, Menu, Form, Input, message } from 'antd';
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
  ExperimentOutlined,
  DashboardOutlined,
} from '@ant-design/icons'; import Meta from 'antd/lib/card/Meta'
import FormItem from 'antd/es/form/FormItem';
const AddExercise = ({ checkTokenExpiration, isTeacher }) => {
  const navigate = useNavigate();
  const { cid } = useParams();
  const [userData, setUserData] = useState({});
  const [collapsed, setCollapsed] = useState(true);


  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (!checkTokenExpiration()) {
      alert("You need to re-login");
      navigate('/login');
    } else {
      setUserData(JSON.parse(localStorage.getItem('user')));
    }
  }, []);



  const onFinish = async (values) => {
    const moment = require('moment')
    const date = values.deadline;
    const inputFormat = "YYYY-MM-DD";
    const outputFormat = "DD/MM/YYYY";

    const parsedDate = moment(date, inputFormat);
    const formattedDate = parsedDate.format(outputFormat);

    try {
      const formData = JSON.stringify({
        "title": values.title,
        "content": values.content,
        "course": {
          "id": cid
        },
        "deadline": formattedDate
      });
      const response = await axios.post('http://localhost:8080/lms/teacher/exercise/create', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
      });
      console.log('Exercise created:', response.data);
      message.success('Created exercise')
      navigate(`/app/courses/${cid}`);
    } catch (error) {
      message.error('Failed to add exercise');
      console.error('Error creating exercise:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div style={{ display: 'flex', minHeight: '1000px' }}>
      <div className='sidenav' style={{ width: collapsed ? 80 : 256, backgroundColor: '#001529' }}>

        <Menu

          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          defaultSelectedKeys={['4']}
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

      <div style={{ flex: '1', marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40%' }}>
        <Card title="Create new exercise" style={{ width: 500, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
          <Form name="exerciseForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}>

            <Form.Item
              label='Title' name='title'
              rules={[{ required: true, message: 'Please fill in the title!' }]}
            >

              <Input />
            </Form.Item>
            <Form.Item label="Content"
              name="content"
              rules={[{ required: true, message: 'Please fill in the content!' }]}
            >

              <Input.TextArea

              />
            </Form.Item>
            <Form.Item
              label='Deadline'
              name='deadline'
              rules={[{ required: true, message: 'Please choose a date' }]}
            >

              <Input
                type="date"
              />
            </Form.Item>
            <Button type="primary" htmlType='submit'>Create Exercise</Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddExercise;
