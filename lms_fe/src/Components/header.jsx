import React from 'react';
import { Space, Image } from 'antd';
import styled from 'styled-components';
import TestIcon from './TestIcon';
import CourseNavigation from './CourseNavigation';
import Notification from './Notification';
import SearchBox from './SearchBox';
import { Link } from 'react-router-dom';

const FlexedDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background: #3A4D39;
  width: 100%;
  padding: 15px;
`;



const CenteredImage = styled.img`
  margin-right: 10px; /* Khoảng cách giữa hình ảnh và các mục khác trên header */
`;

const Header = ({ isLoggedIn, setLoggedIn }) => {
  return (
    <FlexedDiv>
      <Link to={"/app/courses"}>
        <CenteredImage src="/DEA.png" width={50} alt="Logo" />
      </Link>
      <Space style={{ margin: 'auto' }}>
        <CourseNavigation />
        {isLoggedIn && <TestIcon setLoggedIn={setLoggedIn} />}
      </Space>
    </FlexedDiv>
  );
};

export default Header;
