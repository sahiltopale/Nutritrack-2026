import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await axios.post(`${API_URL}/api/auth/login`, {
          email,
          password,
        });

        alert("Login successful!");

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", response.data.email);

        navigate("/");
      } else {
        await axios.post(`${API_URL}/api/auth/register`, {
          email,
          password,
          firstName,
          lastName,
        });

        alert("Registration successful!");
        setIsLogin(true);
      }

      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="wrap">
      <div className="container1">
        <div className="text-section">
          <h1>
            {isLogin ? "Welcome Back!" : "Create an Account"} <br />
            <span>{isLogin ? "Login to continue" : "Join us today"}</span>
          </h1>
        </div>

        <div className="form-section">
          <form className="form-container" onSubmit={handleSubmit}>
            <h2>{isLogin ? "Login" : "Register At NutriTrack"}</h2>

            {!isLogin && (
              <div className="input-group">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="die" type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </button>

            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                className="toggle-link"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? " Register" : " Login"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
