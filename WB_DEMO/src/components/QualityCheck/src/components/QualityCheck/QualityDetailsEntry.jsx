import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Chart, ArcElement } from "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashAlt, faPrint, faTimes } from "@fortawesome/free-solid-svg-icons";
import SideBar3 from "../../../../SideBar/SideBar3";
import Header from "../../../../Header/Header";
import "./QualityDetailsEntry.css";
import { useMediaQuery } from 'react-responsive';

const QualityDetailsEntry = () => {
  const navigate = useNavigate();
  const closeForm = () => {
    navigate("/QualityCheck");
  };

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  const img = "https://example.com/your-image.jpg";
  <img src="example.jpg" alt="Example" loading="lazy" />;
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
        <Header toggleSidebar={toggleSidebar} />

        <SideBar3
          isSidebarExpanded={isSidebarExpanded}
          toggleSidebar={toggleSidebar}
        />

        <div className={`quality-detail-check-main-content ${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`}>
          <div className="container-fluid trans-form-main-div overflow-hidden">
            <div className="close" onClick={closeForm}>
              <FontAwesomeIcon icon={faTimes} />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
            <div style={{ textAlign: "center" }}>
  <h2 className="mb-4" style={{ display: "inline-block", marginLeft: "500px" }}>Quality Check Inbound Details</h2>
</div>



              <div className="buttons-container">
                <button className="btn btn-primary button-transition">
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button className="btn btn-danger button-transition">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button className="btn btn-secondary button-transition">
                  <FontAwesomeIcon icon={faPrint} />
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4" style={{ marginLeft: "50px" }}>
                <div className="d-flex mb-3">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Date:
                  </label>
                  <input
                    type="date"
                    autoComplete="off"
                    required
                    className="form-control"
                  />
                </div>
                <div className="d-flex mb-3">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    In Time:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value={currentDateTime}
                    required
                    className="form-control"
                  />
                </div>
                <div className="d-flex mb-3">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Customer:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value="Vikram Pvt. Ltd."
                    required
                    className="form-control"
                  />
                </div>
                <div className="d-flex mb-1">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Vehicle Number:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value="OD-02-AJ-1160"
                    required
                    className="form-control"
                  />
                </div>

                <div className="d-flex mb-1">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Transporter:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value="Jagannath Travels"
                    required
                    className="form-control"
                  />
                </div>

                <div className="d-flex mb-1">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Department:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value="Store"
                    required
                    className="form-control"
                  />
                </div>

                
              </div>
              <div className="col-lg-4 div2 container-fluid">
              <div className="d-flex mb-3">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Ticket No:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    required
                    className="form-control"
                  />
                </div>
                <div className="d-flex mb-3">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Material:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    required
                    className="form-control"
                  />
                </div>
                <div className="d-flex mb-3">
                <label htmlFor="userId" className="form-label text1 me-2">
                  Moisture %:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  required
                  className="form-control"
                />
              </div>
              <div className="d-flex mb-3">
                <label htmlFor="userId" className="form-label text1 me-2">
                  Vm %:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  required
                  className="form-control"
                />
              </div>
              <div className="d-flex mb-3">
                <label htmlFor="userId" className="form-label text1 me-2">
                  Ash %:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  required
                  className="form-control"
                />
              </div>
              <div className="d-flex mb-1">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Fc %:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value="Coal"
                    required
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityDetailsEntry;
