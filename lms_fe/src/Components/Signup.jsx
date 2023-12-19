import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, message, Card, Radio, Grid, Upload } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';


const RegistrationForm = ({ type }) => {
  const { useBreakpoint } = Grid;
  const { md } = useBreakpoint();

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [userType, setUserType] = useState('student');
  const onUserTypeChange = (e) => {
    setUserType(e.target.value);
  };


  const formatDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  const onFinish = async () => {

    try {
      const values = await form.validateFields();

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'birthdate') {
          formData.append(`user.${key}`, formatDate(values[key]['$d']));
        }
        else if (key != 'file') {
          formData.append(`user.${key}`, values[key]);
        }
      });
      if (values.file?.[0]?.originFileObj) {
        formData.append('file', values.file[0].originFileObj);
      }

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
    }
    catch (error) {
      console.error('Registration failed:', error.response.data);
      message.error('Registration failed: ' + error.response.data);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <Card title={`Register`} style={{ width: md ? 500 : '100%', margin: 'auto', marginTop: 50, marginBottom: 50 }}>
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
          label="Upload"
          name="file"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        // Allow only the latest file
        >
          <Upload.Dragger
            beforeUpload={beforeUpload}
            maxCount={1} // Limit the number of files to 1

          >
            <UploadOutlined></UploadOutlined>
            <p className="ant-upload-drag-icon">


            </p>
            <p className="ant-upload-text" style={{ overflow: 'clip' }}>Click or drag file to this area to upload</p>
          </Upload.Dragger>
        </Form.Item>


        <Form.Item >
          <Button type="primary" htmlType="submit" style={{ margin: 'auto' }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegistrationForm;
