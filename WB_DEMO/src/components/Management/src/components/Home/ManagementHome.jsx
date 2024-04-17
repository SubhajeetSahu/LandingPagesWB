import "./ManagementHome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { faBellSlash, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Chart, registerables } from 'chart.js/auto';
import SideBar4 from "../../../../SideBar/SideBar4";
import Header from "../../../../Header/Header";

function ManagementHome() {
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const [showNotification, setShowNotification] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (chartRef.current && chartRef2.current) {
        chartRef.current.resize();
        chartRef2.current.resize();
      }
    });
  
    const homeMainContent = document.querySelector(".home-main-content");
    if (homeMainContent) {
      resizeObserver.observe(homeMainContent);
    }
  
    return () => {
      resizeObserver.disconnect();
    };
  }, [chartRef.current, chartRef2.current]);
  

  return (
      
      <div className="home-page">

<Header toggleSidebar={toggleSidebar} />

      <SideBar4
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
        <div className="home-logo-container-1 container-fluid">

        <h2 className="text-center">Management Dashboard</h2>
          <div className="row justify-content-end">
            <div className="col-auto">
              <FontAwesomeIcon
                icon={faSearch}
                className="header-icon mx-2"
                style={{ fontSize: "1.2rem" }}
              />
              <FontAwesomeIcon
                icon={faBellSlash}
                onClick={toggleNotification}
                className="header-icon mx-2"
                style={{ fontSize: "1.2rem" }}
              />
              {showNotification && (
                <div className="notification-popup mt-3">
                  <ul>
                    <li>Dummy Notification 1</li>
                    <li>Dummy Notification 2</li>
                    <li>Dummy Notification 3</li>
                    <li>Dummy Notification 4</li>
                  </ul>
                </div>
              )}
              <FontAwesomeIcon
                icon={faUserCircle}
                className="header-icon mx-2"
                style={{ fontSize: "1.2rem" }}
              />
            </div>
          </div>
        </div>
        <div className="home-main-content">
          <div className="card p-3 mb-3 home home-card mt-3">
            <label className="fw-bold home-label">Company:</label>
            <select className="form-select w-100">
              <option value="Vikram Pvt Ltd">Vikram Pvt Ltd</option>
              <option value="Highlander">Highlander</option>
              <option value="Rider">Rider</option>
            </select>
            <label className="fw-bold mt-3 home-label">Site:</label>
            <select className="form-select w-100">
              <option>Bhubaneswar</option>
              <option value="Roulkela">Roulkela</option>
              <option value="Aska">Aska</option>
              <option value="Puri">Puri</option>
            </select>
          </div>
          <div className="card-group">
            <div className="card p-3 mb-3 home home-chart-1 mt-3">
              <Bar
                className="chart-1"
                data={{
                  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  datasets: [
                    {
                      label: "Coal",
                      data: [12, 19, 3, 5, 2, 3, 45],
                      backgroundColor: "rgb(27,32,38)",
                    },
                    {
                      label: "Iron Ore",
                      data: [12, 9, 3, 5, 2, 3, 5],
                      backgroundColor: "rgb(212,208,199)",
                    },
                    {
                      label: "Dolomite",
                      data: [12, 19, 3, 5, 2, 3, 45],
                      backgroundColor: "rgb(169,169,167)",
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function (value) {
                          return value + " tonnes";
                        },
                      },
                    },
                  },
                }}
                ref={chartRef}
              />
              <span className="text-center mt-2 chart-name-1">
                Number of materials received
              </span>
            </div>
            <div className="card p-3 mb-3 home home-chart-2 mt-3 mx-5">
              <Bar
                className="chart-2"
                data={{
                  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                  datasets: [
                    {
                      label: "Inbound",
                      data: [12, 19, 3, 5, 2, 3, 45],
                      backgroundColor: "rgb(123,222,123)",
                    },
                    {
                      label: "Outbound",
                      data: [12, 9, 3, 5, 2, 3, 5],
                      backgroundColor: "rgb(255,110,102)",
                    },
                  ],
                }}
                ref={chartRef2}
              />
              <span className="text-center mt-2 chart-name-2">
                Number of Trucks
              </span>
            </div>
          </div>
        </div>
      </div>
  );
}

export default ManagementHome;
