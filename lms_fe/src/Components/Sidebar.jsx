import React, { useState } from 'react'
import { Button, Menu } from 'antd';
import {
    NotificationOutlined,
    FileTextOutlined,
    CommentOutlined,
    AppstoreOutlined,
    RightOutlined,
    LeftOutlined,
    ExperimentOutlined,
    DashboardOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function Sidebar({ cid, isTeacher, selected }) {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        console.log(selected)
    };

    return (

        <div className='sidenav' style={{ width: collapsed ? 80 : 256, backgroundColor: '#001529' }}>

            <Menu

                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                defaultSelectedKeys={[selected]}
            >
                <Button onClick={toggleCollapsed} style={{ marginBottom: 16, backgroundColor: '#001529', color: 'white', border: '0px' }}>
                    {collapsed ? <RightOutlined /> : <LeftOutlined />}
                </Button>
                <Menu.Item key="0" icon={<AppstoreOutlined />}>
                    <Link to={`/app/courses/${cid}`}>
                        Course
                    </Link>
                </Menu.Item>
                <Menu.Item key="1" icon={<NotificationOutlined />}>
                    <Link to={`/app/courses/${cid}/notifications`}>Notifications</Link>
                </Menu.Item>
                {/* sua lai theo teacher hay student thi da link tuong ung */}
                <Menu.Item key="2" icon={<DashboardOutlined />}>
                    {isTeacher === true ? (
                        <Link to={`/app/courses/${cid}/teacherGrade`}>Grade</Link>
                    ) : (
                        <Link to={`/app/courses/${cid}/studentGrade`}>Grade</Link>
                    )}
                </Menu.Item>
                <Menu.Item key="3" icon={<CommentOutlined />}>
                    <Link to={`/app/courses/${cid}/forum`}>Forum</Link>
                </Menu.Item>
                {isTeacher === true &&
                    <Menu.Item key="4" icon={<ExperimentOutlined />}>
                        <Link to={`/app/addExercise/${cid}`}>New Exercise</Link>
                    </Menu.Item>
                }
                {isTeacher === true &&
                    <Menu.Item key="5" icon={<FileTextOutlined />}>
                        <Link to={`/app/addLesson/${cid}`}>New Lesson</Link>
                    </Menu.Item>
                }

                {isTeacher === true &&
                    <Menu.Item key="6" icon={<UserAddOutlined />}>
                        <Link to={`/app/courses/${cid}/enroll-request`}>Request List</Link>
                    </Menu.Item>
                }

            </Menu>
        </div>
    )
}