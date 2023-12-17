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
  padding: 0 60px;
  background: whitesmoke;
  width: calc(100% );
  padding:20px;
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