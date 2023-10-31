import './CSS/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <div className="App">
      <Router>
        <AppProvider> {/* Wrap tất cả các thành phần trong AppProvider */}
          <Header />
          <Routes>
            <Route path="/app/courses" element={<Lecture />} />
            <Route path="/app/courseDetail" element={<LectureDetail />} />
            <Route path="/app/studentGrade" element={<StudentGrade />} />
            <Route path="/app/teacherGrade" element={<TeacherGrade />} />
            <Route path="/app/forum" element={<Forum />} />
            <Route path="/app/profile" element={<Profile />} />
            <Route path="/app/listofResult" element={<ListofResult data={"nu"} />} />
          </Routes>
          <Footer />
        </AppProvider>
      </Router>
    </div>
  );
}

export default App;
