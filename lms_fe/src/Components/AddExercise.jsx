import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Collapse, Badge, Button, Card, List, Menu, Form, Input, message } from 'antd';

import Sidebar from './Sidebar';
const AddExercise = ({ checkTokenExpiration, isTeacher }) => {
  const navigate = useNavigate();
  const { cid } = useParams();
  const [userData, setUserData] = useState({});



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
      const response = await axios.post('http://localhost:8080/teacher/exercise/create', formData, {
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
      <Sidebar cid={cid} isTeacher={isTeacher} selected={'4'}></Sidebar>

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
