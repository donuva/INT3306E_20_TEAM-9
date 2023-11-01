import './CSS/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Lecture from './Components/Lecture';
import LectureDetail from './Components/LectureDetail';
import Forum from './Components/Forum';
import StudentGrade from './Components/StudentGrade';
import Header from './Components/header';
import Footer from './Components/footer';
import TeacherGrade from './Components/TeacherGrade';
import Profile from './Components/Profile';
import ListofResult from './Components/ListofResult';
import { AppProvider } from './Components/AppContext'; // Import AppProvider
import Login from './Components/Login';
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import AddLesson from './Components/addLesson';
import AddExercise from './Components/addExercise';


function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const isTeacher = user && user.role === 'TEACHER' ? true : false;
  const [isLoggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    checkTokenExpiration();
  }, [isLoggedIn])


  function getExpirationTime() {
    const token = localStorage.getItem('jwt');
    try {
      const decoded = jwt.decode(token, { complete: true });

      if (decoded && decoded.payload && decoded.payload.exp) {
        return decoded.payload.exp; // Thời hạn ở dạng timestamp (giây)
      }

      return null; // Trường hợp không tìm thấy thời hạn
    } catch (error) {
      console.error('Error decoding JWT:', error.message);
      return null;
    }
  }

  function checkTokenExpiration() {

    var token = localStorage.getItem('jwt');
    token = 'Bearer ' + token;
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/lms/me',
      headers: {
        'Authorization': token,
      }
    };

    axios.request(config)
      .then((response) => {
        console.log('Authorization' + `Bearer ${token}`);
        localStorage.setItem('user', JSON.stringify(response.data));
        setLoggedIn(true)

      })
      .catch((error) => {
        console.log(error);
        console.log('Authorization' + token);

      });


    const expirationTime = getExpirationTime();
    if (expirationTime) {
      const currentTime = Math.floor(Date.now() / 1000); // Thời gian hiện tại dưới dạng Unix timestamp (giây)

      // Đặt một hẹn giờ để kiểm tra thời hạn và lấy token mới nếu sắp hết
      const timeUntilExpiration = expirationTime - currentTime;
      if (timeUntilExpiration > 0) {
        setTimeout(function () {
          // Gọi hàm lấy token mới ở đây
          getNewJwt(localStorage.getItem('jwt'));

        }, timeUntilExpiration * 500); // Chuyển đổi giây thành mili giây
        return true;
      } else {
        setLoggedIn(false);
        localStorage.removeItem('user');
        return false;
      }
    } else {

      setLoggedIn(false);

      return false;
    }

  }


  function getNewJwt(token) {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/lms/renewJwt',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.setItem('jwt', response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }

  return (
    <div className="App">
      <Router>
        <AppProvider> {/* Wrap tất cả các thành phần trong AppProvider */}
          <Header />
          <Routes>
            <Route path="/app/courses" element={<Lecture checkTokenExpiration={checkTokenExpiration} />} />
            <Route path="/app/courseDetail" element={<LectureDetail checkTokenExpiration={checkTokenExpiration}/>} />
            <Route path="/app/studentGrade" element={<StudentGrade />} />
            <Route path="/app/teacherGrade" element={<TeacherGrade />} />
            <Route path="/app/forum" element={<Forum />} />
            <Route path="/app/addLesson" element={<AddLesson  checkTokenExpiration={checkTokenExpiration} />} />
            <Route path="/app/addExercise" element={<AddExercise  checkTokenExpiration={checkTokenExpiration} />} />
            <Route path="/app/listofResult" element={<ListofResult data={"nu"} />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path='/app/profile' element={<Profile setLoggedIn={setLoggedIn} checkTokenExpiration={checkTokenExpiration} />} />
           </Routes>
          <Footer />
        </AppProvider>
      </Router>

    </div>
  );
}

export default App;
