import React from 'react'
import { Space } from 'antd'
import styled from 'styled-components'
import TestIcon from './TestIcon'
import CourseNavigation from './CourseNavigation'
import Notification from './Notification'

const FlexedDiv = styled.div`
  display: block;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  background: #fff;
  border: 1px solid orange;
  margin-left: 150px;
  width: calc(100% - 150px);
  padding:20px;
`

const Header = ({ courseNavigation }) => {
  return (
    <FlexedDiv  style={{marginLeft:'150px', border: 'solid 1px orange'}}>
      <Space >
       <CourseNavigation/>
       <Notification/>
       <TestIcon/>
      </Space>
    </FlexedDiv>
  )
}

export default Header;