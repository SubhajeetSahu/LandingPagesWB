/* import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate=useNavigate();
    const forgotPass = () =>{
        navigate('/forgot');
    }
    const goToHome = () =>{
      navigate('/home');
  }
  return (
    <div className="login_main_div container-fluid w-100"><br/><br/>
      <h1 className="text-center ">Weighbridge Management System</h1><br/>
      <form  className="form_in mx-auto container" method="post">
        <div className="mb-3">
          <label htmlFor="userId" className="text1">
            UserId
          </label>
          <div>
            <input
              type="email"
              className=" w-100"
              id="userId"
              // autoComplete="off"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="text1">
            Password
          </label>
          <div>
            <input
              type="password"
              className="w-100"
              id="password"
              //autoComplete="off"
              required
            />
          </div>
          <span>
            <p className="pf" onClick={forgotPass}>Forgot Password?</p>
          </span>
        </div>

        
          <button onClick={goToHome} className="submit_btn">
            Sign In
          </button>
        
      </form>
    </div>
  );
};

export default Login;
 */


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import truckImage from "../../assets/truck-image.png";
// import truckImage2 from "../../assets/truck-2.png";
import "./login.css";

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
      {/* <div className="background-image"></div> */}
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
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control login-input"
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
