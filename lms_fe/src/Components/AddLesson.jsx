import React, { useState, useEffect } from 'react'
import { Form, Input, Upload, Button, message, Card, Menu } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta'

import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

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
      //formData.append('file', values.pdfFile[0].originFileObj);
      if (values.pdfFile && values.pdfFile.length > 0) {
        formData.append('file', values.pdfFile[0].originFileObj);
      }

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://fall2324w20g9.int3306.freeddns.org/api/teacher/course/lesson',
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
      <Sidebar cid={cid} isTeacher={isTeacher} selected={'5'}></Sidebar>

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
            // rules={[{ required: false, message: 'Upload the PDF file is Optional!' }]}
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
