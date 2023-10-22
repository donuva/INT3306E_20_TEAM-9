import Header from "../Components/header";
import Footer from "../Components/footer";
import '../CSS/footer.css';
import Forum from "../Components/Forum";
import StudentGrade from "../Components/StudentGrade";

function StudentGradePage() {
  return (
    <div className="App" style={{ paddingBottom: '10px' }}>
     <Header/>
     <StudentGrade/>
     <Footer/>
    </div>
  );
}

export default StudentGradePage;
