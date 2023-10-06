import logo from './logo.svg';
import './CSS/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursePage from './CoursePage';
import SideNav from './Components/SideNav';
import Lectures from './Views/Lecture';

function App() {
  return (
    <div className="App">
     
     <Router>
     <SideNav/>
      <Routes>
        <Route path="/app/courses" element={<CoursePage />} />
        <Route path="/app/lectures" element={<Lectures />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
