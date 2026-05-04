import React from "react";
import { useNavigate } from "react-router-dom";
import "./Features.css";

const Feature = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "⚙️",
      title: "AI Model",
      description:
        "This project uses a machine learning model to predict the results.",
      route: "/ai-model",
    },
    {
      icon: "🍽️",
      title: "Our Trained Foods",
      description:
        "Data trained on Indian food with various nutritional benefits.",
      route: "/indian-food",
    },
    {
      icon: "🛒",
      title: "Quantity Estimation",
      description: "Coming Soon!",
    },
    {
      icon: "🎧",
      title: "Diet Recommendation",
      description: "Coming Soon!",
    },
  ];

  const handleCardClick = (route) => {
    if (route) navigate(route);
  };

  return (
    <div className="features-container">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`feature-card ${feature.route ? "clickable" : ""}`}
          onClick={() => handleCardClick(feature.route)}
        >
          <div className="icon">{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Feature;