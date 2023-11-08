import React, { useState, useEffect } from 'react'
import { Form, Input, Upload, Button, message, Card, Menu } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
  NotificationOutlined,
  FileTextOutlined,
  CommentOutlined,
  AppstoreOutlined,
  RightOutlined,
  LeftOutlined,
  ExperimentOutlined,
  DashboardOutlined,
} from '@ant-design/icons'; import Meta from 'antd/lib/card/Meta'

import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const AddLesson = ({ checkTokenExpiration, isTeacher }) => {
  const navigate = useNavigate();
  const { cid } = useParams();
  const [collapsed, setCollapsed] = useState(true);
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
  useEffect(() => {
    if (!checkTokenExpiration()) {
      alert("You need to re-login")

      navigate('/login');
    } else {
      setUserData(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('topic', values.topic);
      formData.append('content', values.content);
      formData.append('course.id', cid);
      formData.append('file', values.pdfFile[0].originFileObj);

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/lms/teacher/course/lesson',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        data: formData,
      };

      const response = await axios.request(config);
      message.success('Lecture added successfully!');
      navigate(`/app/courses/${cid}`);
    } catch (error) {
      console.error('Error adding lecture:', error);
      message.error('Failed to add lecture');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const customRequest = ({ file, onSuccess }) => {
    onSuccess();
  };

  const beforeUpload = (file) => {
    return true;
  };

  return (
    <div style={{ display: 'flex', minHeight: '1000px' }}>
      <div className='sidenav' style={{ width: collapsed ? 80 : 256, backgroundColor: '#001529' }}>

        <Menu

          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          defaultSelectedKeys={['5']}
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
        <Card title="Add Lesson" style={{ width: 500, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
          <Form
            name="lessonForm"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Topic"
              name="topic"
              rules={[{ required: true, message: 'Please fill in the title!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: 'Please fill in the description!' }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="PDF File"
              name="pdfFile"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
              rules={[{ required: true, message: 'Please upload the PDF file!' }]}
            >
              <Upload
                customRequest={customRequest}
                beforeUpload={beforeUpload}
                maxCount={1}
                listType="text"
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddLesson;
