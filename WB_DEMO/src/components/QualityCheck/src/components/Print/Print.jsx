import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Chart, ArcElement } from "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import SideBar3 from "../../../../SideBar/SideBar3";
import Header from "../../../../Header/Header";
import "./Print.css";

const QPrint = () => {
  const navigate = useNavigate();
  const closeForm = () => {
    navigate("/transaction");
  };
  const img = "https://example.com/your-image.jpg";
  const currentDateTime = new Date().toLocaleString();

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
    <div className="d-flex">

      <div className="flex-grow-1">
        {/* Add the header */}
        <Header toggleSidebar={toggleSidebar} />

    <SideBar3
      isSidebarExpanded={isSidebarExpanded}
      toggleSidebar={toggleSidebar}
    />

        <div className="trans_form_wrapper">
         </div>
     </div>
    </div>
  );
};

export default QPrint;