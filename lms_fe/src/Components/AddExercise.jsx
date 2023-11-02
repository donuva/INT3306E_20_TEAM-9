import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddExercise = ({ checkTokenExpiration }) => {
  const navigate = useNavigate();
  const { cid } = useParams();
  const [userData, setUserData] = useState({});
  const [exerciseData, setExerciseData] = useState({
    title: '',
    content: '',
    course: {
      id: cid
    },
    deadline: '',
  });

  useEffect(() => {
    if (!checkTokenExpiration()) {
      alert("You need to re-login");
      navigate('/login');
    } else {
      setUserData(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({ ...exerciseData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/lms/teacher/exercise/create', exerciseData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('jwt')
        },
      });
      console.log('Exercise created:', response.data);
      alert('Created exercise')
      navigate('/app/courseDetail');
    } catch (error) {
      console.error('Error creating exercise:', error);
    }
  };

  return (
    <div>
      <h1>Create New Exercise</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={exerciseData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={exerciseData.content}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={exerciseData.deadline}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Create Exercise</button>
      </form>
    </div>
  );
};

export default AddExercise;
