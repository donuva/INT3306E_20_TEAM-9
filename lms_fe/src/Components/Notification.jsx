import React from 'react';
import { BellOutlined } from '@ant-design/icons';

const Notification = () => {
  return (
    <div className={'notificationStyle'}>
      <BellOutlined
        style={{
          fontSize: 32,
        }}
      />
    </div>
  );
};

export default Notification;
