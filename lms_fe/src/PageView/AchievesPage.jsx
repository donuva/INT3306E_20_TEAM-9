import Header from "../Components/header";
import Footer from "../Components/footer";
import '../CSS/footer.css';
import Grade from "../Components/Grade";

function AchievesPage() {
  return (
    <div className="App" style={{ paddingBottom: '10px' }}>
     <Header/>
       <Grade/>
     <Footer/>
    </div>
  );
}

export default AchievesPage;
