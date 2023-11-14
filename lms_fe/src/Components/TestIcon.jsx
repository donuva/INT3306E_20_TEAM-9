import React from 'react'
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

  const menu = (
    <Menu>
      <Menu.Item key="PROFILE">
        <NavLink to={'/app/profile'}>My Profile</NavLink>
      </Menu.Item>
      <Menu.Item onClick={clickHandler} key="SIGN_OUT">Sign out</Menu.Item>
    </Menu>
  )

  return (
    <Dropdown
      style={{}}
      overlay={menu}
      trigger={['click']}
      placement="topRight"
      arrow
    >
      <Avatar src={'https://www.bing.com/th?id=OIP.WtYTJGHZ3_-_r2vkTdPEpgHaGG&w=150&h=123&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'}
        style={{ cursor: 'pointer', marginRight: '10px' }}></Avatar>
    </Dropdown>
  )
}

export default TestIcon;