import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import { CircleLoader } from "react-spinners";

// ✅ Correct Render Backend URL
const API_URL =
  process.env.REACT_APP_API_URL || "https://nutritrack-2026-1.onrender.com";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [foods, setFoods] = useState([]);
  const [nutrients, setNutrients] = useState({});
  const [totalCalories, setTotalCalories] = useState(0);
  const [filename, setFilename] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --------------------------------
  // Handle File Change
  // --------------------------------
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // --------------------------------
  // Handle Upload
  // --------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please choose a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    setMessage("");

    try {
      console.log("Uploading to:", `${API_URL}/upload`);

      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 120000, // 2 minutes
      });

      console.log("Upload Success:", response.data);

      const {
        filename: uploadedFilename,
        foods: detectedFoods,
        nutrients: foodNutrients,
        total_calories,
      } = response.data;

      setMessage("File uploaded successfully ✅");

      setFilename(uploadedFilename || "");

      setFoods(detectedFoods || []);

      setNutrients(foodNutrients || {});

      setTotalCalories(total_calories || 0);
    } catch (error) {
      console.error("FULL ERROR:", error);

      // --------------------------------
      // Backend returned error
      // --------------------------------
      if (error.response) {
        console.log("Backend Response:", error.response.data);

        setMessage(
          error.response.data.error ||
            "Server error occurred while processing image.",
        );
      }

      // --------------------------------
      // No response from backend
      // --------------------------------
      else if (error.request) {
        console.log("No response received:", error.request);

        setMessage(
          "Backend server is not responding. Render server may be sleeping.",
        );
      }

      // --------------------------------
      // Axios / frontend error
      // --------------------------------
      else {
        console.log("Axios Error:", error.message);

        setMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fileupload-wrapper">
      <h1 className="fileupload-heading">Test Your Food</h1>

      <div className="fileupload-card">
        <h2>Upload Your Food Image</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {/* ---------------- Loading Spinner ---------------- */}
        {isLoading && (
          <div className="loading-spinner">
            <CircleLoader color="#ff6f00" size={50} />
          </div>
        )}

        {/* ---------------- Status Message ---------------- */}
        {message && (
          <p
            style={{
              marginTop: "15px",
              fontWeight: "bold",
              color: message.includes("successfully") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}

        {/* ---------------- Processed Image ---------------- */}
        {filename && (
          <div style={{ marginTop: "20px" }}>
            <h3>Processed Image:</h3>

            <img
              src={`${API_URL}/static/uploads/${filename}`}
              alt="Processed Food"
              style={{
                maxWidth: "400px",
                width: "100%",
                borderRadius: "15px",
                marginTop: "10px",
              }}
            />
          </div>
        )}

        {/* ---------------- Detected Foods ---------------- */}
        {foods.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>Detected Foods:</h3>

            <ul>
              {foods.map((foodItem, index) => (
                <li key={index} style={{ marginBottom: "15px" }}>
                  <strong>
                    {foodItem.count} x{" "}
                    {foodItem.name.charAt(0).toUpperCase() +
                      foodItem.name.slice(1)}
                  </strong>

                  {nutrients[foodItem.name] && (
                    <ul>
                      <li>
                        <strong>Calories:</strong>{" "}
                        {nutrients[foodItem.name]?.calories}
                      </li>

                      <li>
                        <strong>Protein:</strong>{" "}
                        {nutrients[foodItem.name]?.protein}
                      </li>

                      <li>
                        <strong>Fats:</strong> {nutrients[foodItem.name]?.fats}
                      </li>

                      <li>
                        <strong>Carbs:</strong>{" "}
                        {nutrients[foodItem.name]?.carbs}
                      </li>
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <h4 className="calories-text">
              Approx. Total Calories: {totalCalories} kcal
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
