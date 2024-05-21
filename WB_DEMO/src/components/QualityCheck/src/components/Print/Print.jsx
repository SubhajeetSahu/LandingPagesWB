import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Chart, ArcElement } from "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import SideBar3 from "../../../../SideBar/SideBar3";

import "./Print.css";

const QPrint = () => {
  const navigate = useNavigate();
 
  const img = "https://example.com/your-image.jpg";
  const currentDateTime = new Date().toLocaleString();

   
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const homeMainContentRef = useRef(null);
 
 
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
  
        

    <SideBar3>
        <div className="d-flex">

<div className="flex-grow-1">

        <div className="trans_form_wrapper">
         </div>
     </div>
    </div>
    </SideBar3>
  );
};

export default QPrint;