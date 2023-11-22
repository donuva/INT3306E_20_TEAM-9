import React, { useState, useEffect } from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import Meta from 'antd/lib/card/Meta';
import { Form, Input, Card, Button,Table } from 'antd';
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
  
  const columns = [
    {
      title: 'Field',
      dataIndex: 'field',
      key: 'field',
      width: 150,
      render: text => <strong>{text}</strong>,
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];
  
  const data = [
    {
      key: '1',
      field: 'Name',
      value: formValues.name || userData.name,
    },
    {
      key: '2',
      field: 'User Name',
      value: formValues.username || userData.username,
    },
    {
      key: '3',
      field: 'Email',
      value: formValues.email || userData.email,
    },
    {
      key: '4',
      field: 'Mobile',
      value: formValues.phone || userData.phone,
    },
    {
      key: '5',
      field: 'Photo',
      value: <Button type="primary">Upload!</Button>,
    },
  ];
  
  return (
    <div className="Pcontainer">
      <Card style={{ flex: 1, marginRight: '20px' }}>
        <div className="Pavatar">
          <Meta avatar={<Avatar size="large" />} title={userData ? userData.name : "Loading..."} />
        </div>
        <h5 className="Pcard-title">{'Role: ' + (userData ? userData.role : 'Loading...')}</h5>
        <h5 className="Pcard-text">{'@' + (userData ? userData.username : 'Loading...')}</h5>
        <p className="Pcard-text">
          {userData ? userData.email : 'Loading...'}
          <br />
          <span className="Pphone">{userData ? userData.phone : 'Loading...'}</span>
        </p>
        <span>{userData ? userData.bio : 'Loading...'}</span>
      </Card>
      
      <div className="Ptable-container">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size="middle"
          bordered
          footer={() => (
            <Button type="danger" className="Psign-out-btn" onClick={() => handleLogout(navigate, setLoggedIn)}>
              Sign Out
            </Button>
          )}
        />
      </div>
    </div>
  );
};

