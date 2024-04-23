import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown, faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Chart, ArcElement } from "chart.js/auto";
import Header from "../../../../Header/Header";
import SideBar3 from "../../../../SideBar/SideBar3";
import "./QReport.css";

const QualityReport = () => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [truckNumber, setTruckNumber] = useState("");
  const [inTimeValue, setInTimeValue] = useState("");
  const [outTimeValue, setOutTimeValue] = useState("");
  const [productValue, setProductValue] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [chalanNumber, setChalanNumber] = useState("");
  const [file, setFile] = useState(null);
  const [isFileInserted, setIsFileInserted] = useState(false);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setIsFileInserted(true);
  };

  const handleFileDownload = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
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
      <SideBar3
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div className="quality-report-main-content" ref={homeMainContentRef}>
        <h2 className="quality-report-heading">Quality Report</h2>
        <div className="quality-report-table-responsive">
          <table className="quality-report-table table table-bordered table-striped mt3">
            <thead>
              <tr>
                <th>Ticket No</th>
                <th>Truck No</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Product</th>
                <th>PO No</th>
                <th>Chalan No</th>
                <th> </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="quality-report-input-box ticket-number "
                    value={ticketNumber}
                    onChange={(e) => setTicketNumber(e.target.value)}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="quality-report-input-box truck-number"
                    value={truckNumber}
                    onChange={(e) => setTruckNumber(e.target.value)}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="quality-report-input-box"
                    value={inTimeValue}
                    onChange={(e) => setInTimeValue(e.target.value)}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="quality-report-input-box"
                    value={outTimeValue}
                    onChange={(e) => setOutTimeValue(e.target.value)}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="quality-report-input-box"
                    value={productValue}
                    onChange={(e) => setProductValue(e.target.value)}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="quality-report-input-box"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="quality-report-input-box"
                    value={chalanNumber}
                    onChange={(e) => setChalanNumber(e.target.value)}
                    readOnly
                  />
                </td>
                <td >
                  <button
                    onClick={() => document.getElementById('fileInput').click()}
                    className="quality-report-btn quality-report-upload-btn"
                  >
                    <FontAwesomeIcon icon={faFileArrowUp} />
                  </button>
                  <input
                    type="file"
                    id="fileInput"
                    className="form-control-file"
                    accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                </td>
                <td>
                  <button
                    onClick={handleFileDownload}
                    disabled={!isFileInserted}
                    className="quality-report-btn quality-report-download-btn"
                  >
                    <FontAwesomeIcon icon={faFileArrowDown} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QualityReport;
