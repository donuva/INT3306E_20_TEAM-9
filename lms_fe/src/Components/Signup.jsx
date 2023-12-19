import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, message, Card, Radio, Grid } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegistrationForm = ({ type }) => {
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [userType, setUserType] = useState('student');
  const onUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append('file', imageFile);
  };
  const formatDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === 'birthdate') {
        formData.append(`user.${key}`, formatDate(values[key]['$d']));
      } else {
        formData.append(`user.${key}`, values[key]);
      }
    });
    console.log(formData)
    // Gửi yêu cầu API tại đây
    // Sử dụng fetch hoặc thư viện tương tự để gửi yêu cầu API đến server
    const url = userType === 'student' ? 'http://fall2324w20g9.int3306.freeddns.org/api/create/student' : 'http://fall2324w20g9.int3306.freeddns.org/api/create/teacher';
    axios.post(url, formData)
      .then(() => {
        console.log('Registration successful:');
        message.success('Registration successful');
        navigate('/login')
      })
      .catch((error) => {
        console.error('Registration failed:', error.response.data);
        message.error('Registration failed: ' + error.response.data);
      });
  };

  return (
    <Card title={`Register`} style={{ width: md ? 400 : '100%', margin: 'auto', marginTop: 50 }}>
      <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
          labelCol={{ span: md ? 8 : 24 }}
          wrapperCol={{ span: md ? 16 : 24 }}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          name="bio"
          label="Bio"
          rules={[{ required: true, message: 'Please input your bio!' }]}
          labelCol={{ span: md ? 8 : 24 }}
          wrapperCol={{ span: md ? 16 : 24 }}
        >
          <Input.TextArea placeholder="Enter your bio" />
        </Form.Item>
        <Form.Item
          name="birthdate"
          label="Birthdate"
          rules={[{ required: true, message: 'Please select your birthdate!' }]}
          labelCol={{ span: md ? 8 : 24 }}
          wrapperCol={{ span: md ? 16 : 24 }}
        >
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          labelCol={{ span: md ? 8 : 24 }}
          wrapperCol={{ span: md ? 16 : 24 }}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          labelCol={{ span: md ? 8 : 24 }}
          wrapperCol={{ span: md ? 16 : 24 }}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          labelCol={{ span: md ? 8 : 24 }}
          wrapperCol={{ span: md ? 16 : 24 }}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
          labelCol={{ span: md ? 8 : 24 }}
          wrapperCol={{ span: md ? 16 : 24 }}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>
        <Form.Item
          name="userType"
          label="User Type"
          labelCol={{ span: md ? 8 : 24 }}
          wrapperCol={{ span: md ? 16 : 24 }}
        >
          <Radio.Group onChange={onUserTypeChange} value={userType} defaultValue={userType}>
            <Radio value="student">Student</Radio>
            <Radio value="teacher">Teacher</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="image"
          label="Image Link"
          labelCol={{ span: md ? 8 : 24 }}
          wrapperCol={{ span: md ? 16 : 24 }}
        >
          <Input type="file" onChange={handleImageUpload} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: md ? 16 : 24, offset: md ? 8 : 0 }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegistrationForm;
