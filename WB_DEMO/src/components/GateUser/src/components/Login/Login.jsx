import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginUser.css";
import Swal from "sweetalert2";
 
const LoginUser = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/auths/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, userPassword: userPassword }),
      });
 
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.message === "please reset your password.") {
          Swal.fire({
            title: data.message,
            text: "Please reset your password.",
            icon: "info",
            confirmButtonText: "OK",
          });
          navigate("/reset-password", { state: { userId } });
        } else {
          sessionStorage.setItem("userName", data.userName);
          sessionStorage.setItem("roles", JSON.stringify(data.roles));
          sessionStorage.setItem("userId", data.userId);
 
          if (data.roles.includes("ADMIN")) {
            Swal.fire({
              title: "Login Successful!",
              text: "Welcome, Admin!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/home1", { state: { userId: data.userId } });
            });
          } else if (data.roles.includes("QUALITY_USER")) {
            Swal.fire({
              title: "Login Successful!",
              text: "Welcome, Quality User!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/home2", { state: { userId: data.userId } });
            });
          } else if (data.roles.includes("MANAGEMENT")) {
            Swal.fire({
              title: "Login Successful!",
              text: "Welcome, Management!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/home5", { state: { userId: data.userId } });
            });
          } else if (data.roles.includes("GATE_USER")) {
            Swal.fire({
              title: "Login Successful!",
              text: "Welcome, Gate User!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/home3", { state: { userId: data.userId } });
            });
          } else if (data.roles.includes("WEIGHBRIDGE_OPERATOR")) {
            Swal.fire({
              title: "Login Successful!",
              text: "Welcome, weighbridge operator!",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/home6", { state: { userId: data.userId } });
            });
          } else {
            Swal.fire({
              title: "Login Successful!",
              text: "Welcome, User!",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        }
      } else {
        console.error("Login failed:", response.statusText);
        Swal.fire({
          title: "Login Failed",
          text: response.statusText,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
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
                value={userPassword}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control login-input"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary login-btn">
              Sign In
            </button>
            {/* <a
              href="#"
              className="login-forgot-password"
              style={{ backgroundColor: "white" }}
            >
              Forgot Password?
            </a> */}
          </form>
        </div>
      </div>
    </div>
  );
};
 
export default LoginUser;