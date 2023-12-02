import { Table, Tag, Space } from 'antd';
//import { BarChart, GridlineSeries, Gridline } from 'reaviz';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const StudentGrade = (checkTokenExpiration) => {
  const [data,setData] = useState([]);
  const navigate = useNavigate();
  const [gpa,SetGpa] = useState([{gpa: 0}]);
  const { cid } = useParams();
  useEffect(() => {
    if (!checkTokenExpiration) {
      alert('You need to re-login');
      navigate('/login');
    }
    axios
      .get(`http://localhost:8080/lms/student/getCourseScore/${cid}`, { // vẫn static
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
      })
      .then((response) => {

        setData(response.data.scoreExerciseDTOS); // Lưu trữ dữ liệu lấy từ API vào state
        SetGpa([{gpa : response.data.gpa}])
        console.log('đây là data')
        console.log(data);
        console.log(gpa)

      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  },[]);

  const columns = [
    {
      title: 'Type',
      dataIndex: 'msg',
      key: 'msg',
      // render: (text) => <span>{text.id}</span>
    },
    {
      title: 'grades',
      dataIndex: 'grade',
      key: 'grade',
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
    <div style={{marginTop:'20px',marginBottom:'20px' }} >
      <Table 
        rowKey={(record) => record?.id}
        columns={columns}
        dataSource={data}
        bordered
        
        title={() => {
          return 'The Student GradeBook';
        }}
        footer={() => {
          return (
            <Table
              rowKey={() => 'summary'}
              columns={fCol}
              dataSource={gpa}
              bordered
              
              title={() => 'The course summary'}
              pagination={false}
            />
          );
        }}
        pagination={false}
      />
    </div>
  );
};

export default StudentGrade;