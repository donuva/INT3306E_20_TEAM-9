import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';


const TeacherGrade = ({ checkTokenExpiration, isTeacher }) => {
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
    if (!checkTokenExpiration()) {
      alert('You need to re-login');
      navigate('/login');
    }
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/teacher/getCourseScore/${cid}`, {
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
  }, []);
  const columns = [
    {
      title: 'Student',
      dataIndex: 'studentDTO',
      key: 'studentDTO',
      align: 'center',
      render: (text) => <a onClick={() => { handleEdit(text.id) }}>{text.user.name}</a>, // nên đổi href lại

    },
    {
      title: 'GPA',
      dataIndex: 'gpa',
      key: 'gpa',
      align: 'center',
      sorter: {
        compare: (a, b) => a.gpa - b.gpa
      }
    }

  ];
  const modalcolumns = [
    {
      title: 'Exercise',
      dataIndex: 'exercise',
      key: 'exercise',
      align: 'center',
      render: (exercise) => <span>{exercise.title}</span>
    },
    {
      title: 'grades',
      dataIndex: 'grade',
      key: 'grade',
      align: 'center'
      // render: (text) => <span>{text.grade}</span>
    }

  ];

  return (
    <div style={{ display: 'flex', minHeight: '1000px' }}>

      <Sidebar cid={cid} isTeacher={isTeacher} selected={'2'}></Sidebar>

      <div style={{ marginTop: '', marginBottom: '20px', flex: '1' }}>
        <Table
          rowKey={(record) => record?.id}
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}

        />
        <Modal
          title="Score Detail"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Table
            rowKey={(record) => record?.id}
            columns={modalcolumns}
            dataSource={modalData}
            bordered
            pagination={false}
          />
        </Modal>
      </div>
    </div>
  );
};

export default TeacherGrade;