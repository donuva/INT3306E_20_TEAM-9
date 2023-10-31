import React, { useState, useEffect } from 'react'
import { Card, Button, Input } from 'antd'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
// import AllComments from './commentCard'
// import {
//   removeDiscussion,
//   addComment
// } from '../../../reducers/discussionReducer'
// import './../styles.css'

const Forum = () => {

  // const dispatch = useDispatch()
  const [commText, setcommText] = useState('')
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const page = searchParams.get("page") || 1;
  const [comments, setComments] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/lms/course/conversation?course_id=4&current_page=0")
      .then((response) => {
        
        setComments(response.data.data); // Lưu trữ dữ liệu lấy từ API vào state
        console.log("đây là comment ")
        console.log(comments.course_id) 
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []
  );
  const renderPagination = () => {
    return (
        <nav className="footer">
            <ul className="pagination justify-content-center">

                <li className={page == 1 ? "page-item active" : "page-item"}>
                    <Link className="page-link" to={"/app/courses" + '?page=1'} >1</Link>
                </li>
                <li className={page == 2 ? "page-item active" : "page-item"}>
                    <Link className="page-link" to={"/app/courses" + '?page=2'} >2</Link>
                </li>
                <li className={page == 3 ? "page-item active" : "page-item"}>
                    <Link className="page-link" to={"/app/courses" + '?page=3'} >3</Link>
                </li>
                <li className={page == 4 ? "page-item active" : "page-item"}>
                    <Link className="page-link" to={"/app/courses" + '?page=4'} >4</Link>
                </li>
                <li className={page == 5 ? "page-item active" : "page-item"}>
                    <Link className="page-link" to={"/app/courses" + '?page=5'} >5</Link>
                </li>

            </ul>
        </nav>
    )

}

  const onPost = () => {
    if (commText !== '') {
      // dispatch(addComment(discussion._id, commText, user))
      const comment = {
        msg: commText,
        user: 'son doe',
      };
      setComments([...comments, comment]);
      setcommText('')
    } else console.log('cant post empty comment')
  }

  const onTxtChange = (txt) => {
    setcommText(txt.target.value)
  }

  return (
    <div className="container" style={{marginTop:'20px',marginBottom:'20px'}}>
      <Card
        hoverable
        className="customcard"
        title={
          <div style={{backgroundColor:'orange',textAlign:'center'}}>
            <Meta
              
              title="đây là disscussion của môn blah blah" 
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
          title="It's Chatting time!"
        >
          {/* <AllComments
            comments={discussion.comments}
            dId={discussion._id}
            Luser={user}
          /> */}
          {comments.map((comment) => (
            <Card
            size="small"
            title={
              <span style={{display:"flex", alignContent: "left"}} >
                <Avatar src={comment.user.ava_url} / >
                <span style={{paddingTop:"10px", paddingLeft:"10px"}}>{' ' + comment.user.username}</span>
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
            <div style={{textAlign:"left"}} className='commentData'>{comment.msg}</div>
            
          </Card>
          ))}
          {renderPagination()}
        </Card>
        <div className="container">
          <Input
            size="large"
            allowClear={true}
            value={commText}
            bordered={true}
            placeholder="what you think"
            onChange={onTxtChange}
            className="txt"
          ></Input>
          <Button onClick={onPost}>Add Comment</Button>
          
        </div>
      </Card>
    </div>
  )
}

export default Forum;