import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
import { useState } from 'react';

const ProfileIcon = () => {
  const [userData, setUserData] = useState();
  setUserData(JSON.parse(localStorage.getItem('user')));
  return (
    <Space
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        size: 32,
      }}
    >
      <Badge count={99} >
        <Avatar
          src={'/storage/' + userData.ava_url}
          shape="square" icon={<UserOutlined />} />
      </Badge>
    </Space>
  )
}

export default ProfileIcon;
