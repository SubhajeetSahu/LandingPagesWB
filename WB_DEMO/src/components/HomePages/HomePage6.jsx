import React, { useState, useEffect, useRef } from "react";
import { Chart, ArcElement } from "chart.js/auto";
import Header from "../Header/Header";
import SideBar5 from "../SideBar/SideBar5";
import OperatorHome from "../Operator/src/components/homed/Homed";
import OperatorTransaction from "../Operator/src/components/transaction/Transaction";

function HomePage6() {
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
    <div>
      <Header toggleSidebar={toggleSidebar} />
 
      {/* <SideBar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      /> */}
 
      <SideBar5
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
     <OperatorTransaction/>
      </div>
  );
}

export default HomePage6;
