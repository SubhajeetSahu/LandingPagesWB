import React, { useState } from "react";
import Sidebar from "../SideBar/SideBar";
import Header from "../Header/Header";
import "./HomePage1.css";
 
function HomePage1() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeUsers, setActiveUsers] = useState(12);
  const [inactiveUsers, setInactiveUsers] = useState(5);
  const [registeredTrucks, setRegisteredTrucks] = useState(100);
 
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
 
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
              <div className="card card-gradient h-100">
                <div className="card-body">
                  <h5 className="card-title">Active Users</h5>
                  <p className="card-text">{activeUsers}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card card-gradient h-100">
                <div className="card-body">
                  <h5 className="card-title">Inactive Users</h5>
                  <p className="card-text">{inactiveUsers}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 mb-4">
              <div className="card card-gradient h-100">
                <div className="card-body">
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