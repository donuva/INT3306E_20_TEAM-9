import { Table, Tag, Space } from 'antd';
//import { BarChart, GridlineSeries, Gridline } from 'reaviz';
import React from 'react';

const Grade = () => {
  const data = {
    grades: [
      { id: 1, type: 'Assignment', title: 'Assignment 1', score: 80, maxScore: 100, weight: 0.3, gradedAt: '2023-09-15T10:30:00' },
      { id: 2, type: 'Exam', title: 'Midterm Exam', score: 75, maxScore: 100, weight: 0.5, gradedAt: '2023-09-10T14:00:00' },
      { id: 3, type: 'Assignment', title: 'Assignment 2', score: 90, maxScore: 100, weight: 0.3, gradedAt: '2023-09-20T09:45:00' },
      { id: 4, type: 'Exam', title: 'Final Exam', score: 85, maxScore: 100, weight: 0.5, gradedAt: '2023-09-25T10:00:00' }
    ],
    assignmentsScore: 170,
    examsScore: 160,
    totalScore: 330,
    grade: 'A'
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'name'
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      sorter: {
        compare: (a, b) => a.score - b.score
      }
    },
    {
      title: 'Max Score',
      dataIndex: 'maxScore',
      key: 'maxScore',
      sorter: {
        compare: (a, b) => a.maxScore - b.maxScore
      }
    },
    
    {
      title: 'Graded At',
      key: 'gradedAt',
      sorter: {
        compare: (a, b) => new Date(a.gradedAt) - new Date(b.gradedAt)
      },
      render: (text, record) => (
        <Space size="middle">
          {new Date(record.gradedAt).toLocaleString()}
        </Space>
      )
    }
  ];

  const fCol = [
    {
      title: 'Assignments',
      dataIndex: 'assignmentsScore',
      key: 'assignmentsScore'
    },
    {
      title: 'Exams',
      dataIndex: 'examsScore',
      key: 'examsScore'
    },
    {
      title: 'Total Score',
      dataIndex: 'totalScore',
      key: 'totalScore'
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade'
    }
  ];

  return (
    <div style={{marginLeft:'180px'}} >
      <Table
        rowKey={(record) => record?.id}
        columns={columns}
        dataSource={data?.grades}
        bordered
        title={() => {
          return 'The Student GradeBook';
        }}
        footer={() => {
          return (
            <Table
              rowKey={() => 'summary'}
              columns={fCol}
              dataSource={[data]}
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

export default Grade;