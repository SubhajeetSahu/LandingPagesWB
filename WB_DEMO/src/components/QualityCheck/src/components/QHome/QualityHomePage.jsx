import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Header from "../../../../Admin/Header/Header";
import SideBar3 from "../../../../SideBar/SideBar3";
import "./QualityHomePage.css";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { Chart, ArcElement } from "chart.js/auto";
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown, faBackwardStep, faForwardStep, faBackwardFast, faForwardFast } from '@fortawesome/free-solid-svg-icons';


function QualityHomePage() {

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
      };

    
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const homeMainContentRef = useRef(null);


  
  
  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <SideBar3
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      </div>
      
  );
}

export default QualityHomePage

