import React, { useState, useEffect } from 'react';
import { Collapse, Badge, Button, Card, List } from 'antd';
import {
  YoutubeFilled,
  NotificationOutlined,
  FileTextOutlined,
  CommentOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';

const customStyle = {
  textAlign: 'left',
};

const CustomPanel = ({ label, children, addButton, isOpen, togglePanel }) => (
  <div className="custom-panel">
    <div className="custom-label" style={{ textAlign: 'left' }} onClick={togglePanel}>
      {label}
    </div>
    {isOpen && (
      <div style={{ textAlign: 'left', paddingLeft: '24px', paddingTop: '24px' }}>
        {addButton}
        {children}
      </div>
    )}
  </div>
);

const LectureDetail = ({ checkTokenExpiration }) => {
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
      alert('You need to re-login');
      navigate('/login');
    } else {
      setUserData(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const [notificationNumber, setNotificationNumber] = useState(0);
  const [notification, setNotification] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8080/lms/course/notification?course_id=4&current_page=0')
      .then((response) => {
        setNotificationNumber(response.data.totalElements);
        setNotification([...notification, ...response.data.data]);
        console.log('đây là notification');
        console.log(notification);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const [activePanel, setActivePanel] = useState(null);

  // Fake data for lecture items
  const lectureData = [
    { title: 'Lecture 1: Introduction to React', file: 'intro_to_react.pdf' },
    { title: 'Lecture 2: State and Props', file: 'state_and_props.pdf' },
    { title: 'Lecture 3: Components and Lifecycle', file: 'components_lifecycle.pdf' },
  ];

  const togglePanel = (panelKey) => {
    setActivePanel((prevActivePanel) => (prevActivePanel === panelKey ? null : panelKey));
  };

  return (
    <Collapse
      defaultActiveKey={['1', '2', '3', '4']}
      activeKey={activePanel}
      onChange={togglePanel}
      style={customStyle}
    >
      <CustomPanel isOpen={true} togglePanel={() => {}}>
        <Link to="/app/forum" style={{ paddingLeft: '4px', display: 'flex', border: '1px solid #000', width: '80px', borderRadius: '8px', backgroundColor: '#F3BE0F' }}>
          <p>Diễn Đàn</p>
          <CommentOutlined />
        </Link>

        <Link to="/app/studentGrade" style={{ paddingLeft: '4px', display: 'flex', border: '1px solid #000', width: '80px', borderRadius: '8px', backgroundColor: '#F3BE0F' }}>
          <p>Điểm Số</p>
          <BarChartOutlined />
        </Link>
      </CustomPanel>

      <Collapse.Panel
  key="2"
  header={
    <CustomPanel label={<><NotificationOutlined style={{ marginRight: '8px' }} /> Thông Báo</>} addButton={null} isOpen={activePanel === '2'} togglePanel={() => togglePanel('2')}>
      <Badge count={notification.length} showZero>
        <NotificationOutlined style={{ marginRight: '8px' }} />
      </Badge>
    </CustomPanel>
  }
>
<Link to="/app/addNoti" style={{ paddingLeft: '4px', display: 'flex', border: '1px solid #000', width: '120px', borderRadius: '8px', backgroundColor: '#F3BE0F' }}>
    <p>Add Thông Báo</p>
    <NotificationOutlined />
  </Link> 

  {notification.map((notification) => (
    <Card
      size="small"
      title={
        <span style={{ display: 'flex', alignContent: 'left' }}>
          <span style={{ paddingTop: '10px', paddingLeft: '10px' }}>{' ' + notification.topic}</span>
        </span>
      }
    >
      <div style={{ textAlign: 'left' }} className="commentData">
        {notification.msg}
      </div>
    </Card>
  ))}
</Collapse.Panel>

<Collapse.Panel
  key="3"
  header={
    <CustomPanel label={<><FileTextOutlined style={{ marginRight: '8px' }} /> Bài Giảng</>} addButton={null} isOpen={activePanel === '3'} togglePanel={() => togglePanel('3')} />
  }
>
  <Link to="/app/addLecture" style={{ paddingLeft: '4px', display: 'flex', border: '1px solid #000', width: '120px', borderRadius: '8px', backgroundColor: '#F3BE0F' }}>
    <p>Add Bài Giảng</p>
    <FileTextOutlined />
  </Link>
  <FileTextOutlined style={{ marginRight: '8px' }} />
  <List
    dataSource={lectureData}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta title={<Button type="link">{item.title}</Button>} />
        <FileTextOutlined style={{ marginLeft: '8px' }} />
      </List.Item>
    )}
  />
</Collapse.Panel>


<Collapse.Panel
  key="4"
  header={
    <CustomPanel label={<><YoutubeFilled style={{ marginRight: '8px' }} /> Bài Tập</>} addButton={null} isOpen={activePanel === '4'} togglePanel={() => togglePanel('4')} />
  }
>
<Link to="/app/addExercise" style={{ paddingLeft: '4px', display: 'flex', border: '1px solid #000', width: '120px', borderRadius: '8px', backgroundColor: '#F3BE0F' }}>
    <p>Add Bài Tập</p>
    <YoutubeFilled />
  </Link>
  <YoutubeFilled style={{ marginRight: '8px' }} />
  <Button type="link">Chuyển tới trang nộp bài tập</Button>
</Collapse.Panel>

    </Collapse>
  );
};

export default LectureDetail;
