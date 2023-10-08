import Header from "../Components/header";
import CourseList from "../Components/CourseList";
import Footer from "../Components/footer";

import '../CSS/footer.css';
function CoursePage() {
  return (
    <div className="App" style={{ paddingBottom: '10px' }}>
     <Header/>
       <CourseList/>
     <Footer/>
    </div>
  );
}

export default CoursePage;
