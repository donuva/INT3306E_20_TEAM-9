import logo from './logo.svg';
import './CSS/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursePage from './CoursePage';
import SideNav from './Components/SideNav';
import Lectures from './Views/FakeLecture';
import Lecture from './Views/Lecture';
import { Col, Row } from 'antd';

function App() {
  return (
    <div className="App">
     
     <Router>
      <Row style={{display:'flex'}}>
        <Col style={{position: 'fixed', width: '15%'}}><SideNav/></Col>
        <Col style={{marginLeft: '20%'}}>
        
      <Routes>
        <Route path="/app/courses" element={<CoursePage />} />
        <Route path="/app/lectures" element={<Lecture />} />
      </Routes>
        </Col>
      </Row>
     {/* <SideNav/> 
      <Routes>
        <Route path="/app/courses" element={<CoursePage />} />
        <Route path="/app/lectures" element={<Lecture />} />
      </Routes> */}
    </Router>
    </div>
  );
}

export default App;
