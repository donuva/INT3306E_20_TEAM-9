import logo from './logo.svg';
import './CSS/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursePage from './CoursePage';
import SideNav from './Components/SideNav';
import Lectures from './Views/FakeLecture';
import Lecture from './Views/Lecture';
import { Col, Row } from 'antd';
import LectureDetail from './Views/Lecture/components/LectureDetail';

function App() {
  return (
    <div className="App">
     
     <Router>

     <SideNav/> 
      <Routes>
        <Route path="/app/courses" element={<CoursePage />} />
        <Route path="/app/lectures" element={<Lecture />} />
        <Route path="/app/lecture-detail" element={<LectureDetail />} />

      </Routes>
    </Router>
    </div>
  );
}

export default App;
