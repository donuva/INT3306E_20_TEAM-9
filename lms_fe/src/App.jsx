import './CSS/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import AddLesson from './Components/AddLesson';
import ExerciseDetail from './Components/ExerciseDetail';
import WorkList from './Components/WorkList';
import AllCourse from './Components/AllCourse';
import AddExercise from './Components/AddExercise';
import CourseDetail from './Components/CourseDetail';
import CourseEnroll from './Components/CourseEnroll';
import AddNoti from './Components/AddNoti';
import Course from './Components/Course';
import AllNotification from './Components/AllNotification';
import CreateCourse from './Components/CreateCourse';
import Signup from './Components/Signup';
import CoursePreview from './Components/CoursePreview';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const isTeacher = user && user.role === 'TEACHER' ? true : false;
  const [isLoggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    checkTokenExpiration();
    console.log(isTeacher);
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
          <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
          <Routes>
            <Route index element={<Navigate to="/app/courses" replace />} />

            {/* lấy ra tất cả course của người học/người dạy/ hay chính là home */}
            <Route path="/app/courses" element={<Course checkTokenExpiration={checkTokenExpiration} isTeacher={isTeacher} />} />
            {/* lấy ra course detail theo id */}
            <Route path="/app/courses/:cid" element={<CourseDetail checkTokenExpiration={checkTokenExpiration} isTeacher={isTeacher} />} />

            <Route path='/app/courses/preview/:cid' element={<CoursePreview checkTokenExpiration={checkTokenExpiration} />} />
            {/*Lấy ra tất cả course  */}
            <Route path="/app/allCourse" element={<AllCourse checkTokenExpiration={checkTokenExpiration} />} />
            {/* Form tạo course mới */}
            <Route path="/app/create-course" element={<CreateCourse checkTokenExpiration={checkTokenExpiration} />} />

            <Route path="/app/courses/:cid/studentGrade" element={<StudentGrade checkTokenExpiration={checkTokenExpiration} />} />
            {/* <Route path="/app/teacherGrade" element={<TeacherGrade />} /> */}
            <Route path="/app/courses/:cid/forum" element={<Forum checkTokenExpiration={checkTokenExpiration} isTeacher={isTeacher} />} />
            <Route path="/app/addLesson/:cid" element={<AddLesson checkTokenExpiration={checkTokenExpiration} isTeacher={isTeacher} />} />
            {/* <Route path="/app/studentGrade" element={<StudentGrade checkTokenExpiration={checkTokenExpiration} />} /> */}
            <Route path="/app/courses/:cid/teacherGrade" element={<TeacherGrade checkTokenExpiration={checkTokenExpiration} />} />
            <Route path="/app/courses/:cid/forum" element={<Forum checkTokenExpiration={checkTokenExpiration} />} />
            <Route path="/app/addLesson" element={<AddLesson checkTokenExpiration={checkTokenExpiration} />} />
            <Route path="/app/listofResult" element={<ListofResult data={"nu"} />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path='/app/profile' element={<Profile setLoggedIn={setLoggedIn} checkTokenExpiration={checkTokenExpiration} />} />


            <Route path='/app/addExercise/:cid' element={<AddExercise checkTokenExpiration={checkTokenExpiration} isTeacher={isTeacher} />} />
            {/* Neu la teacher, hien thi de bai, va nut xoa, neu co ?student_id hien thi ra bai lam cua hoc sinh, 1 neu la giao vien thi duoc phep cham diem 2 hoc sinh thi duoc phep nop hoac xem lai */}
            <Route path='/app/course/:cid/exercise/:eid' element={<ExerciseDetail checkTokenExpiration={checkTokenExpiration} isTeacher={isTeacher} />} />
            {/* Hien ra danh sach bai lam cua 1 exercise cho teacher */}
            <Route path='/app/course/:cid/teacher/exercise/:eid' element={<WorkList checkTokenExpiration={checkTokenExpiration} />} />

            <Route path='/app/courses/:cid/enroll' element={<CourseEnroll checkTokenExpiration={checkTokenExpiration} isTeacher={isTeacher} />} />
            <Route path='/app/courses/:cid/addNoti' element={<AddNoti checkTokenExpiration={checkTokenExpiration} isTeacher={isTeacher} />} />
            <Route path='/app/courses/:cid/notifications' element={<AllNotification checkTokenExpiration={checkTokenExpiration} isTeacher={isTeacher} />} />
          </Routes>
          <Footer />
        </AppProvider>
      </Router>

    </div>
  );
}

export default App;
