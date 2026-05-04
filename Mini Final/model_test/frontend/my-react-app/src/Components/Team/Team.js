import React, { useState } from "react";
import "./Team.css";

const teamMembers = [
  {
    name: "Darsh Shetty",
    role: "Code Ninja",
    image: "/images_used/darsh.png",
  },
  {
    name: "Sahil Topale",
    role: "Design King",
    image: "/images_used/sahil.png",
  },
  {
    name: "Sebin Sebastian",
    role: "Data Wizard",
    image: "/images_used/sebin.jpg",
  },
  {
    name: "Raul Rebello",
    role: "Marketing Mastermind",
    image: "/images_used/raul.png",
  },
];

const Team = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", formData);
    // Optional: add actual backend submission logic here
    alert("Thank you for your feedback!");
    setFormData({ name: "", mobile: "", email: "", feedback: "" });
  };

  return (
    <section className="team-section">
      <div className="project-overview">
        <h1 className="project-title">🍽️ NutriTrack</h1>
        <p className="project-description">
          NutriTrack is an intelligent food analysis web application designed to
          make healthy eating easier and smarter. With just a photo of your
          meal, our AI system detects the food items and instantly provides
          detailed nutritional information like calories, proteins, fats, and
          carbohydrates. Whether you're a fitness enthusiast, someone managing a
          diet, or just curious about what’s on your plate—NutriTrack helps you
          make informed choices effortlessly. Built using modern technologies
          like React, Python, and deep learning models, NutriTrack merges health
          with innovation.
        </p>
      </div>

      <h2 className="team-title">🔥 Meet Our Power Team</h2>
      <p className="team-subtitle">Fueled by innovation, united by fire</p>
      <div className="team-container">
        {teamMembers.map((member, i) => (
          <div className="team-card orange-glow" key={i}>
            <div className="image-wrapper">
              <img src={member.image} alt={member.name} />
            </div>
            <div className="card-content">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="feedback-section">
        <h2 className="feedback-title">💬 We’d love your feedback!</h2>
        <form className="feedback-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="feedback"
            placeholder="Write your feedback here..."
            value={formData.feedback}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </section>
  );
};

export default Team;