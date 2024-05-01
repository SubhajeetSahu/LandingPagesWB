import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Report.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Chart, ArcElement } from "chart.js/auto";
import Header from "../../../../Header/Header";
import SideBar4 from "../../../../SideBar/SideBar4";
import {
  faHome,
  faFileAlt,
  faChartBar,
  faCalendar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";


function ManagementReport() {
  const navigate = useNavigate();

  const handlehome = () => {
    navigate("/home");
  };

  const handleDailyReport = () => {
    navigate("/dailyreport");
  };

  const handleWeeklyReport = () => {
    navigate("/weeklyreport");
  };

  const handleMonthlyReport = () => {
    navigate("/monthlyreport");
  };

  const handleCustomizedReport = () => {
    navigate("/customizedreport");
  };

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const homeMainContentRef = useRef(null);
 
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
 
  useEffect(() => {
    Chart.register(ArcElement);
 
    const resizeObserver = new ResizeObserver(() => {
      if (
        homeMainContentRef.current &&
        chartRef.current?.chartInstance &&
        chartRef2.current?.chartInstance
      ) {
        chartRef.current.chartInstance.resize();
        chartRef2.current.chartInstance.resize();
      }
    });
 
    if (homeMainContentRef.current) {
      resizeObserver.observe(homeMainContentRef.current);
    }
 
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
<Header toggleSidebar={toggleSidebar} />

<SideBar4
  isSidebarExpanded={isSidebarExpanded}
  toggleSidebar={toggleSidebar}
/>


      <div className="daily-report-main-content">
        <div className="report-wrapper">
          <div className="report-container">
            <div className="text-center">
              {/* <h3
              className="report-title text-center mt-3 d-flex justify-content-center 
                       align-items-center flex-wrap "
            >
              Report
            </h3> */}
            </div>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              <div className="d-flex flex-wrap justify-content-center p-5">
                <div className="report-item m-4">
                  <div
                    className="report-item-icon d-flex justify-content-center align-items-center"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      size="1x"
                      className="report-icon"
                      onClick={handleDailyReport}
                    />
                  </div>
                  <span className="mt-2 text-center">Daily Report</span>
                </div>
                <div className="report-item m-4">
                  <div
                    className="report-item-icon"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <FontAwesomeIcon
                      icon={faChartBar}
                      size="1x"
                      className="report-icon"
                      onClick={handleWeeklyReport}
                    />
                  </div>
                  <span className="mt-2 text-center">Weekly Report</span>
                </div>
                <div className="report-item m-4">
                  <div
                    className="report-item-icon"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <FontAwesomeIcon
                      icon={faCalendar}
                      size="1x"
                      className="report-icon"
                      onClick={handleMonthlyReport}
                    />
                  </div>
                  <span className="mt-2 text-center">Monthly Report</span>
                </div>
                <div className="report-item m-4">
                  <div
                    className="report-item-icon"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <FontAwesomeIcon
                      icon={faUsers}
                      size="1x"
                      className="report-icon"
                      onClick={handleCustomizedReport}
                    />
                  </div>
                  <span className="mt-2 text-center">Customized Report</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mb-3 d-flex justify-content-center gap-5 button-bottom fixed-bottom">
          <button className="icon-button" onClick={handlehome}>
            <FontAwesomeIcon icon={faHome} size="lg" />
            <span className="ms-1">Home</span>
          </button>
          <button className="icon-button" onClick={handleback}>
            <FontAwesomeIcon icon={faBackward} size="lg" />
            <span className="ms-1">Back</span>
          </button>
          <button className="icon-button" onClick={handleSignOut}>
            <FontAwesomeIcon icon={faPowerOff} size="lg" />
            <span className="ms-1">Sign Out</span>
          </button>
        </div> */}
        </div>
      </div>
    </>
  );
}

export default ManagementReport;
