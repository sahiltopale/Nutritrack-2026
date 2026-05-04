import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userInitial, setUserInitial] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserInitial(email.charAt(0).toUpperCase()); // First letter only
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail"); // Clear userEmail from localStorage
    setUserInitial(""); // Reset userInitial state
    setShowDropdown(false); // Close the dropdown if it's open
    navigate("/log"); // Redirect to the login page
  };

  return (
    <div>
      <div className="nav">
        <div className="fspart">
          <img src="/images_used/cutlery.png" alt="logo" />
          <h1>NutriTrack</h1>
        </div>
        <div className="spart">
          <Link to="/">
            <h4>HOME</h4>
          </Link>
          <Link to="/team">
            <h4>ABOUT</h4>
          </Link>
          <Link to="/recipes">
            <h4>RECIPES</h4>
          </Link>
          <Link to="/upload">
            <button className="hel">Predict Now</button>
          </Link>

          {!userInitial ? (
            <Link to="/log" className="login-link">
              <h4>LOGIN</h4>
            </Link>
          ) : (
            <div
              className="user-dropdown-wrapper"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="user-initial">{userInitial}</div>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
