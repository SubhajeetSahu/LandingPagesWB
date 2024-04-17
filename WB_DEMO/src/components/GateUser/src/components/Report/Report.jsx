import React from "react";
import "./Report.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Chart, ArcElement } from "chart.js/auto";
import Header from "../../../../Header/Header";
import SideBar2 from "../../../../SideBar/SideBar2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartBar,
  faFileAlt,
  faVideo,
  faPrint,
  faTruck,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";


function Report() {
  const navigate = useNavigate();

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

  const handlehome = () => {
    navigate("/home");
  };

  const handleDailyReport = () => {
    navigate("/dailyreport");
  };

  const handleWeeklyReport = () => {
    navigate("/weeklyreport");
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />

      <SideBar2
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      

      <div className="daily-report-main-content">
        <div className="report-wrapper">
          <div className="report-container">
            <div className="text-center"></div>
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              <div className="d-flex flex-wrap justify-content-center p-5">
                <div className="report-item m-4 rectangular-icon">
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
                <div className="report-item m-4 rectangular-icon">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
