import React from 'react';
import CourseCard from './CourseCard'; // Make sure to adjust the import path

const courses = [
  // Replace these sample courses with your actual course data
  { name: 'Course 1', description: 'Description 1', enrolled: false },
  { name: 'Course 2', description: 'Description 2', enrolled: true },
  { name: 'Course 3', description: 'Description 3', enrolled: false },
  { name: 'Course 4', description: 'Description 4', enrolled: true },
  { name: 'Course 5', description: 'Description 5', enrolled: false },
];

const CourseList = () => {
  const handleEnroll = (courseName) => {
    // Handle enroll logic here
    console.log(`Enrolling in ${courseName}`);
  };

  const handleUnenroll = (courseName) => {
    // Handle unenroll logic here
    console.log(`Unenrolling from ${courseName}`);
  };

  const removeCourse = (courseName) => {
    // Handle remove course logic here
    console.log(`Removing ${courseName}`);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' , marginLeft:'180px'}}>
      {courses.map((course, index) => (
        <CourseCard
          key={index}
          course={course}
          onClick={() => console.log(`Clicked on ${course.name}`)}
          handleEnroll={() => handleEnroll(course.name)}
          handleUnenroll={() => handleUnenroll(course.name)}
          removeCourse={() => removeCourse(course.name)}
          disableEnroll={false} // Adjust as needed
        />
      ))}
    </div>
  );
};

export default CourseList;
