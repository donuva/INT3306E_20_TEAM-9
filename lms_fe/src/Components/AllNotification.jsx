import React, { useState, useEffect } from 'react'
import { Collapse, Badge, Button, Card, List, Menu } from 'antd';
import {
  YoutubeFilled,
  NotificationOutlined,
  FileTextOutlined,
  CommentOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  RightOutlined,
  LeftOutlined,
  ExperimentOutlined,
  DashboardOutlined,
} from '@ant-design/icons'; import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Sidebar from './Sidebar';
// import AllComments from './commentCard'
// import {
//   removeDiscussion,
//   addComment
// } from '../../../reducers/discussionReducer'
// import './../styles.css'

function Notification({ checkTokenExpiration, isTeacher }) {

  // const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 0;
  const [notification, setNotification] = useState([]);
  const { cid } = useParams();
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkTokenExpiration()) {
      alert('You need to re-login');
      navigate('/login');
    }
    axios
      .get(`http://localhost:8080/lms/course/notification?course_id=${cid}` + "&current_page=" + page, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
      })
      .then((response) => {

        setNotification(response.data.data); // Lưu trữ dữ liệu lấy từ API vào state
        setPageInfo(response.data);

        console.log("đây là noti ")
        console.log(notification)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [page,]
  );
  const renderPagination = () => {
    return (
      <nav className="footer">
        {pageInfo.totalPages != 0 &&
          <ul className="pagination justify-content-center">

            {page > 0 && (
              <li className='page-item' onClick={() => handlePageChange(page - 1)} ><Link style={{}} className='page-link' >Previous</Link></li>
            )}
            {pageInfo.totalPages &&
              Array.from({ length: pageInfo.totalPages }, (_, index) => (
                <li
                  onClick={() => handlePageChange(index)}
                  key={index}
                  className={page === index ? 'page-item active' : 'page-item'}
                >
                  <Link className='page-link' >{index + 1}</Link>


                </li>
              ))}
            {page < pageInfo.totalPages - 1 && (
              <li onClick={() => handlePageChange(page + 1)} className='page-item' ><Link className='page-link' >Next</Link> </li>
            )}

          </ul>}
      </nav>
    )

  }

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };


  return (
    <div style={{ display: 'flex', minHeight: '1000px' }}>
      <Sidebar cid={cid} isTeacher={isTeacher} selected={'1'}></Sidebar>

      <div className="container" style={{ marginTop: '20px', marginBottom: '20px' }}>

        <Card
          hoverable
          className="customcard"
          title={
            <div style={{ backgroundColor: 'orange', textAlign: 'center' }}>
              <Meta

                title="Notification"
              />

            </div>
          }
        >
          {isTeacher &&
            <Link to={`/app/courses/${cid}/addNoti`}>
              <Button style={{ marginBottom: '20px' }}>New Notification</Button>
            </Link >
          }
          <Card
            size="small"
            type="inner"
            className="commentcard"
            title="It's Notifiying time!"
          >
            {notification.map((notification) => (
              <Card
                size="small"
                title={
                  <span style={{ display: "flex", alignContent: "left" }} >
                    <span style={{ paddingTop: "10px" }}>{' ' + notification.topic}</span>
                  </span>
                }
              >
                <div style={{ textAlign: "left" }} className='notificationData'>{notification.msg}</div>

              </Card>
            ))}
            {renderPagination()}
          </Card>
        </Card>
      </div>
    </div>
  )

}

export default Notification;