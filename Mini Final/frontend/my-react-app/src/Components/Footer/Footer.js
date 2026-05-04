import React from "react";
import "./Footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Company</h3>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Reservation</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Condition</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact</h3>
          <p>📍 Mumbai , Maharashtra, India</p>
          <p>📞 +91 77601 93777</p>
          <p>📧 nutritrack@enquiry</p>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Opening</h3>
          <p>Monday - Saturday</p>
          <p>09AM - 09PM</p>
          <p>Sunday</p>
          <p>10AM - 08PM</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Newsletter</h3>
          <p>Hello Everyone, Welcome To NutriTrack!</p>
          <div className="newsletter">
            <input type="email" placeholder="Your email" />
            <button className="signup-btn">SIGNUP</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© NutriTrack 2025, All Rights Reserved. Designed By Student</p>
      </div>
    </footer>
  );
};

export default Footer;