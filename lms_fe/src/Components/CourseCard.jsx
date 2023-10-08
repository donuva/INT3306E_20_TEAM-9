import React from 'react'

import { Button, Card, Dropdown, Menu } from 'antd'

const CourseImage = ({ image, backgroundColor }) => {
  if (!image)
    return (
      <div style={{ backgroundColor: `${backgroundColor}`, height: 256, border:'solid black 1px' }}></div>
    )

  return (
    <img
      style={{
        maxHeight: 256,
        objectFit: 'cover',
        objectPosition: 'top'
      }}
      alt="course img"
      src={image}
    />
  )
}

const CardContent = (props) => {
  const {
    description,
    enrolled,
    onEnroll,
    onUnenroll,
    loadingEnroll,
    disableEnroll
  } = props

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {description}
      <div
        onClick={(event) => {
          event.stopPropagation()
        }}
        style={{
          marginTop: '20px',
          alignSelf: 'flex-end'
        }}
      >
        {!disableEnroll && (
          <>
            {!enrolled && (
              <Button loading={loadingEnroll} onClick={() => onEnroll()}>
                Enroll
              </Button>
            )}

            {enrolled && (
              <Button loading={loadingEnroll} onClick={() => onUnenroll()}>
                Unenroll
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const CourseCard = (props) => {
    const {
      course,
      onClick,
      handleEnroll,
      handleUnenroll,
      removeCourse,
      disableEnroll
    } = props;
  
    // Check if the 'course' object exists
    if (!course) {
      // You can return some default content or null if necessary
      return null;
    }
  
    const { enrolled, privilege } = course;
  
    const loadingEnroll = course.loadingEnroll;
  
    const optionMenu = (
      <Menu>
        {privilege === 'student' && <Menu.Item>Review Course</Menu.Item>}
        {(privilege === 'instructor' || privilege === 'admin') && (
          <Menu.Item onClick={removeCourse} danger>
            Delete Course
          </Menu.Item>
        )}
      </Menu>
    );
  
    return (
      <Card
        hoverable
        bordered={false}
        cover={
          <CourseImage
            image={/*course.image*/'https://www.bing.com/th?id=OIP.WtYTJGHZ3_-_r2vkTdPEpgHaGG&w=150&h=123&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'}
            backgroundColor={course.backgroundColor}
          />
        }
        onClick={onClick}
      >
        <Card.Meta
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {course.name}
              <span
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                {enrolled && !disableEnroll && (
                  <Dropdown.Button
                    placement="bottomCenter"
                    type="text"
                    overlay={optionMenu}
                  ></Dropdown.Button>
                )}
              </span>
            </div>
          }
          description={
            <CardContent
              loadingEnroll={loadingEnroll}
              description={course.description}
              enrolled={enrolled}
              onEnroll={handleEnroll}
              onUnenroll={handleUnenroll}
              disableEnroll={disableEnroll}
            />
          }
        />
      </Card>
    );
  };
  
export default CourseCard;