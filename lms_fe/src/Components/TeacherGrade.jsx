import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const TeacherGrade = (checkTokenExpiration) => {
  const [data,setData] = useState([]);
  const navigate = useNavigate();
  const { cid } = useParams();
  useEffect(() => {
    if (!checkTokenExpiration) {
      alert('You need to re-login');
      navigate('/login');
    }
    axios
      .get(`http://localhost:8080/lms/teacher/getCourseScore/${cid}`, {  // vẫn static(dùng params ko đc?)
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
  });
  const columns = [
    {
      title: 'Student',
      dataIndex: 'studentDTO',
      key: 'studentDTO',
      render: (text) => <a href='/app/studentGrade'>{text.id}</a> // nên đổi href lại
      
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


  return (
    <div style={{marginTop:'20px',marginBottom:'20px' }}>
      <Table
        rowKey={(record) => record?.id}
        columns={columns}
        dataSource={data}
        bordered
        title={() => 'The Instructor GradeBook'}
        pagination={false}
      />
    </div>
  );
};

export default TeacherGrade;