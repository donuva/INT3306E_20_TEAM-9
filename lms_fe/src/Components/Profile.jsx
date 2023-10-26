import React, { useState, useEffect } from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import { Form, Input, Card, Button } from 'antd';
import "../CSS/Profile.css"
import axios from 'axios'

const Profile = () => {
  const [userData, setUserData] = useState({
    id: null,
    user: {
      id: null,
      name: '',
      birthdate: '',
      username: '',
      ava_url: null,
      bio: '',
      email: '',
      phone: '',
      role: '',
      createdAt: '',
      updatedAt: '',
    },
    courseList: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/lms/getStudent/1', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        });
        setUserData(response.data);
        //  console.log(userData.phone)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []); 

  const [formValues, setFormValues] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('id', userData.id);
      formData.append('user.id', userData.user.id);
      formData.append('user.name', formValues.name || userData.user.name);
      formData.append('user.birthdate', formValues.birthdate || userData.user.birthdate);
      formData.append('user.username', formValues.username || userData.user.username);
      formData.append('ava_url',"")
      formData.append('user.bio', formValues.bio || userData.user.bio);
      formData.append('user.email', formValues.email || userData.user.email);
      formData.append('user.phone', formValues.phone || userData.user.phone);
      formData.append('user.role','STUDENT');
      // formData.append('courseList',"")

      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/lms/student/update',
        headers: {
          // ...formData.getHeaders(),
        },
        data: formData,
      };
  
      const response = await axios.request(config);
      // Cập nhật lại state sau khi lưu thành công
      setUserData(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="card">
      <div className="card-body">
          <div className="avatar">
            <Meta avatar={<Avatar size="large" />} title={userData ? userData.user.name : "Loading..."} />
          </div>
          <h5 className="card-title">{'Role: ' + (userData ? userData.user.role : 'Loading...')}</h5>
          <h5 className="card-text">{'@' + (userData ? userData.user.username : 'Loading...')}</h5>
          <p className="card-text">
            {userData ? userData.user.email : 'Loading...'}
            <br/>
            <span className="phone">{userData ? userData.user.phone : 'Loading...'}</span>
          </p>
        </div>
        <span>{userData ? userData.user.bio : 'Loading...'}</span>
      </div>
      <Card className="Form">
        <Form
          size="middle"

          colon={true}
          labelAlign="left"
          layout="vertical"
        >
          <Form.Item label="Name:">
            <Input
            allowClear={true}
            className="input"
            name="name"
            value={formValues.name || userData.user.name}
            onChange={handleFormChange}
          />
        </Form.Item>
        <Form.Item label="User Name:">
        <Input
        allowClear={true}
        className="input"
        name="username"
        value={formValues.username || userData.user.username}
        onChange={handleFormChange}
      />
    </Form.Item>
    <Form.Item label="Email:">
      <Input
      allowClear={true}
      className="input"
      name="email"
      value={formValues.email || userData.user.email}
      onChange={handleFormChange}
    />
  </Form.Item>
  <Form.Item label="Mobile:">
    <Input
    allowClear={true}
    className="input"
    name="phone"
    value={formValues.phone || userData.user.phone}
    onChange={handleFormChange}
  />
  </Form.Item>

          <Form.Item label="Photo:">
          {/* <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              imgExtension={['.jpg', '.png']}
              maxFileSize={1048576}
              singleImage={true}
              label="max size 1MB"
            />*/}
            <button>Upload!</button>
          </Form.Item>
          <Button onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button
            className="unsub"
            type="text"
            title="re-login to subscribe again!!"
          >
            unsubscribe from notifications on all devices
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
