import logo from './logo.svg';
import './CSS/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNav from './Components/SideNav';
import Grade from './Components/StudentGrade';
import CoursePage from './PageView/CoursePage';
import ProfilePage from './PageView/ProfilePage';
import Lecture from './Components/Lecture';
import LectureDetail from './Components/LectureDetail';
import CourseDetailPage from './PageView/CourseDetailPage';
import Forum from './Components/Forum';
import ForumPage from './PageView/ForumPage';
import StudentGrade from './Components/StudentGrade';
import StudentGradePage from './PageView/StudentGradePage';
import TeacherGradePage from './PageView/TeacherGradePage';



function App() {
  return (
    <div className="App">
     <Router>
      {/* <CoursePage/> */}
      <Routes>
        <Route path="/app/courses" element={<CoursePage/>} />
        <Route path="/app/courseDetail" element={<CourseDetailPage/>} />
        <Route path="/app/studentGrade" element={<StudentGradePage/>} />
        <Route path="/app/teacherGrade" element={<TeacherGradePage/>} />
        <Route path="/app/forum" element={<ForumPage/>} />
        <Route path="/app/profile" element={<ProfilePage/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
