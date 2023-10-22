import React from "react";
import { Collapse, Badge, Button } from "antd";
import {
  YoutubeFilled,
  NotificationOutlined,
  FileTextOutlined,
  CommentOutlined,
  BarChartOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const customStyle = {
  textAlign: "left",
};

const CustomPanel = ({ label, children }) => (
  <div className="custom-panel">
    <div className="custom-label" style={{ textAlign: "left" }}>
      {label}
    </div>
    <div style={{ textAlign: "left", paddingLeft: "24px" ,paddingTop: "24px"}}>{children}</div>
  </div>
);

const LectureDetail = () => (
  <Collapse defaultActiveKey={["1", "2", "3", "4"]} style={customStyle}>
    
        <CustomPanel>
        <Link to="/app/forum" style={{ paddingLeft: "4px",display: 'flex',border: '1px solid #000', width: '80px', borderRadius: '8px',backgroundColor:'#F3BE0F'}}>
          <p>Diễn Đàn</p>
          <CommentOutlined/>
        </Link>
        
        {/* Tạm thời fix là studentGrade, api xong sửa theo role: teacher | student */}
        <Link to="/app/studentGrade" style={{paddingLeft: "4px", display: 'flex',border: '1px solid #000',width: '80px', borderRadius: '8px',backgroundColor:'#F3BE0F'}}>
          <p>Điểm Số</p>
          <BarChartOutlined />
        </Link>
      </CustomPanel>
    

    <Collapse.Panel
      key="2"
      header={
        <CustomPanel label="Thông Báo">
          <Badge count={99} showZero>
            <NotificationOutlined style={{ marginRight: "8px" }} />
          </Badge>
        </CustomPanel>
      }
    />

    <Collapse.Panel
      key="3"
      header={
        <CustomPanel label="Bài Giảng">
          <FileTextOutlined style={{ marginRight: "8px" }} />
          <Button type="link">Xem tệp PDF</Button>
        </CustomPanel>
      }
    />

    <Collapse.Panel
      key="4"
      header={
        <CustomPanel label="Bài Tập">
          <YoutubeFilled style={{ marginRight: "8px" }} />
          <Button type="link">Chuyển tới trang nộp bài tập</Button>
        </CustomPanel>
      }
    />
  </Collapse>
);

export default LectureDetail;
