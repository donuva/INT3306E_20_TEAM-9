import React, { useState, useEffect } from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import { Form, Input, Card, Button } from 'antd';
import "../CSS/Profile.css"
import axios from 'axios'
import { useNavigate } from 'react-router';

export default function Profile({setLoggedIn, checkTokenExpiration }) {
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

  function handleLogout(navigate, setIsLoggedIn) {

    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login')
  }
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
      formData.append('user.id', userData.id);
      formData.append('user.name', formValues.name || userData.name);
      formData.append('user.birthdate', formValues.birthdate || userData.birthdate);
      formData.append('user.username', formValues.username || userData.username);
      formData.append('ava_url', "")
      formData.append('user.bio', formValues.bio || userData.bio);
      formData.append('user.email', formValues.email || userData.email);
      formData.append('user.phone', formValues.phone || userData.phone);

      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/lms/user/update',
        headers: {
          // ...formData.getHeaders(),
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
        data: formData,
      };

      const response = await axios.request(config);
      // Cập nhật lại state sau khi lưu thành công
      setUserData(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(userData.id)
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="avatar">
            <Meta avatar={<Avatar size="large" />} title={userData ? userData.name : "Loading..."} />
          </div>
          <h5 className="card-title">{'Role: ' + (userData ? userData.role : 'Loading...')}</h5>
          <h5 className="card-text">{'@' + (userData ? userData.username : 'Loading...')}</h5>
          <p className="card-text">
            {userData ? userData.email : 'Loading...'}
            <br />
            <span className="phone">{userData ? userData.phone : 'Loading...'}</span>
          </p>
        </div>
        <span>{userData ? userData.bio : 'Loading...'}</span>
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
              value={formValues.name || userData.name}
              // onChange={handleFormChange}
            />
          </Form.Item>
          <Form.Item label="User Name:">
            <Input
              allowClear={true}
              className="input"
              name="username"
              value={formValues.username || userData.username}
              // onChange={handleFormChange}
            />
          </Form.Item>
          <Form.Item label="Email:">
            <Input
              allowClear={true}
              className="input"
              name="email"
              value={formValues.email || userData.email}
              // onChange={handleFormChange}
            />
          </Form.Item>
          <Form.Item label="Mobile:">
            <Input
              allowClear={true}
              className="input"
              name="phone"
              value={formValues.phone || userData.phone}
              // onChange={handleFormChange}
            />
          </Form.Item>

          <Form.Item label="Photo:">
            <button>Upload!</button>
          </Form.Item>
          <Button onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button onClick={() => handleLogout(navigate, setLoggedIn)}>
            Sign Out
          </Button>
        </Form>
      </Card>
    </div>
  );
};

