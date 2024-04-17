import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import "./Report.css";
import Header from '../../../../Header/Header';
import SideBar3 from '../../../../SideBar/SideBar3';
import { Chart, ArcElement } from "chart.js/auto";

const QReport = () => {
  const [ticketNo, setTicketNo] = useState("");
  const [truckNo, setTruckNo] = useState("");
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [product, setProduct] = useState("");
  const [poNo, setPoNo] = useState("");
  const [chalanNo, setChalanNo] = useState("");
  const [file, setFile] = useState(null);
  const [isFileInserted, setIsFileInserted] = useState(false);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setIsFileInserted(true);
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

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

<SideBar3
  isSidebarExpanded={isSidebarExpanded}
  toggleSidebar={toggleSidebar}
/>
      <div className="report-maincontent">
        {/* <div className="report-container"> */}
          <h2 className="heading">Quality Report</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-responsive mt3">
            <thead>
              <tr>
                <th>Ticket No</th>
                <th>Truck No</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Product</th>
                <th>PO No</th>
                <th>Chalan No</th>
                <th>Upload Report</th>
                <th>Download Report</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td>
  <input
    type="text"
    className="form-control input-box"
    value={ticketNo}
    onChange={(e) => setTicketNo(e.target.value)}
  />
</td>
<td>
  <input
    type="text"
    className="form-control input-box"
    value={truckNo}
    onChange={(e) => setTruckNo(e.target.value)}
  />
</td>
<td>
  <input
    type="text"
    className="form-control input-box"
    value={inTime}
    onChange={(e) => setInTime(e.target.value)}
  />
</td>
<td>
  <input
    type="text"
    className="form-control input-box"
    value={outTime}
    onChange={(e) => setOutTime(e.target.value)}
  />
</td>
<td>
  <input
    type="text"
    className="form-control input-box"
    value={product}
    onChange={(e) => setProduct(e.target.value)}
  />
</td>
<td>
  <input
    type="text"
    className="form-control input-box"
    value={poNo}
    onChange={(e) => setPoNo(e.target.value)}
  />
</td>
<td>
  <input
    type="text"
    className="form-control input-box"
    value={chalanNo}
    onChange={(e) => setChalanNo(e.target.value)}
  />
</td>
<td>
  <input
    type="file"
    className="form-control-file"
    accept=".pdf"
    onChange={handleFileUpload}
  />
</td>
<td>
  <button
    onClick={handleFileDownload}
    disabled={!isFileInserted}
    className="btn btn-primary download-btn"
  >
    Download File
  </button>
</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default QReport;
