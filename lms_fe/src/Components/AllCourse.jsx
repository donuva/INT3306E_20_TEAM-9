import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import '../CSS/CourseList.css';
import styled from 'styled-components';

export default function AllCourse({ checkTokenExpiration }) {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]); // State để lưu danh sách khóa học
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageInfo, setPageInfo] = useState({});
  const page = searchParams.get('current_page' || null);
  const name = searchParams.get('course_name' || null);

  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    setSearchParams({ course_name: searchText, current_page: 0 });
  };

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
    setSearchParams({ current_page: newPage, course_name: name === null ? '' : name });
    navigate(`/app/allCourse?current_page=${newPage}&course_name=${name}`);
  };


  function getImage(i) {
    const img = ['https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg?size=626&ext=jpg&ga=GA1.1.1862066008.1698941467&semt=sph',
      'https://img.freepik.com/free-vector/abstract-smooth-liquid-banner-presentation-backdrop_1017-42992.jpg?size=626&ext=jpg&ga=GA1.1.1862066008.1698941467&semt=sph',
      'https://img.freepik.com/free-vector/blue-copy-space-digital-background_23-2148821698.jpg?size=626&ext=jpg&ga=GA1.1.1862066008.1698941467&semt=sph',
      'https://img.freepik.com/free-vector/blue-curve-frame-template_53876-114605.jpg?size=626&ext=jpg&ga=GA1.1.1862066008.1698941467&semt=sph', 'https://img.freepik.com/premium-photo/organic-asian-japanese-line-wave-pattern-oriental-pattern-traditional-copy-space-with-white-background_1715-3929.jpg?size=626&ext=jpg&ga=GA1.1.1862066008.1698941467&semt=sph',
      'https://img.freepik.com/free-vector/gradient-hexagonal-background_23-2148932756.jpg?size=626&ext=jpg&ga=GA1.1.1862066008.1698941467&semt=sph',
      'https://img.freepik.com/free-photo/blue-abstract-gradient-wave-wallpaper_53876-108364.jpg?size=626&ext=jpg&ga=GA1.1.1862066008.1698941467&semt=sph', 'https://img.freepik.com/premium-photo/widescreen-abstract-white-background_926199-24622.jpg?size=626&ext=jpg&ga=GA1.1.1862066008.1698941467&semt=sph',
      'https://img.freepik.com/free-vector/gradient-white-background-with-wavy-lines_79603-2166.jpg?size=626&ext=jpg&ga=GA1.1.1862066008.1698941467&semt=sph']

    return img[i % (img.length)];
  }

  return (
    <div>
      <h1>All Courses</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      <div className="course-grid">
        {courses.map((course) => (
          <Link to={`/app/course/${course.id}`} key={course.id} className='course-item'>
            <div style={{ backgroundImage: `url(${getImage(course.id)})`, height: '200px' }} />
            <div style={{ marginTop: '10px' }}>
              <h5>{course.name}</h5>
              <p><strong>Teacher: </strong>  {course.teacher.user.name}</p>
            </div>
          </Link>
        ))}
      </div>


      <div className="pagination">
        {page > 0 && (
          <button onClick={() => handlePageChange(page - 1)}>Previous</button>
        )}
        {pageInfo.totalPages &&
          Array.from({ length: pageInfo.totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={page == index ? 'pagination-active' : ''}
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
