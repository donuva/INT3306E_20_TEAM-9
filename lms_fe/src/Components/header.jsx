import React from 'react'
import { Space } from 'antd'
import styled from 'styled-components'
import TestIcon from './TestIcon'
import CourseNavigation from './CourseNavigation'
import Notification from './Notification'
import SearchBox from './SearchBox'

const FlexedDiv = styled.div`
  display: block;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  background: #4F6F52;
  width: calc(100% );
  padding:15px;
`

const Header = ({ isLoggedIn, setLoggedIn }) => {
  return (
    <FlexedDiv >
      <Space >
        <CourseNavigation />
        {isLoggedIn &&
          <TestIcon setLoggedIn={setLoggedIn} />
        }
      </Space>
    </FlexedDiv>
  )
}

export default Header;