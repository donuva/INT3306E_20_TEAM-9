import React from 'react'
import { Button, Dropdown, Menu, Space } from 'antd'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { DownOutlined, ArrowLeftOutlined, ReadOutlined, HomeOutlined, FileSearchOutlined } from '@ant-design/icons'


const CourseMenu = ({ url, privilege }) => {
  return (
    <Menu>
      <Menu.Item>
        <Link to={`${url}/resources`}>Resource</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${url}/forum`}>Discussions</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${url}/settings`}>Settings</Link>
      </Menu.Item>
    </Menu>
  )
}

const CourseNavigation = () => {
  const { privilege } = 1
  const { url } = '/app/'
  const navigate = useNavigate();




  const goBack = () => {
    window.history.back();
  }

  return (
    <>
      <Space>
        <Button
          style={{ color: '#ECE3CE' }}
          shape="circle"
          type="secondary"
          icon={<ArrowLeftOutlined />}
          onClick={goBack}
        ></Button>
      </Space >
      <Space>
        <NavLink to="/app/courses">
          <Button style={{ fontSize: 'large', color: '#ECE3CE' }} type="text" icon={<HomeOutlined />}><strong>Home</strong> </Button>
        </NavLink>
        <NavLink to="/app/allCourse" >
          <Button style={{ fontSize: 'large', color: '#ECE3CE' }} type="text" icon={<ReadOutlined />}><strong>Courses</strong> </Button>
        </NavLink>
        <NavLink to="/app/articles">
          <Button style={{ fontSize: 'large', color: '#ECE3CE' }} type="text" icon={<FileSearchOutlined />}><strong>Articles</strong> </Button>
        </NavLink>
      </Space>
    </>
  )
}

export default CourseNavigation;