import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navi/Navbar";
import FileUpload from "./Components/FileUpload";
import Hero from "./Components/Hero/Hero";
import Features from "./Components/Features/Features";
import Footer from "./Components/Footer/Footer";
import IndianFoodPage from "./Components/pages/IndianFoodPage";
import RecipesPage from "./Components/pages/RecipesPage";
import AiModelPage from "./Components/pages/AiModelPage";
import Team from "./Components/Team/Team";
import Login from "./Components/Login/Login";
import "@fontsource/playfair-display/700.css";
import "@fontsource/poppins/800.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <Features />
                <Footer />
              </>
            }
          />

          {/* Upload Page */}
          <Route path="/log" element={<Login />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/ai-model" element={<AiModelPage />} />
          <Route path="/indian-food" element={<IndianFoodPage />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
