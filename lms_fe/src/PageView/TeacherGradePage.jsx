import Header from "../Components/header";
import Footer from "../Components/footer";
import '../CSS/footer.css';
import Forum from "../Components/Forum";
import TeacherGrade from "../Components/TeacherGrade";


function TeacherGradePage() {
  return (
    <div className="App" style={{ paddingBottom: '10px' }}>
     <Header/>
     <TeacherGrade/>
     <Footer/>
    </div>
  );
}

export default TeacherGradePage;
