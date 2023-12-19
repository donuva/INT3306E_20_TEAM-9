import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import '../CSS/CourseList.css';
import styled from 'styled-components';
import NoData from './NoData';
import { Button, Card, Carousel } from 'antd';
import Meta from 'antd/lib/card/Meta';

export default function Course({ checkTokenExpiration, isTeacher }) {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]); // State để lưu danh sách khóa học
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageInfo, setPageInfo] = useState({});
  const page = searchParams.get('current_page') || 0;
  const [suggestCourse, setSuggestCourse] = useState([]);

  useEffect(() => {
    if (!checkTokenExpiration()) {
      alert('You need to re-login');
      navigate('/login');
    }
  }, [])

  useEffect(() => {
    const role = isTeacher === true ? 'teacher' : 'student';
    const baseUrl = `http://localhost:8080/api/${role}/courses`;
    const params = {};
    if (page !== null) {
      params.current_page = page;
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
  }, [page]); // Sử dụng page trong dependency array để cập nhật khi page thay đổi


  if (pageInfo.totalElements == 0) {
    return (<NoData />)
  }
  const handlePageChange = (newPage) => {
    setSearchParams({ current_page: newPage });
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

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
    <div>
      <h1 style={{ marginTop: '30px', marginBottom: '30px' }}>Courses List</h1>

      {isTeacher === true &&
        <Link to={'/app/create-course'}>
          <Button type='primary'>Create new course</Button>
        </Link>
      }
      {
        pageInfo.totalElements == 0 &&
        <NoData />
      }
      <div className="course-grid">
        {courses.map((course) => (
          <Link to={`/app/courses/${course.id}`} key={course.id} className='course-item'>
            <Card
              hoverable

              cover={<img height='200px' alt="example" src={getImage(course.id)} />}
            >
              <Meta style={{ width: '100%' }} title={course.name} description={course.teacher.user.name} />
            </Card>
          </Link>
        ))}
      </div>




      <nav className="footer">
        {pageInfo.totalPages != 0 &&
          <ul className="pagination justify-content-center">

            {page > 0 && (
              <li className='page-item' onClick={() => handlePageChange(page - 1)} ><Link className='page-link' >Previous</Link></li>
            )}
            {pageInfo.totalPages &&
              Array.from({ length: pageInfo.totalPages }, (_, index) => (
                <li
                  key={index}
                  onClick={() => handlePageChange(index)}
                  className={page == index ? 'page-item active' : 'page-item'}
                >
                  <Link className='page-link' >{index + 1}</Link>


                </li>
              ))}
            {page < pageInfo.totalPages - 1 && (
              <li onClick={() => handlePageChange(page + 1)} className='page-item' ><Link className='page-link' >Next</Link> </li>
            )}
          </ul>}
      </nav>

    </div>
  );
}
