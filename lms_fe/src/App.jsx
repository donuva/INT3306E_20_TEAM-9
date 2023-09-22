import logo from './logo.svg';
import './CSS/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursePage from './CoursePage';
import SideNav from './Components/SideNav';

function App() {
  return (
    <div className="App">
     
     <Router>
     <SideNav/>
      <Routes>
        <Route path="/app/courses" element={<CoursePage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
