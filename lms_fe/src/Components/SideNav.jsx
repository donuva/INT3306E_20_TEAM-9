import React from 'react';
import { Layout,Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  CrownOutlined,
  HddOutlined
} from '@ant-design/icons'
import { RiArticleLine } from 'react-icons/ri'
import { ImBooks } from 'react-icons/im'
//import { NavLink, useLocation } from 'react-router-dom'
//import 'CSS/App.css'; // Cài đặt CSS của bạn tại đây
//import Sidebar from './Sidebar';

function Home() {
  return (
    <Layout>
    <Menu
        //mode="inline"
        style={{
          overflow: 'auto',
          height: '200vh',
          position: 'fixed',
          left: 0,
          backgroundColor:'orange',
        }}
      >
        <Menu.Item key="/app/dashboard" icon={<DashboardOutlined />}>
          DashBoard
        </Menu.Item>
        <Menu.Item key="/app/courses" icon={<ImBooks />}>
          Courses
        </Menu.Item>
        <Menu.Item key="/app/articles" icon={<RiArticleLine />}>
          Notification
        </Menu.Item>
        <Menu.Item key="/app/acheivements" icon={<CrownOutlined />}>
          Grade
        </Menu.Item>
        <Menu.Item key="/app/archives" icon={<HddOutlined />}>
          Achive
        </Menu.Item>
        <Menu.Item key="/app/profile" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
      </Menu>
  </Layout>
  );
}

export default Home;
