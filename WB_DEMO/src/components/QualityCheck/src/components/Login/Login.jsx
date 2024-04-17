// Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import truckImage from "../../assets/truck-image.png";
// import truckImage2 from "../../assets/truck-2.png";
import "./Login.css";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          <h1 className="login-title" style={{ backgroundColor: "white" }}>
            Weighbridge Management System
          </h1>
          <img
            src="https://www.seewise.ai/assets/img/landing/weighbridge.jpg"
            alt="Truck"
            className="login-truck-image"
          />
          <form
            onSubmit={handleSubmit}
            className="login-form"
            style={{ backgroundColor: "white" }}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="User Id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="form-control login-input"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control login-input"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary login-btn">
              Sign In
            </button>
            <a
              href="#"
              className="login-forgot-password"
              style={{ backgroundColor: "white" }}
            >
              Forgot Password?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
