import React, { useContext, useEffect, useState } from 'react';
import { List, Avatar } from 'antd';
import { AppContext } from './AppContext';
import axios from 'axios';

const ListofResult = () => {
  const { searchValue } = useContext(AppContext);
  // console.log(searchValue)
  const [students, setStudents] = useState([]);

  const onSearch = async (name) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/api/searchStudent?name=' + name + '&current_page=0',
        headers: {
          // ...formData.getHeaders(),
        },
        // data: formData,
      };

      const response = await axios.request(config);
      // console.log(response.data.data)
      setStudents(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    onSearch(searchValue);
  }, [searchValue]);

  return (
    <List
      dataSource={students}
      renderItem={(student) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={student.avatarUrl} />}
            title={student.user.name}
            description={student.user.birthdate}
          />
        </List.Item>
      )}
    />
  );
};

export default ListofResult;
