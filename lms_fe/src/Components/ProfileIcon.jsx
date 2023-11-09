import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';

const ProfileIcon = () => {
  return (
       <Space 
       style={{
        position: 'absolute',
        top: 20,
        right:20,
        size: 32,
      }}
       >
       <Badge count={99} >
         <Avatar 
         src={'https://www.bing.com/th?id=OIP.WtYTJGHZ3_-_r2vkTdPEpgHaGG&w=150&h=123&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'}
         shape="square" icon={<UserOutlined />} />
       </Badge>
     </Space>
  )
}

export default ProfileIcon;
