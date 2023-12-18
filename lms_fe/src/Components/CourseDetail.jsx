import React, { useState, useEffect, useContext } from 'react';
import { Collapse, Badge, Button, Card, List, Menu, message, Modal } from 'antd'; // Include Modal
import {
  ExperimentOutlined,
  NotificationOutlined,
  FileTextOutlined,
  CommentOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  BulbOutlined,
  UserOutlined,
  RightOutlined,
  LeftOutlined,
  DashboardOutlined,
  FormOutlined,
  BookOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import { AppContext } from './AppContext';

const CourseDetail = ({ checkTokenExpiration, isTeacher }) => {
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
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
  const { cid } = useParams();
  const [course, setCourse] = useState({});
  const [exerciseList, setExerciseList] = useState([]);
  const [lessonList, setLessonList] = useState([]);
  const [teacher, setTeacher] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState({});

  useEffect(() => {
    if (!checkTokenExpiration()) {
      alert('You need to re-login');
      navigate('/login');
    } else {
      setUserData(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://localhost:8080/api/course/${cid}`,
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      },
    };

    axios.request(config).then((response) => {
      setCourse(response.data);
      setExerciseList(response.data.exerciseList);
      setLessonList(response.data.lessonList);
      setTeacher(response.data.teacher.user);
    }).catch((error) => {
      if (error.response.status === 402) {
        navigate(`/app/courses/preview/${cid}`)
      }
      console.log(error);
    });
  }, []);

  const handleLeave = () => {
    axios.delete(`http://localhost:8080/api/student/leave/${cid}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then((response) => {
      alert('Left course!')
      navigate('/app/courses')
    }).catch((error) => {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: 'Leave course fail!',
        duration: 5,
      });
    })
  };

  const handleLessonClick = (lessonId) => {
    const lessonApiUrl = `http://localhost:8080/api/course/lesson/${lessonId}`;
    axios
      .get(lessonApiUrl, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
      })
      .then((response) => {
        setSelectedLesson({
          id: lessonId,
          topic: response.data.topic,
          content: response.data.content,
          url: response.data.url,
        });
        setModalVisible(true);
      })
      .catch((error) => {
        console.error('Error fetching lesson:', error);
      });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      {contextHolder}
      <div style={{ display: 'flex', minHeight: '1000px' }}>
        <Sidebar cid={cid} isTeacher={isTeacher} selected={'0'}></Sidebar>

        <div style={{ flex: 1, marginTop: '30px' }}>
          <h1>{course.name}</h1>
          <div className='course_info' style={{ margin: '50px 40px', textAlign: 'left' }}>
            <article>
              <p><UserOutlined /> <strong>Teacher: </strong> {teacher.name} <br />
                <BulbOutlined /> <strong>Category: </strong> {course.category} <br />
                <ContainerOutlined /> <strong>Description: </strong>{course.description}</p>
            </article>
          </div>
          <div style={{ marginLeft: '30px' }}>
            <hr></hr>
            <h6>Exercise List</h6>
            <List
              bordered
              dataSource={exerciseList}
              renderItem={(item) => (
                <List.Item>
                  <Link style={{ textDecoration: 'none', color: 'black', fontSize: 'medium' }} to={`/app/courses/${cid}/exercise/${item.id}`}>
                    <FormOutlined /> <strong>{item.title}</strong>
                  </Link>
                </List.Item>
              )}
            />

            <hr></hr>
            <h6>Lesson List</h6>
            <List
              bordered
              dataSource={lessonList}
              style={{ marginTop: '30px' }}
              renderItem={(item) => (
                <List.Item onClick={() => handleLessonClick(item.id)}>
                  <Link style={{ textAlign: 'left', textDecoration: 'none', color: 'black', fontSize: 'medium' }}>
                    <BookOutlined /> <strong>{item.topic}</strong>
                  </Link>
                </List.Item>
              )}
            />

          </div>
          {isTeacher === false && (
            <Button style={{ background: '#ff3333', color: 'white', marginTop: '50px' }} key="accept" onClick={handleLeave}>
              Leave course
            </Button>
          )}

          {/* Modal for displaying lesson details */}
          <Modal
            title={selectedLesson.topic}
            visible={modalVisible}
            onCancel={handleModalCancel}
            footer={[
              <Button key="back" onClick={handleModalCancel}>
                Close
              </Button>,
            ]}
          >
            <p>
              <strong>Topic:</strong> {selectedLesson.topic}
            </p>
            <p>
              <strong>Content:</strong> {selectedLesson.content}
            </p>
            <p>
              <strong>File:</strong>{' '}
              {selectedLesson.url ? (
                <a href={`/storage/${selectedLesson.url}`} target="_blank" rel="noopener noreferrer">
                  Open File
                </a>
              ) : (
                'File not found'
              )}
            </p>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
