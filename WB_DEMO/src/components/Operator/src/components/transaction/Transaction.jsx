//Tansaction.jsx


/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import "./transaction.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleXmark,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { Chart, ArcElement } from "chart.js/auto";
import Header from "../../../../Header/Header";
import SideBar5 from "../../../../SideBar/SideBar5";

const OperatorTransaction = () => {
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const navigate = useNavigate();

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const closeForm = () => {
    navigate("/home");
  };
  const goToTransForm = () => {
    navigate("/OperatorTransactionFromInbound");
  };
  const goToTransForm1 = () => {
    navigate("/OperatorTransactionFromOutbound");
  };

  const handleQualityReportDownload = () => {
    // Implement download functionality here
    // For example, you can create a download link or fetch data and trigger download
    alert("Downloading quality report...");
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
      <div className="main-content">
        <div className="row">
          <h1 className="tr_dash">Transaction Dashboard</h1>
          <div className="col-3">
            <label htmlFor="trDate">Date:-</label>
            <input
              type="date"
              id="trDate"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="Date"
              readOnly
            />
            <br />
            <br />
          </div>
          {/* <div className="col-8">
            <h3 className="pending">Pending Actions</h3>
            <div className="row">
              <div className="col-6 border-right">
                <h4 className="in">Inbound</h4>
                <table className="table">
                  <thead className="thead">
                    <tr>
                      <th>Gross Weight</th>
                      <th>Tare Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input type="text" value="1" />
                      </td>
                      <td>
                        <input type="text" value="0" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-6">
                <h4 className="out">Outbound</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Tare Weight</th>
                      <th>Gross Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input type="text" value="1" />
                      </td>
                      <td>
                        <input type="text" value="0" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}
        </div>
        <table className="table table-bordered">
          <thead className="text-center">
            <tr>
              <th>Ticket No.</th>
              <th>Weightment No.</th>
              <th>Vehicle No.</th>
              <th>In Time/ Date</th>
              {/* <th >Out Time/ Date</th>
            <th >Vehicle Type</th>
            <th >No. of Wheels</th> */}
              <th>Transporter</th>
              <th>Supplier/ Customer</th>

              {/* <th >Supplier's/ Customer's Address</th> */}
              <th>Gross wt./ Time</th>
              <th>Tare wt./ Time</th>
              <th>Net wt./ Time</th>

              <th>Material/Product</th>
              <th>Fitness Upto</th>
              <th>Transaction Type</th>
              <th>Status</th>
              <th>Quality Report</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              {/* Ticket Input Box Component */}
              <td>
                <input
                  value="T001"
                  style={{ justifyContent: "center", textAlign: "center" }}
                  className="form-control back"
                  onClick={goToTransForm}
                />
              </td>
              <td>
                <input value="1" className="abc" />
              </td>
              <td>
                <input value="Vehicle No." className="abc" />
              </td>

              <td>
                <input value="In Time/Date" className="abc" />
              </td>
              {/*  <td>
              <input value="Out Time/Date" className="abcd" />
            </td>
            <td>
              <input value="Vehicle Type"   className="abc"/>
            </td>
            <td>
              <input value="No. of Wheels" className="abc" />
            </td> */}
              <td>
                <input value="Transporter" className="abc" />
              </td>
              <td>
                <input value="Supplier" className="abc" />
              </td>
              {/* <td>
              <input
                value="Supplier's Address"
                className="abcd"
              />
            </td> */}
              <td>
                <input value="" className="abc" />
              </td>
              <td>
                <input value="" className="abc" />
              </td>
              <td>
                <input value="" className="abc" />
              </td>

              <td>
                <input value="Material" className="abc" />
              </td>
              <td>
                <input value="Fitness Upto" className="abc" />
              </td>
              <td>
                <input value="Inbound" className="abc" />
              </td>
              <td>
                <input value="Pending" className="abc" />
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faDownload}
                  onClick={handleQualityReportDownload}
                />
              </td>
            </tr>
          </tbody>
          <tbody className="text-center">
            <tr>
              {/* Ticket Input Box Component */}
              <td>
                <input
                  value="T002"
                  style={{ justifyContent: "center", textAlign: "center" }}
                  className="form-control back"
                  onClick={goToTransForm1}
                />
              </td>
              <td>
                <input value="2" className="abc" />
              </td>
              <td>
                <input value="Vehicle No." className="abc" />
              </td>

              <td>
                <input value="In Time/Date" className="abc" />
              </td>
              {/* <td>
              <input value="Out Time/Date"  className="abcd" />
            </td>
            <td>
              <input value="Vehicle Type"  className="abc" />
            </td>
            <td>
              <input value="No. of Wheels"  className="abc" />
            </td> */}
              <td>
                <input value="Transporter" className="abc" />
              </td>
              <td>
                <input value="Customer" className="abc" />
              </td>
              {/* <td>
              <input
                value="Customer's Address"
                className="abcd"
              />
            </td> */}
              <td>
                <input value="" className="abc" />
              </td>
              <td>
                <input value="" className="abc" />
              </td>
              <td>
                <input value="" className="abc" />
              </td>

              <td>
                <input value="Product" className="abc" />
              </td>
              <td>
                <input value="Fitness Upto" className="abc" />
              </td>
              <td>
                <input value="Outbound" className="abc" />
              </td>
              <td>
                <input value="Pending" className="abc" />
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faDownload}
                  onClick={handleQualityReportDownload}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OperatorTransaction;

