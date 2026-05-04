import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import { CircleLoader } from "react-spinners";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [foods, setFoods] = useState([]);
  const [nutrients, setNutrients] = useState({});
  const [totalCalories, setTotalCalories] = useState(0);
  const [filename, setFilename] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

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
      const response = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const {
        filename: uploadedFilename,
        foods: detectedFoods,
        nutrients: foodNutrients,
        total_calories,
      } = response.data;

      setMessage(`File uploaded successfully: ${uploadedFilename}`);
      setFilename(uploadedFilename);
      setFoods(detectedFoods);
      setNutrients(foodNutrients);
      setTotalCalories(total_calories);
    } catch (error) {
      setMessage("Error uploading file. Please try again.");
      console.error(error);
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
          <input type="file" onChange={handleFileChange} required />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {/* Loading spinner outside the form */}
        {isLoading && (
          <div className="loading-spinner">
            <CircleLoader color="#ff6f00" loading={isLoading} size={50} />
          </div>
        )}

        {/* Show message */}
        {message && <p>{message}</p>}

        {/* Show uploaded image */}
        {filename && (
          <div>
            <h3>Processed Image:</h3>
            <img
              src={`http://127.0.0.1:5000/static/uploads/${filename}`}
              alt="Processed"
              style={{ maxWidth: "400px", borderRadius: "15px" }}
            />
          </div>
        )}

        {/* Show detected foods and nutrients */}
        {foods.length > 0 && (
          <div>
            <h3>Detected Foods:</h3>
            <ul>
              {foods.map((foodItem, index) => (
                <li key={index}>
                  <strong>
                    {foodItem.count} x{" "}
                    {foodItem.name.charAt(0).toUpperCase() +
                      foodItem.name.slice(1)}
                  </strong>
                  {nutrients[foodItem.name] && (
                    <ul>
                      <li>
                        <strong>Calories (per item):</strong>{" "}
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
