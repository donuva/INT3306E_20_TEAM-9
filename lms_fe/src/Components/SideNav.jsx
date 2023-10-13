import React from 'react';
import { Layout,Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  CrownOutlined,
  HddOutlined
} from '@ant-design/icons';
import { RiArticleLine } from 'react-icons/ri';
import { ImBooks } from 'react-icons/im';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <Layout>
    <Menu
        style={{
          overflow: 'auto',
          height: '200vh',
          display: 'fixed',
          left: 0,
          backgroundColor:'orange',
        }}
      >
         <Menu.Item key="/app/dashboard" icon={<DashboardOutlined />}>
          <NavLink to="/app/dashboard">Dashboard</NavLink>
        </Menu.Item>
        <Menu.Item key="/app/courses" icon={<ImBooks />}>
          <NavLink to="/app/courses">Courses</NavLink>
        </Menu.Item>
        <Menu.Item key="/app/articles" icon={<RiArticleLine />}>
          <NavLink to="/app/articles">Articles</NavLink>
        </Menu.Item>
        <Menu.Item key="/app/acheivements" icon={<CrownOutlined />}>
          <NavLink to="/app/acheivements">Acheivements</NavLink>
        </Menu.Item>
        <Menu.Item key="/app/archives" icon={<HddOutlined />}>
          <NavLink to="/app/archives">Archives</NavLink>
        </Menu.Item>
        <Menu.Item key="/app/profile" icon={<UserOutlined />}>
          <NavLink to="/app/profile">Profile</NavLink>
        </Menu.Item>
      </Menu>
  </Layout>
  );
}

export default Home;
