import React, { useState, useEffect } from 'react'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { Collapse, Badge, Button, Card, List, Menu, Input } from 'antd';
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
  DashboardOutlined,
  ExperimentOutlined,
} from '@ant-design/icons';
import Sidebar from './Sidebar'
import TextArea from 'antd/es/input/TextArea'
// import AllComments from './commentCard'
// import {
//   removeDiscussion,
//   addComment
// } from '../../../reducers/discussionReducer'
// import './../styles.css'

function Forum({ checkTokenExpiration, isTeacher }) {

  // const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 0;
  const [comments, setComments] = useState([]);
  const { cid } = useParams();
  const [pageInfo, setPageInfo] = useState({});
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [post, setPost] = useState(false);

  useEffect(() => {
    if (!checkTokenExpiration()) {
      alert('You need to re-login');
      navigate('/login');
    }
    axios
      .get(`http://localhost:8080/course/${cid}/conversation?` + "current_page=" + page, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        }
      })
      .then((response) => {

        setComments(response.data.data); // Lưu trữ dữ liệu lấy từ API vào state
        setPageInfo(response.data);

        console.log("đây là comment ")
        console.log(comments.course_id)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [page, post]
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

  const onPost = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const commentData = JSON.stringify({
      "user": {
        "id": user.id
      },
      "course": {
        "id": cid
      },
      "msg": text
    });
    if (text !== '') {
      axios.post('http://localhost:8080/course/conversation', commentData, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          setText("");
          setPost(!post);
        })
        .catch((error) => {
          console.error("Error posting comment: ", error);
        })
    } else alert('cant post empty comment')
  }

  const onTxtChange = (txt) => {
    setText(txt.target.value)
  }



  return (
    <div style={{ display: 'flex', minHeight: '1000px' }}>
      <Sidebar cid={cid} isTeacher={isTeacher} selected={'3'}></Sidebar>


      <div className="container" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <Card
          hoverable
          className="customcard"
          title={
            <div style={{ textAlign: 'center' }}>
              <Meta

                title="Discussion"
              />
              {/* {discussion.user._id === user._id && (
              // <Button
              //   disabled={!(discussion.user._id === user._id)}
              //   className="deleteButton"
              //   onClick={() => {
              //     // dispatch(removeDiscussion(discussion._id))
              //     console.log("deleted")
              //   }}
              // >
              //   delete
              // </Button>
            )} */}
            </div>
          }
        >

          <Card
            size="small"
            type="inner"
            className="commentcard"
          >
            {/* <AllComments
            comments={discussion.comments}
            dId={discussion._id}
            Luser={user}
          /> */}
            {comments.map((comment) => (
              <Card
                style={{ marginBottom: '15px' }}

                size="small"
                title={
                  <span style={{ display: "flex", alignContent: "left" }} >
                    <Avatar src={"/storage/" + comment.user.ava_url} />
                    <span style={{ paddingTop: "10px", paddingLeft: "10px" }}>{' ' + comment.user.username}</span>
                    {/* { && (
                  <Button
                    disabled={!(comment.user._id === Luser._id)}
                    className="deleteButton"
                    onClick={() => {
                      // dispatch(removeComment(dId, comment))
                      console.log("lol")
                    }}
                  >
                    delete
                  </Button>
                )} */}
                  </span>
                }
              >
                <div style={{ textAlign: "left" }} className='commentData'>{comment.msg}</div>

              </Card>
            ))}
            {renderPagination()}

          </Card>
          <div className="" style={{ marginTop: '20px' }}>
            <TextArea
              size="large"
              allowClear={true}
              bordered={true}
              placeholder="Write your thought here..."
              onChange={onTxtChange}
              className="txt"
            ></TextArea>
            <Button style={{ marginTop: '20px' }} onClick={onPost}>Add Comment</Button>

          </div>
        </Card>
      </div>
    </div>
  )
}

export default Forum;