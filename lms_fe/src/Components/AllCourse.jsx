import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function AllCourse({ checkTokenExpiration }) {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]); // State để lưu danh sách khóa học
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageInfo, setPageInfo] = useState({});
  const page = searchParams.get('current_page' || null);
  const name = searchParams.get('course_name' || null);
  useEffect(() => {
    if (!checkTokenExpiration()) {
      alert('You need to re-login');
      navigate('/login');
    }
    const baseUrl = 'http://localhost:8080/lms/course/search';
    const params = {};
    if (page !== null) {
      params.current_page = page;
    }
    if (name !== null) {
      params.course_name = name;
    }

    const url = baseUrl + '?' + new URLSearchParams(params).toString();


    axios.get(url, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      }
    })
      .then((response) => {
        setCourses(response.data.data)
        setPageInfo(response.data);
      })
      .catch((error) => console.error('Error fetching courses:', error));
  }, [page, name]); // Sử dụng page trong dependency array để cập nhật khi page thay đổi

  if (courses === null) {
    return (<h1>Loading...</h1>)
  }
  const handlePageChange = (newPage) => {
    setSearchParams({ current_page: newPage, course_name: name === null ? null : name });
    navigate(`/app/allCourse?current_page=${newPage}&course_name=${name}`);
  };

  return (
    <div>
      <h1>All Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/app/course/${course.id}`}>{course.name}</Link>
          </li>
        ))}
      </ul>

      <div className="pagination">
        {page > 0 && (
          <button onClick={() => handlePageChange(page - 1)}>Previous</button>
        )}
        {pageInfo.totalPages &&
          Array.from({ length: pageInfo.totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={page === index ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        {page < pageInfo.totalPages - 1 && (
          <button onClick={() => handlePageChange(page + 1)}>Next</button>
        )}
      </div>

    </div>
  );
}
