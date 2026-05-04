import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-section">
      <div className="about-left">
        <div className="image-grid1">
          <img src="/images_used/hotel2.jpg" alt="Restaurant" />
          <img className='change2' src="/images_used/hotel3.jpg" alt="Restaurant" />
          </div>
          <div className="image-grid2">
          <img className="change" src="/images_used/dish2.jpg" alt="Dish" />
          <img src="/images_used/dish3.jpg" alt="Dish" />
          
        </div>
      </div>
      <div className="about-right">
        <h4 className="about-heading">About Us</h4>
        <h1 className="about-title">Welcome to <span>🍽️ NutriTrack</span></h1>
        <p className="about-description">
          Effortlessly monitor your dietary intake and calorie consumption. Our innovative 
          system identifies food items, calculates calorie values, and provides personalized 
          diet tracking to support your health goals. Stay informed and maintain a balanced diet 
          with accurate, real-time nutritional insights.
        </p>
        <div className="stats">
          <div className="stat-item">
            <h1>? 97</h1>
<p>Percentage of</p><b>ACCURACY</b>
          </div>
          <div className="stat-item">
            <h1>? 5000</h1>
            <p>Plus</p><b>DATAS</b>
          </div>
        </div>
        <button className="read-more">READ MORE</button>
      </div>
    </div>
  );
};

export default About;