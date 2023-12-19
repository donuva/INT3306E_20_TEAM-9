import React, { useState, useContext } from 'react';
import { Input, Space, Button } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import ListofResult from './ListofResult';
import axios from 'axios';
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);
const onSearch = async (name) => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://fall2324w20g9.int3306.freeddns.org/api/searchStudent?name=' + name + '&current_page=0',
      headers: {
        // ...formData.getHeaders(),
      },
      // data: formData,
    };

    const response = await axios.request(config);
    // console.log(response.data)
  } catch (error) {
    console.log(error);
  }
}

const SearchBox = () => {
  const { searchValue, updateSearchValue } = useContext(AppContext);
  const [Inval, setInval] = useState('');

  const handleInputChange = (e) => {
    // updateSearchValue(e.target.value);
    setInval(e.target.value);
  };


  const handleSearch = () => {
    onSearch(searchValue);
    // console.log(searchValue);
  };

  return (
    <Space direction="horizon" >
      <Input
        placeholder="input search text"
        suffix={suffix}
        onChange={handleInputChange}
        value={Inval}
      />

      <Link to="/app/listofResult">
        <Button type="primary" onClick={() => updateSearchValue(Inval)}>
          Search
        </Button>
      </Link>
      {/* {searchValue} */}
    </Space>
  );
};
export default SearchBox;