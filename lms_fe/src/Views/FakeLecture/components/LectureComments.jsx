import { Form, List, Typography, Input, Button, Avatar } from 'antd'
import { Comment } from '@ant-design/compatible';
import styled from 'styled-components'

                              

import { DateTime } from 'luxon'

export const Container = styled.div`
  background-color: #fafafa;
  border-radius: 10px;
  padding: 20px 20px;
`

const CommentForm = (props) => {
  const { addComment, avatar } = props

 


  const handleSubmit = (values) => {
    addComment({ comment: values.comment })
  }

  return (
    <Comment
      avatar={avatar}
      content={
        <>
          <Form onFinish={handleSubmit}>
            <Form.Item name="comment" rules={[{ required: true }]}>
              <Input.TextArea allowClear={true} rows={4} />
            </Form.Item>
            <Form.Item>
              
                <Button htmlType="submit" type="primary">
                  Add Comment
                </Button>
            </Form.Item>
          </Form>
        </>
      }
    />
  )
}

const LectureComments = (props) => {

  const { selectedLecture } = props


 


  const getActions = (
    currentUserId,
    commentAuthorId,
    moduleItemId,
    commentId
  ) => {
    if (currentUserId === commentAuthorId)
      return [
        <Typography.Text
        >
          Delete
        </Typography.Text>
      ]
    return []
  }

  return (
    <Container>
      <Typography.Title level={4}>Comments</Typography.Title>
      <List
        style={{ padding: '0px 8px' }}
        locale={{ emptyText: 'no comments' }}
        renderItem={(comment) => (
          <List.Item>
            <Comment
              style={{ color: '#000000d9' }}
              actions={getActions(
                comment.user._id,
                selectedLecture.id,
                comment.id
              )}
              author={
                <Typography.Text strong>{comment.user.name}</Typography.Text>
              }
              avatar={<Avatar src={comment.user.photo} />}
              content={comment.comment}
              datetime={DateTime.fromISO(comment.updatedAt).toRelative()}
            />
          </List.Item>
        )}
      ></List>
      <CommentForm
        avatar={<Avatar/>}
        style={{ padding: '0px 8px' }}
      />
    </Container>
  )
}

export default LectureComments
