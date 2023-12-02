import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const TeacherGrade = (checkTokenExpiration) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { cid } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState([])
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleEdit = (id) => {
    const scoreExerciseDTOS = data.find((dataItem) => dataItem.studentDTO.id === id);
    setModalData(scoreExerciseDTOS.scoreExerciseDTOS);
    console.log("đây là điểm hs id " + id);  
    console.log(modalData);
    setIsModalVisible(true);
  };
  useEffect(() => {
    if (!checkTokenExpiration) {
      alert('You need to re-login');
      navigate('/login');
    }
    axios
      .get(`http://localhost:8080/lms/teacher/getCourseScore/${cid}`, {  
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
      })
      .then((response) => {

        setData(response.data); // Lưu trữ dữ liệu lấy từ API vào state
        console.log('đây là data')
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  },[]);
  const columns = [
    {
      title: 'Student',
      dataIndex: 'studentDTO',
      key: 'studentDTO',
      render: (text) => <a onClick={() => handleEdit(text.id)}>{text.id}</a> // nên đổi href lại

    },
    {
      title: 'Điểm tổng',
      dataIndex: 'gpa',
      key: 'gpa',
      sorter: {
        compare: (a, b) => a.gpa - b.gpa
      }
    }

  ];
  const modalcolumns = [
    {
      title: 'Type',
      dataIndex: 'exercise_url',
      key: 'exercise_url',
      // render: (text) => <span>{text.id}</span>
    },
    {
      title: 'grades',
      dataIndex: 'grade',
      key: 'grade',
      // render: (text) => <span>{text.grade}</span>
    }
    
  ];

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <Table
        rowKey={(record) => record?.id}
        columns={columns}
        dataSource={data}
        bordered
        title={() => 'The Instructor GradeBook'}
        pagination={false}
      />
      <Modal
          title="Edit Profile"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Table
        rowKey={(record) => record?.id}
        columns={modalcolumns}
        dataSource={modalData}
        bordered
        title={() => 'The Instructor GradeBook'}
        pagination={false}
      />
        </Modal>
    </div>
  );
};

export default TeacherGrade;