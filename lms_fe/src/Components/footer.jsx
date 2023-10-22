import React from "react"
import "../CSS/footer.css"

const Footer = () => {
  return (
    <div className="generalformat">
      <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Sign Up - for the latest update</h1>
            <span>From Team 9 with love.</span>
          </div>
          <div className='right row'>
            <input type='text' placeholder='Enter email address' />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section>
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>TEAM 9 _LMS</h1>
            <span>ONLINE EDUCATION & LEARNING</span>
            <p>TRI THỨC LÀ SỨC MẠNH.</p>

            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-instagram icon'></i>
          </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <li>Courses</li>
              <li>Blog</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className='box link'>
            <h3>Quick Links</h3>
            <ul>
              <li>Contact Us</li>
              <li>Pricing</li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
              <li>Feedbacks</li>
            </ul>
          </div>
          <div className='box'>
            <h3>Recent Post</h3>
          </div>
          <div className='box link'>
            <h3>Have a Questions?</h3>
            <ul>
              <li>
              144 Xuan Thuy, Cau Giay, Ha Noi
              </li>
              <li>
             +0 999 999 999
              </li>
              <li>
            info@yourdomain.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
        Web was create by Team 9 in class INT3306E_20
        </p>
      </div>
    </div>
  )
}


export default Footer;