import React from 'react'
import { Button, Dropdown, Menu, Space } from 'antd'
import { Link, NavLink } from 'react-router-dom'
import { DownOutlined, ArrowLeftOutlined } from '@ant-design/icons'


const CourseMenu = ({ url, privilege }) => {
  return (
    <Menu>
      <Menu.Item>
        <Link to={`${url}/announcments`}>Announcments</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${url}/gradebook`}>GradeBook</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`${url}/discussions`}>Discussions</Link>
      </Menu.Item>
      {privilege !== 'student' && (
        <Menu.Item>
          <Link to={`${url}/particpants`}>Particpants</Link>
        </Menu.Item>
      )}

      {privilege !== 'student' && (
        <Menu.Item>
          <Link to={`${url}/settings`}>Settings</Link>
        </Menu.Item>
      )}
    </Menu>
  )
}

const CourseNavigation = () => {
  const { privilege } = 1
  const { url } = '/app/'
  return (
    <>
      <Space>
        <Button
          shape="circle"
          type="secondary"
          icon={<ArrowLeftOutlined />}
        ></Button>
        <Dropdown
          overlay={<CourseMenu url={url} privilege={privilege} />}
          placement="bottomCenter"
        >
          <Button
            shape="round"
            style={{ backgroundColor: 'orange' }}
          >
            <span style={{ fontWeight: 600, color: 'white' }}>
              {"courseName"}
            </span>{' '}
            <DownOutlined style={{ color: 'white' }} />
          </Button>
        </Dropdown>
      </Space>
      <NavLink to={`${url}/modules`}>
        <Button type="text">Modules</Button>
      </NavLink>
      <NavLink to={`${url}/lectures`}>
        <Button type="text">lectures</Button>
      </NavLink>
      <NavLink to={`${url}/assignments`}>
        <Button type="text">Assignments</Button>
      </NavLink>
      <NavLink to={`${url}/exams`}>
        <Button type="text">Exams</Button>
      </NavLink>
      
    </>
  )
}

export default CourseNavigation;