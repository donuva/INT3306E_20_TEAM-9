import Header from "../Components/header";
import Footer from "../Components/footer";
import '../CSS/footer.css';
import LectureDetail from "../Components/LectureDetail";
function CourseDetailPage() {
  return (
    <div className="App" style={{ paddingBottom: '10px' }}>
     <Header/>
       <LectureDetail/>
     <Footer/>
    </div>
  );
}

export default CourseDetailPage;
