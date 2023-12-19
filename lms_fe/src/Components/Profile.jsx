import React, { useState, useEffect } from 'react';
import { Card, Avatar, Descriptions, Button, Modal, Form, Input, DatePicker, Upload, message, Space } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import moment from 'moment';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router';
import axios from 'axios';


const Profile = ({ setLoggedIn, checkTokenExpiration }) => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: null,
    name: '',
    birthdate: '',
    username: '',
    ava_url: null,
    bio: '',
    email: '',
    phone: '',
    role: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!checkTokenExpiration()) {
      alert('You need to re-login');
      navigate('/login');
    } else {
      setUserData(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setLoggedIn(false);
    navigate('/login');
  };

  const handleEdit = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    form.resetFields()
    setIsModalVisible(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Prepare the form data to include both text and file data
      const formData = new FormData();
      formData.append('id', userData.id);
      formData.append('username', userData.username);
      formData.append('email', userData.email);
      formData.append('phone', userData.phone);

      formData.append('name', values.name);
      formData.append('birthdate', values.birthdate.format('DD/MM/YYYY'));
      if (values.file?.[0]?.originFileObj) {
        formData.append('file', values.file[0].originFileObj);
      }
      formData.append('bio', values.bio);

      // Make the API request using axios
      const response = await axios.put('http://fall2324w20g9.int3306.freeddns.org/api/user/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
      });

      // Assuming your API returns updated user data
      const updatedUserData = response.data;

      // Update the state with the updated user data
      setUserData(updatedUserData);

      // Close the modal
      setIsModalVisible(false);

      // Optionally, you can show a success message
      message.success('Profile updated successfully!');


    } catch (error) {
      // Handle any error that occurs during the API request
      console.error('Error updating profile:', error);
      message.error('Failed to update profile. Please try again.');
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };



  return (
    <>

      <div style={{ width: '60vw', margin: 'auto', marginTop: '30px', display: 'flex', height: '1000px' }}>
        <Card hoverable bordered style={{ width: '15vw', margin: 'auto', marginLeft: '10vw', marginTop: '5vh', height: '30vh' }} >
          <Meta style={{
            display: 'block'
          }}
            avatar={<Avatar size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 100,
            }} shape='square' src={'/storage/' + userData.ava_url} />}
            title={userData.name}
            description={userData.bio}

          />

        </Card>

        <Card hoverable bordered style={{ marginLeft: '5vw', width: '30vw', marginTop: '5vh', height: 'max-content' }}>
          <Meta title='General information'></Meta>
          <Descriptions style={{ marginTop: '20px' }} column={1} bordered>
            <Descriptions.Item label={<strong>Username</strong>}>{userData.username}</Descriptions.Item>
            <Descriptions.Item label={<strong>Email</strong>}>{userData.email}</Descriptions.Item>
            <Descriptions.Item label={<strong>Phone</strong>}>{userData.phone}</Descriptions.Item>
            <Descriptions.Item label={<strong>Birthday</strong>}>{userData.birthdate}</Descriptions.Item>
          </Descriptions>
          <Space>
            <Button type="primary" onClick={handleEdit} style={{ marginTop: '10px', width: '80px' }}>
              Edit
            </Button>
            <Button type="primary" onClick={handleLogout} style={{ marginTop: '10px', width: '80px', backgroundColor: 'red' }}>
              Logout
            </Button>
          </Space>
        </Card>

        <Modal
          title="Edit Profile"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={handleSave}
            initialValues={{ name: userData.name, birthdate: moment(userData.birthdate), bio: userData.bio }}
          >
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Birthdate" name="birthdate" rules={[{ required: true, message: 'Please select your birthdate!' }]}>
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item label="Bio" name="bio" rules={[{ required: true, message: 'Please input your bio!' }]}>
              <TextArea />
            </Form.Item>
            <Form.Item
              label="Upload"
              name="file"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
            // Allow only the latest file
            >
              <Upload.Dragger
                beforeUpload={beforeUpload}
                maxCount={1} // Limit the number of files to 1
              >
                <p className="ant-upload-drag-icon">
                  <PlusOutlined />


                </p>
                <p className="ant-upload-text" style={{ overflow: 'clip' }}>Click or drag file to this area to upload</p>
              </Upload.Dragger>
            </Form.Item>
            {/* Add additional fields for other editable information if needed */}
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

    </>
  );

};

export default Profile;
