// Report.jsx
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faChartBar,
  faCalendar,
  faUsers,
  faRectangleXmark
} from "@fortawesome/free-solid-svg-icons";
import { Chart, ArcElement } from "chart.js/auto";
import "./report.css";
import { useNavigate } from "react-router-dom";
import Header from "../../../../Header/Header";
import SideBar5 from "../../../../SideBar/SideBar5";

function OperatorReport() {
  const navigate = useNavigate();

  const closeForm = () => {
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

<SideBar5
  isSidebarExpanded={isSidebarExpanded}
  toggleSidebar={toggleSidebar}
/>
      <div className="close" onClick={closeForm}>
        <FontAwesomeIcon icon={faRectangleXmark} />
      </div>
      <div className="report-header d-flex justify-content-center">
      </div>
      <div className="report-wrapper">
        <div className="report-container">
          <div className="report-content">
            <div className="report-item" onClick={handleDailyReport}>
              <div
                className="report-item-icon d-flex justify-content-center align-items-center"
                style={{ backgroundColor: "#fff" }}
              >
                <FontAwesomeIcon icon={faFileAlt} size="1x" className="report-icon" />
              </div>
              <span className="mt-2">Daily Report</span>
            </div>
            <div className="report-item" onClick={handleWeeklyReport}>
              <div
                className="report-item-icon"
                style={{ backgroundColor: "#fff" }}
              >
                <FontAwesomeIcon icon={faChartBar} size="1x" className="report-icon" />
              </div>
              <span className="mt-2">Weekly Report</span>
            </div>
            <div className="report-item" onClick={handleMonthlyReport}>
              <div
                className="report-item-icon"
                style={{ backgroundColor: "#fff" }}
              >
                <FontAwesomeIcon icon={faCalendar} size="1x" className="report-icon" />
              </div>
              <span className="mt-2">Monthly Report</span>
            </div>
            <div className="report-item" onClick={handleCustomizedReport}>
              <div
                className="report-item-icon"
                style={{ backgroundColor: "#fff" }}
              >
                <FontAwesomeIcon icon={faUsers} size="1x" className="report-icon" />
              </div>
              <span className="mt-2">Customized Report</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OperatorReport;
