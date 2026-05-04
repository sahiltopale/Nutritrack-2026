import React, { useEffect } from "react";
import "./AiModelPage.css";

const AiModelPage = () => {
  useEffect(() => {
    // This will scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ai-model-container">
      <div className="ai-model-content">
        <h1>AI Model - YOLOv8</h1>

        {/* Overview */}
        <section>
          <h2>🔍 Overview</h2>
          <p>
            NutriTrack leverages the power of <strong>YOLOv8</strong> (You Only
            Look Once, version 8), a real-time object detection model that
            excels in identifying and localizing multiple objects in images.
            Trained on a custom dataset of Indian foods, our implementation
            helps in detecting dish types, portion sizes, and maps them to their
            nutritional values.
          </p>
        </section>

        {/* How it Works */}
        <section>
          <h2>⚙️ How YOLOv8 Works</h2>
          <p>
            YOLOv8 works by dividing an image into a grid and predicting
            bounding boxes and class probabilities for each section. It only
            "looks once" at the image to make predictions, making it extremely
            fast and suitable for real-time detection. In NutriTrack, we use it
            to:
            <ul>
              <li>🟠 Detect multiple food items in one image</li>
              <li>
                🟠 Estimate the size/quantity of food using bounding box area
              </li>
              <li>🟠 Extract nutritional data based on predictions</li>
            </ul>
          </p>
        </section>

        {/* Features */}
        <section>
          <h2>🌟 Key Features of YOLOv8</h2>
          <ul>
            <li>⚡ Real-time object detection</li>
            <li>🎯 High accuracy with fewer false positives</li>
            <li>📦 Bounding box regression for precise quantity estimation</li>
            <li>🔄 Continuous learning with dataset expansion</li>
            <li>🧠 Lightweight & efficient for mobile/web deployment</li>
          </ul>
        </section>

        {/* Use in NutriTrack */}
        <section>
          <h2>🥗 Use in NutriTrack</h2>
          <p>
            YOLOv8 is trained specifically on Indian dishes like Paneer Tikka,
            Samosa, Idli, Dosa, Biryani, etc. After uploading an image:
            <ol>
              <li>📷 The image is passed to YOLOv8 for detection</li>
              <li>📦 Detected items are analyzed for quantity</li>
              <li>🧾 Nutritional values are fetched from the database</li>
              <li>📊 A clean summary is presented to the user</li>
            </ol>
          </p>
        </section>

        {/* Applications */}
        <section>
          <h2>🌍 Applications</h2>
          <ul>
            <li>📱 Mobile health and fitness apps</li>
            <li>🏥 Diet planning and clinical nutrition</li>
            <li>🍱 Calorie tracking for diabetics or gym-goers</li>
            <li>🍔 Food recognition in restaurants & delivery apps</li>
          </ul>
        </section>

        {/* Benefits */}
        <section>
          <h2>✅ Benefits</h2>
          <p>
            Using YOLOv8 allows NutriTrack to deliver:
            <ul>
              <li>⚡ Lightning-fast food analysis</li>
              <li>📈 Accurate nutrition estimation</li>
              <li>🧠 Smart diet recommendation engine</li>
              <li>💡 Enhanced user experience with minimal input</li>
            </ul>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AiModelPage;