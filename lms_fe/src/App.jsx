import logo from './logo.svg';
import './CSS/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNav from './Components/SideNav';
import Grade from './Components/Grade';
import CoursePage from './PageView/CoursePage';
import AchivesPage from './PageView/AchievesPage';
import ProfilePage from './PageView/ProfilePage';

function App() {
  return (
    <div className="App">
     <Router>
     <SideNav/>
      <Routes>
        <Route path="/app/courses" element={<CoursePage/>} />
        <Route path="/app/archieves" element={<AchivesPage/>} />
        <Route path="/app/profile" element={<ProfilePage/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
