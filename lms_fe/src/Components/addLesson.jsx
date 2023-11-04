import React, { useState, useEffect } from 'react'
import { Form, Input, Upload, Button, message, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddLesson = ({checkTokenExpiration}) => {
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
    useEffect(() => {
      if (!checkTokenExpiration()) {
        alert("You need to re-login")
  
        navigate('/login');
      } else {
        setUserData(JSON.parse(localStorage.getItem('user')));
      }
    }, []);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('topic', values.title);
      formData.append('content', values.description);
      formData.append('course.id', '2'); // Thay '2' bằng id thích hợp
      formData.append('file', values.pdfFile[0].originFileObj);
     
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/lms/teacher/course/lesson',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        data: formData,
      };

      const response = await axios.request(config);
      message.success('Lecture added successfully!');
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
    <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40%' }}>
      <Card title="Add Lecture" style={{ width: 500, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
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
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the description!' }]}
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
  );
};

export default AddLesson;
