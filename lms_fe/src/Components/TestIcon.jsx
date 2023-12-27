import React, { useState } from 'react'
import { Dropdown, Avatar, Menu } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'


const TestIcon = ({ setLoggedIn }) => {


  const navigate = useNavigate();
  const clickHandler = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('student_id');
    localStorage.removeItem('teacher_id');
    setLoggedIn(false);
    navigate('/login');
  }

  const changePasswordHandler = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.removeItem('student_id');
    localStorage.removeItem('teacher_id');
    setLoggedIn(false);

    navigate('/changePassword');
  }

  const menu = (
    <Menu>
      <Menu.Item key="PROFILE">
        <NavLink style={{ textDecoration: 'none' }} to={'/app/profile'}>My Profile</NavLink>
      </Menu.Item>

      <Menu.Item key="changePassword" onClick={changePasswordHandler}>Change Password</Menu.Item>

      <Menu.Item onClick={clickHandler} key="SIGN_OUT">Sign out</Menu.Item>
    </Menu>

  )

  return (
    <Dropdown
      style={{}}
      overlay={menu}
      trigger={['click']}
      placement="bottom"
      arrow
    >
      <Avatar src={'/storage/' + (JSON.parse(localStorage.getItem('user'))).ava_url}
        style={{ cursor: 'pointer', marginLeft: '10px', }}></Avatar>
    </Dropdown>
  )
}

export default TestIcon;