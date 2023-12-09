import { Table, Tag, Space } from 'antd';
//import { BarChart, GridlineSeries, Gridline } from 'reaviz';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

const StudentGrade = ({ checkTokenExpiration, isTeacher }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [gpa, SetGpa] = useState([{ gpa: 0 }]);
  const { cid } = useParams();

  useEffect(() => {
    if (!checkTokenExpiration()) {
      alert('You need to re-login');
      navigate('/login');
    }
  }, []);


  useEffect(() => {
    axios
      .get(`http://localhost:8080/lms/student/getCourseScore/${cid}`, { // vẫn static
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
      })
      .then((response) => {

        setData(response.data.scoreExerciseDTOS); // Lưu trữ dữ liệu lấy từ API vào state
        SetGpa([{ gpa: response.data.gpa }])

      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const columns = [
    {
      title: 'Exercise',
      dataIndex: 'exercise',
      key: 'exercise',
      align: 'center',
      render: (exercise) => <span>{exercise.title}</span>
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      align: 'center'
      // render: (text) => <span>{text.grade}</span>
    }

  ];

  const fCol = [

    {
      title: 'GPA',
      dataIndex: 'gpa',
      key: 'gpa',
      align: "center"
    }
  ];
  //   {
  //     title: 'Exams',
  //     dataIndex: 'examsScore',
  //     key: 'examsScore'
  //   },
  //   {
  //     title: 'Total Score',
  //     dataIndex: 'totalScore',
  //     key: 'totalScore'
  //   },
  //   {
  //     title: 'Grade',
  //     dataIndex: 'grade',
  //     key: 'grade'
  //   }
  // ];

  return (
    <div style={{ display: 'flex', minHeight: '1000px' }}>
      <Sidebar cid={cid} isTeacher={isTeacher} selected={'2'}></Sidebar>

      <div style={{ marginTop: '', marginBottom: '20px', flex: '1' }} >
        <h2>Grade Book</h2>
        <Table
          rowKey={(record) => record?.id}
          columns={columns}
          dataSource={data}
          bordered


          footer={() => {
            return (
              <>
                <Table
                  rowKey={() => 'summary'}
                  columns={fCol}
                  dataSource={gpa}
                  bordered

                  pagination={false}
                />
              </>
            );
          }}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default StudentGrade;