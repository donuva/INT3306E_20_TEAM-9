import logo from './logo.svg';
import './CSS/App.css';
import './CSS/footer.css';
import SideNav from './Components/SideNav';
import Footer from './Components/footer';
import ProfileIcon from './Components/ProfileIcon';
import Notification from './Components/Notification';

function App() {
  return (
    <div className="App">
     
      <ProfileIcon/>
      <SideNav/>
     <Footer/>
    </div>
  );
}

export default App;
