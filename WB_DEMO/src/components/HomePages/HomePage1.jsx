import React, { useState, useEffect } from "react";
import Sidebar from "../SideBar/SideBar";
import Header from "../Admin/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUsersSlash,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import "./HomePage1.css";



function HomePage1() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [registeredTrucks, setRegisteredTrucks] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    // Fetch active users
    fetch("http://localhost:8080/api/v1/home/active-users")
      .then((response) => response.json())
      .then((data) => setActiveUsers(data))
      .catch((error) => console.error("Error fetching active users:", error));

    // Fetch inactive users
    fetch("http://localhost:8080/api/v1/home/inactive-users")
      .then((response) => response.json())
      .then((data) => setInactiveUsers(data))
      .catch((error) => console.error("Error fetching inactive users:", error));

    // Fetch registered vehicles
    fetch("http://localhost:8080/api/v1/home/vehicles")
      .then((response) => response.json())
      .then((data) => setRegisteredTrucks(data))
      .catch((error) =>
        console.error("Error fetching registered vehicles:", error)
      );
  }, []);

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`create-main-content ${isSidebarExpanded ? "expanded" : ""}`}
      >
        <h2 className="text-center">Admin Dashboard</h2>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card card-gradient-active card-gradient">
                <div className="card-body">
                  <FontAwesomeIcon icon={faUsers} size="3x" />
                  <h5 className="card-title">Active Users</h5>
                  <p className="card-text">{activeUsers}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card card-gradient-inactive card-gradient">
                <div className="card-body">
                  <FontAwesomeIcon icon={faUsersSlash} size="3x" />
                  <h5 className="card-title">Inactive Users</h5>
                  <p className="card-text">{inactiveUsers}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card card-gradient-registered card-gradient">
                <div className="card-body">
                  <FontAwesomeIcon icon={faTruck} size="3x" />
                  <h5 className="card-title">Registered Vehicles</h5>
                  <p className="card-text">{registeredTrucks}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage1;
