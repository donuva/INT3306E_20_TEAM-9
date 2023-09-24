import React from 'react';
import { Table, Button } from 'antd';

const teacherGrade = () => {
  const columns = [
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
      render: (text) => <a>{text.name}</a>,
    },
    {
      title: 'Type',
      dataIndex: 'assessment',
      key: 'assessment',
      render: (text) => <span>{text.type}</span>,
    },
    {
      title: 'Title',
      dataIndex: 'assessment',
      key: 'assessment',
      render: (text) => <a>{text.title}</a>,
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      sorter: {
        compare: (a, b) => a.score - b.score,
      },
    },
    {
      title: 'Max Score',
      dataIndex: 'assessment',
      key: 'assessment',
      render: (text) => <span>{text.maxScore}</span>,
      sorter: {
        compare: (a, b) => a.assessment.maxScore - b.assessment.maxScore,
      },
    },
    // {
    //   title: 'Weight',
    //   dataIndex: 'assessment',
    //   key: 'assessment',
    //   render: (text) => <span>{String(text.weight * 100) + '%'}</span>,
    //   sorter: {
    //     compare: (a, b) => Number(a.assessment.weight) - Number(b.assessment.weight),
    //   },
    // },
    {
      title: 'Graded At',
      key: 'gradedAt',
      sorter: {
        compare: (a, b) => new Date(a.gradedAt) - new Date(b.gradedAt),
      },
      render: (text, record) => <span>{new Date(record.gradedAt).toLocaleString()}</span>,
    },
  ];

  const data = [
    {
      id: 1,
      student: {
        name: 'John',
      },
      assessment: {
        type: 'Exam',
        title: 'Midterm',
        maxScore: 100,
        weight: 0.3,
      },
      score: 85,
      gradedAt: '2023-09-20T09:00:00Z',
    },
    {
      id: 2,
      student: {
        name: 'Alice',
      },
      assessment: {
        type: 'Assignment',
        title: 'Homework 1',
        maxScore: 50,
        weight: 0.2,
      },
      score: 45,
      gradedAt: '2023-09-22T14:30:00Z',
    },
    {
      id: 3,
      student: {
        name: 'Bob',
      },
      assessment: {
        type: 'Quiz',
        title: 'Quiz 1',
        maxScore: 20,
        weight: 0.1,
      },
      score: 18,
      gradedAt: '2023-09-23T10:15:00Z',
    },
    {
      id: 4,
      student: {
        name: 'Emily',
      },
      assessment: {
        type: 'Exam',
        title: 'Final Exam',
        maxScore: 200,
        weight: 0.5,
      },
      score: 190,
      gradedAt: '2023-09-24T11:45:00Z',
    },
    {
      id: 5,
      student: {
        name: 'Michael',
      },
      assessment: {
        type: 'Assignment',
        title: 'Homework 2',
        maxScore: 60,
        weight: 0.2,
      },
      score: 55,
      gradedAt: '2023-09-22T16:30:00Z',
    },
    {
      id: 6,
      student: {
        name: 'Sarah',
      },
      assessment: {
        type: 'Quiz',
        title: 'Quiz 2',
        maxScore: 15,
        weight: 0.1,
      },
      score: 12,
      gradedAt: '2023-09-23T11:30:00Z',
    },
    {
      id: 7,
      student: {
        name: 'David',
      },
      assessment: {
        type: 'Assignment',
        title: 'Homework 3',
        maxScore: 70,
        weight: 0.3,
      },
      score: 68,
      gradedAt: '2023-09-24T09:30:00Z',
    },
  ];
  return (
    <div style={{marginLeft:'180px'}}>
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

export default teacherGrade;