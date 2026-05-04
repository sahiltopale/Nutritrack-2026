import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div>
      <div className="hero">
        <div className="left">
          <h1>
            Smart <br /> Food Recognition & <br /> Personalized Diet
          </h1>
          <p>
            Track and analyze your diet with ease. Estimate calorie intake
            accurately and make
            <br />
            healthier choices effortlessly. Our system predicts food items and
            calculates calorie
            <br />
            content, helping you manage your diet and reach wellness goals. Stay
            on track with
            <br />
            detailed insights into your daily nutritional intake.
          </p>
          <Link to="/upload">
            <button class="but">PREDICT</button>
          </Link>
        </div>
        <div className="right">
          <img
            src="/images_used/herodish.png"
            alt="Food recognition"
            className="rotate"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
