import React, { useState,useEffect } from 'react';
import { Form, Input, Upload, Button, message, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const AddNoti = ({ checkTokenExpiration }) => {
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
            url: 'http://localhost:8080/lms/teacher/course/notification',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            data: formData,
          };
    
          const response = await axios.request(config);
          message.success('Lecture added successfully!');
          navigate(`/app/courses/${cid}`)
        } catch (error) {
          console.error('Error adding lecture:', error);
          message.error('Failed to add lecture');
        }
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
console.log(cid);
  return (
    <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40%' }}>
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
  );
};

export default AddNoti;