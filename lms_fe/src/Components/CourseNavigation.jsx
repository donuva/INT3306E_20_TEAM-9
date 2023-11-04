import React from 'react'
import { Button, Dropdown, Menu, Space } from 'antd'
import { Link, NavLink } from 'react-router-dom'
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

  const openArticle = () => {

  }

  const goBack = () => {
    window.history.back();
  }

  return (
    <>
      <Space>
        <Button
          shape="circle"
          type="secondary"
          icon={<ArrowLeftOutlined />}
          onClick={goBack}
        ></Button>
      </Space >
      <NavLink to="/app/courses">
        <Button type="text" icon={<HomeOutlined />}>Home</Button>
      </NavLink>
      <NavLink to="/app/allCourse" >
        <Button type="text" icon={<ReadOutlined />}>Courses</Button>
      </NavLink>
      <NavLink to="/app/articles">
        <Button type="text" icon={<FileSearchOutlined />} onClick={openArticle()}>Articles</Button>
      </NavLink>
    </>
  )
}

export default CourseNavigation;