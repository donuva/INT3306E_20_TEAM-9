import React from "react";
import { Button, Collapse } from "antd";
import { YoutubeFilled, YoutubeOutlined } from "@ant-design/icons";

const customStyle = {
  marginLeft: "150px",
  marginTop: "150px",
  textAlign: "left",
};

const text = `A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
as a welcome guest in many households across the world.`;

const CustomPanel = ({ label, children }) => (
  <div className="custom-panel">
    <div className="custom-label" style={{ textAlign: "left" }}>
      {label}
    </div>
    <div style={{ textAlign: "left", paddingLeft: "24px" }}>{children}</div>
  </div>
);

const course = {
  id: 0,
  name: "name",
  category: "string",
  description: "string",
  teacher: {
    id: 0,
    user: {
      id: 0,
      name: "string",
      birthdate: "2023-10-14T07:57:02.151Z",
      username: "string",
      ava_url: "string",
      bio: "string",
      email: "string",
      phone: "string",
      roles: ["string"],
      createdDate: "2023-10-14T07:57:02.151Z",
      updatedAt: "2023-10-14T07:57:02.151Z",
    },
    courseList: ["string"],
  },
  lessonList: [
    {
      id: 0,
      topic: "topic lesson 1",
      content: "content lesson 1",
      url: "url lesson 1",
      course: "course lesson 1",
      createdDate: "2023-10-14T07:57:02.151Z",
      updatedAt: "2023-10-14T07:57:02.151Z",
    },
  ],
  examList: [
    {
      id: 0,
      course: "course exam 1",
      title: "title exam 1",
      deadline: "2023-10-14T07:57:02.151Z",
      duration: 0,
      questionList: [
        {
          id: 0,
          content: "string",
          opt1: "string",
          opt2: "string",
          opt3: "string",
          opt4: "string",
          correct_answer: 0,
          exam: "string",
        },
      ],
      createdDate: "2023-10-14T07:57:02.152Z",
      updatedAt: "2023-10-14T07:57:02.152Z",
    },
  ],
  exerciseList: [
    {
      id: 0,
      content: "content exercise 1",
      title: "title exercise 1",
      deadline: "2023-10-14T07:57:02.152Z",
      course: "course exercise 1",
      createdDate: "2023-10-14T07:57:02.152Z",
      updatedAt: "2023-10-14T07:57:02.152Z",
    },
  ],
  createdDate: "2023-10-14T07:57:02.152Z",
  updatedAt: "2023-10-14T07:57:02.152Z",
};
const list = [...course.lessonList, ...course.examList, ...course.exerciseList];
const items = [
  {
    key: "1",
    label: "This is panel header 1",
    children: "children1",
    childrenHtml: (
      <ul>
        <li>
          {" "}
          <a>childrenHtml3</a>
        </li>
        <li>
          <a>childrenHtml3</a>
        </li>
      </ul>
    ),
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: "children2",
    childrenHtml: (
      <ul>
        <li>
          {" "}
          <a>childrenHtml3</a>
        </li>
        <li>
          <a>childrenHtml3</a>
        </li>
      </ul>
    ),
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: "children3",
    childrenHtml: (
      <ul>
        <li style={{ listStyle: "none" }}>
          <a style={{display:"flex",alignItems:'center'}}>
            <YoutubeOutlined
              style={{ marginRight: "8px", width: "50px", height: "50px",fontSize:'40px'}}
            ></YoutubeOutlined>
            <span>childrenHtml3</span>
          </a>
        </li>
        <li>
          <a>childrenHtml3</a>
        </li>
      </ul>
    ),
  },
];
// add field to convert children text to html
const LectureDetail = () => (
  <Collapse defaultActiveKey={["1", "2", "3"]} style={customStyle}>
    {items.map((item) => (
      <Collapse.Panel
        key={item.key}
        header={<CustomPanel label={item.label}></CustomPanel>}
      >
        {item.childrenHtml}
      </Collapse.Panel>
    ))}
  </Collapse>
);

export default LectureDetail;
