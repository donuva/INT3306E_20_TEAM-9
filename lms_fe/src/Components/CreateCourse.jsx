import React, { useState } from 'react';
import { Card, Form, Input, Button } from 'antd';
import axios from 'axios';

function CreateCourse({ checkTokenExpiration }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    teacher : {id: 1} // Giả sử bạn đã biết id của giáo viên
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(formData)
    axios.post('http://localhost:8080/lms/course', formData, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        // Xử lý kết quả sau khi tạo khóa học thành công
        console.log("Success")
      })
      .catch((error) => {
        alert("dm")
        console.error("Error creating course: ", error);
      });
  };

  return (
    <div className="container" style={{ marginTop: '20px', marginBottom: '20px' }}>
      <Card title="Create a New Course" hoverable>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Course Name" name="name" rules={[{ required: true, message: 'Please input the course name!' }]}>
            <Input name="name" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please input the category!' }]}>
            <Input name="category" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
            <Input.TextArea name="description" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Create Course</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default CreateCourse;
