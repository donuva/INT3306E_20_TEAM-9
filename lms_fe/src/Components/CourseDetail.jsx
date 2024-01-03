import React, { useState, useEffect } from 'react';
import { Button, List, message, Modal, Input, Dropdown, Space, Menu } from 'antd'; // Include Modal
import {
  ContainerOutlined,
  BulbOutlined,
  UserOutlined,
  FormOutlined,
  BookOutlined,
  DownOutlined,
  MoreOutlined,
  DashOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

const CourseDetail = ({ checkTokenExpiration, isTeacher }) => {
  const navigate = useNavigate();

  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };

  const handleEditCourse = () => {
    setEditModalVisible(true);
  };



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
      url: `http://fall2324w20g9.int3306.freeddns.org/api/course/${cid}`,
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

  // const [editCourseInfo, setEditCourseInfo] = useState({
  //   name: course.name,
  //   category: course.category,
  //   description: course.description,
  // });

  const handleLeave = () => {
    axios.delete(`http://fall2324w20g9.int3306.freeddns.org/api/student/leave/${cid}`, {
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
    navigate(`/app/courses/${cid}/lesson/${lessonId}`)

  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };


  const handleSaveEditCourse = () => {
    // // Gửi yêu cầu cập nhật lên server

    // setCourse((prev) => ({
    //   ...prev,
    //   description: editCourseInfo.description,
    //   name: editCourseInfo.name,
    //   category: editCourseInfo.category,
    // }));


    axios
      .put(
        `http://fall2324w20g9.int3306.freeddns.org/api/teacher/course`,
        course,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        }
      )
      .then((response) => {
        messageApi.success('Course updated successfully!');

        handleEditModalCancel();
      })
      .catch((error) => {
        console.error('Error updating course:', error);
        messageApi.error('Failed to update course. Please try again.');
      });
  };



  return (
    <>
      {contextHolder}
      <div style={{ display: 'flex', minHeight: '1000px' }}>
        <Sidebar cid={cid} isTeacher={isTeacher} selected={'0'}></Sidebar>

        <div style={{ flex: 1, marginTop: '30px' }}>
          <h1>{course.name}</h1>
          <div className='course_info' style={{ margin: '50px 40px', textAlign: 'left', display: '' }}>
            <article style={{ display: 'flex' }}>
              <p><UserOutlined /> <strong>Teacher: </strong> {teacher.name} <br />
                <BulbOutlined /> <strong>Category: </strong> {course.category} <br />
                <ContainerOutlined /> <strong>Description: </strong>{course.description}</p>
            </article>
            {isTeacher && (

              <Button type='default' style={{ alignItems: 'center' }} onClick={handleEditCourse}>
                Edit
              </Button>
            )}
          </div>
          <div style={{ marginLeft: '30px', marginRight: '30px' }}>
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

            <h6 style={{ marginTop: '100px' }}>Lesson List</h6>
            <List
              bordered
              dataSource={lessonList}
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

          <Modal
            title="Edit Course"
            visible={editModalVisible}
            onCancel={handleEditModalCancel}
            onOk={handleSaveEditCourse}
          >
            <label htmlFor="edit-course-name">Course Name:</label>
            <Input
              id="edit-course-name"
              value={course.name}
              onChange={(e) =>
                setCourse((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <label htmlFor="edit-course-category">Category:</label>
            <Input
              id="edit-course-category"
              value={course.category}
              onChange={(e) =>
                setCourse((prev) => ({ ...prev, category: e.target.value }))
              }
            />
            <label htmlFor="edit-course-description">Description:</label>
            <Input.TextArea
              id="edit-course-description"
              value={course.description}
              onChange={(e) =>
                setCourse((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </Modal>



        </div>
      </div >
    </>
  );
};

export default CourseDetail;
