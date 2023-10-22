import React, { useState } from 'react'
import { Card, Button, Input } from 'antd'
import Meta from 'antd/lib/card/Meta'
import Avatar from 'antd/lib/avatar/avatar'
// import AllComments from './commentCard'
// import {
//   removeDiscussion,
//   addComment
// } from '../../../reducers/discussionReducer'
// import './../styles.css'

const Forum = () => {

  // const dispatch = useDispatch()
  const [commText, setcommText] = useState('')
  const [comments, setComments] = useState([]);
  // Tạo mock discussion
  const discussion = {
    _id: 1,
    user: {
      _id: 1,
      name: 'John Doe',
      photo: 'https://example.com/avatar.jpg'
    },
    data: 'This is a discussion',
  }

  // Tạo mock user
  const user = {
    _id: 1,
    name: 'John Doe',
    photo: 'https://example.com/avatar.jpg'
  }

  const onPost = () => {
    if (commText !== '') {
      // dispatch(addComment(discussion._id, commText, user))
      const comment = {
        _id: 1,
        text: commText,
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
              avatar={<Avatar src={discussion.user.photo} />}
              title={discussion.user.name}
            />
            {discussion.user._id === user._id && (
              <Button
                disabled={!(discussion.user._id === user._id)}
                className="deleteButton"
                onClick={() => {
                  // dispatch(removeDiscussion(discussion._id))
                  console.log("deleted")
                }}
              >
                delete
              </Button>
            )}
          </div>
        }
      >
        <div className="dis" >{discussion.data}</div>
        <Card
          size="small"
          type="inner"
          className="commentcard"
          title="comments"
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
              <span>
                <Avatar src={comment.user} />
                <span>{' ' + comment.user}</span>
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
            <div className='commentData'>{comment.text}</div>
          </Card>
          ))}
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