import React, { useState, useEffect } from 'react';
import { Form, Input, Upload, Button, message, Card, Menu } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Meta from 'antd/lib/card/Meta'
import Sidebar from './Sidebar';
const AddNoti = ({ checkTokenExpiration, isTeacher }) => {
  const { cid } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!checkTokenExpiration()) {
      alert('You need to re-login');
      navigate('/login');
    }
  })



  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('topic', values.title);
      formData.append('msg', values.description);
      formData.append('course.id', cid);

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://fall2324w20g9.int3306.freeddns.org/api/teacher/course/notification',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        data: formData,
      };

      message.loading({
        content: "Processing ...",
        duration: 12
      });
      const response = await axios.request(config);
      message.success('Notification created successfully!');
      navigate(`/app/courses/${cid}`);
    } catch (error) {
      console.error('Error creating notification:', error);
      message.error('Failed to create notification');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  console.log(cid);
  return (
    <div style={{ display: 'flex', minHeight: '1000px' }}>
      <Sidebar cid={cid} isTeacher={isTeacher} selected={'1'}></Sidebar>

      <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40%', flex: '1' }}>
        <Card title="Add Notification" style={{ width: 500, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
          <Form
            name="lectureForm"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Content"
              name="description"
              rules={[{ required: true, message: 'Please input the description!' }]}
            >
              <Input.TextArea />
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

export default AddNoti;