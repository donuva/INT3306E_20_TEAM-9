// import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'
import Avatar from 'antd/lib/avatar/avatar'
import Meta from 'antd/lib/card/Meta'
import './style.css'
import { Form, Input, Card, Button } from 'antd'
import ImageUploader from 'react-images-upload'
const Profile = () => {
    return (
        <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="avatar">
            <Meta
              avatar={<Avatar size="large"/>}
              title="name"
            />
          </div>
          <h5 className="card-title">{'Role: ' + "role"}</h5>
          <h5 className="card-text">{'@' + "username"}</h5>
          <p className="card-text">
            "email"
            <br />
            <span className="phone">"user mobile"</span>
          </p>
        </div>
        <span>user's Bio</span>
      </div>
      <Card className="Form">
        <Form size="middle" colon={true} labelAlign="left" layout="vertical">
          <Form.Item label="Name:">
            <Input
              allowClear={true}
              className="input"
              value="name"
            />
          </Form.Item>
          <Form.Item label="User Name:">
            <Input
              allowClear={true}
              className="input"
              value="onUserName"
            />
          </Form.Item>
          <Form.Item label="Email:">
            <Input
              allowClear={true}
              className="input"
              value="email"
            />
          </Form.Item>
          <Form.Item label="Mobile:">
            <Input
              allowClear={true}
              className="input"
              value="mobile"
            />
          </Form.Item>
          <Form.Item label="Photo:">
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              imgExtension={['.jpg', '.png']}
              maxFileSize={1048576}
              singleImage={true}
              label="max size 1MB"
            />
            <button>Upload!</button>
          </Form.Item>
          <Button>
            Save Changes
          </Button>
          <Button
            className="unsub"
            type="text"
            title="re-login to subscribe again!!"
          >
            unsubscribe from notifications on all devices
          </Button>
        </Form>
      </Card>
    </div>
    )
}

export default Profile