import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Chart, ArcElement } from "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
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
  <img src="example.jpg" alt="Example" loading="lazy" />
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

<div className={`qualitydeatilcheckmain-content ${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`}>
          <div
            className="container-fluid trans_form_main_div overflow-hidden"
            style={{ marginTop: "50px",  marginLeft: "20px"}}
          >
            <div className="close" onClick={closeForm}>
              <FontAwesomeIcon icon={faRectangleXmark} />
            </div>

          <h1 className="text-center mb-4"> Transaction Form </h1>
          <div className="row">
            <div className="col-lg-4 " style={{ marginLeft: "50px" }}>
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

              <div className="div2">
                <div className="d-flex mb-1">
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
                    Supplier:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value="MCL"
                    required
                    className="form-control"
                  />
                </div>

                <div className="d-flex mb-1">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Truck Number:
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

                <div className="d-flex mb-1">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Product:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value="Coal"
                    required
                    className="form-control"
                  />
                </div>
                <div className="d-flex mb-1">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Size:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value="5/20"
                    required
                    className="form-control"
                  />
                </div>
                <div className="d-flex mb-1">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Material:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value="Good"
                    required
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 div3 container-fluid">
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
                  Po No:
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
                  Challan No:
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
                  Status:
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
                  Remark:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  required
                  className="form-control"
                />
              </div>
              <div className="text-center img">
                <table className="table">
                  <thead>
                    <tr>
                      <th colSpan="5">
                        <b>Camera</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="2" rowSpan="2">
                        <img
                          src={img}
                          alt="img" width={150} height={200}
                          className="img-transition"
                        />
                         <button onClick={() => captureImage(index)} className="btn btn-primary mt-2">Capture</button>
                      </td>
                      <td colSpan="2" rowSpan="2">
                        <img
                          src={img}
                          alt="img"
                          width={150}
                          height={200}
                          className="img-transition"
                        />
                         <button onClick={() => captureImage(index)} className="btn btn-primary mt-2">Capture</button>
                      </td>
                    </tr>
                    <tr></tr>
                    <tr>
                      <td colSpan="2" rowSpan="2">
                        <img
                          src={img}
                          alt="img"
                          width={150}
                          height={200}
                          className="img-transition"
                        />
                        <button onClick={() => captureImage(index)} className="btn btn-primary mt-2">Capture</button>
                      </td>
                      <td colSpan="2" rowSpan="2">
                        <img
                          src={img}
                          alt="img"
                          width={150}
                          height={200}
                          className="img-transition"
                        />
                         <button onClick={() => captureImage(index)} className="btn btn-primary mt-2">Capture</button>
                      </td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-2 container-fluid">
              <div className="right_div">
                <button className="btn btn-primary mb-2 button-transition">
                  Save[F10]
                </button>
                <button className="btn btn-danger mb-2 button-transition">
                  Delete[F9]
                </button>
                <button className="btn btn-secondary button-transition">
                  Print
                </button>
                <button className="btn btn-success button-transition">
                  Approve
                </button>
                <button className="btn btn-warning button-transition">
                  Reject
                </button>
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