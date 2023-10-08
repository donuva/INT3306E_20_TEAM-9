import Header from "../Components/header";
import Footer from "../Components/footer";
import '../CSS/footer.css';
import '../CSS/Profile.css';
import Profile from "../Components/Profile";

function ProfilePage() {
  return (
    <div className="App" style={{ paddingBottom: '10px' }}>
     <Header/>
       <Profile/>
     <Footer/>
    </div>
  );
}

export default ProfilePage;
