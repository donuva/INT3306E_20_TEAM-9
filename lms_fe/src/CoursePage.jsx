import './CSS/footer.css';
import './CSS/Profile.css';
import SideNav from './Components/SideNav';
import Footer from './Components/footer';
import ProfileIcon from './Components/ProfileIcon';
import Profile from './Components/Profile';
import Grade from './Components/Grade';
import TeacherGrade from './Components/TeacherGrade';


function CoursePage() {
  return (
    <div className="App">
      <ProfileIcon/>
      <TeacherGrade/>
      <SideNav/>
     <Footer/>
    </div>
  );
}

export default CoursePage;
