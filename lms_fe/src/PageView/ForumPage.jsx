import Header from "../Components/header";
import Footer from "../Components/footer";
import '../CSS/footer.css';
import Forum from "../Components/Forum";

function ForumPage() {
  return (
    <div className="App" style={{ paddingBottom: '10px' }}>
     <Header/>
     <Forum/>
     <Footer/>
    </div>
  );
}

export default ForumPage;
