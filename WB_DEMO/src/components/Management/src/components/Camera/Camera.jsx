import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./Camera.css";
import { Chart, ArcElement } from "chart.js/auto";
import Header from "../../../../Header/Header";
import SideBar4 from "../../../../SideBar/SideBar4";
import {
  faHome,
  faBackward,
  faPowerOff,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

function ManagementCamera() {
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRecording((prev) => !prev);
    }, 500); // Change the blinking speed as per your preference

    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleBack = () => {
    navigate(-1);
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
    <div>
      <Header toggleSidebar={toggleSidebar} />

<SideBar4
  isSidebarExpanded={isSidebarExpanded}
  toggleSidebar={toggleSidebar}
/>
      <div className="camera-container">
        <div className="d-flex align-items-center justify-content-center">
          <div className="report-header d-flex justify-content-center">
            <FontAwesomeIcon
              icon={faCircle}
              className={`recording-icon ${isRecording ? "blink" : ""}`}
            />
          </div>
        </div>
      </div>

      <div className="camera">
        <div className="image-container">
          <img
            src="https://www.team-bhp.com/forum/attachments/commercial-vehicles/492889d1296488421-heavy-trucks-thread-image211.jpg"
            alt="Image 1"
            className="image"
          />
          <div className="camera-name">Cam 1</div>
        </div>
        <div className="image-container">
          <img
            src="https://www.shutterstock.com/image-photo/truck-carry-large-pieces-iron-600nw-299190407.jpg"
            alt="Image 2"
            className="image"
          />
          <div className="camera-name">Cam 2</div>
        </div>
        <div className="image-container">
          <img
            src="https://static.toiimg.com/thumb/msid-95732155,width-1070,height-580,imgsize-1377183,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"
            alt="Image 3"
            className="image"
          />
          <div className="camera-name">Cam 3</div>
        </div>
        <div className="image-container">
          <img
            src="https://3.imimg.com/data3/LD/DL/MY-1073943/pitless-weighbridge-for-mines-500x500.jpg"
            alt="Image 4"
            className="image"
          />
          <div className="camera-name">Cam 4</div>
        </div>
      </div>

      {/* <div className="mt-4 mb-3 d-flex justify-content-center gap-5">
        <button className="report-button" onClick={handleHome}>
          <FontAwesomeIcon icon={faHome} size="lg" />
          <span className="ms-1">Home</span>
        </button>
        <button className="report-button" onClick={handleBack}>
          <FontAwesomeIcon icon={faBackward} size="lg" />
          <span className="ms-1">Back</span>
        </button>
        <button className="report-button" onClick={handleSignOut}>
          <FontAwesomeIcon icon={faPowerOff} size="lg" />
          <span className="ms-1">Sign Out</span>
        </button>
      </div> */}
    </div>
  );
}

export default ManagementCamera;
