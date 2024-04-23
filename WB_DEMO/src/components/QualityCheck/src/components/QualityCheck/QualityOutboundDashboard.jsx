import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Header from "../../../../Header/Header";
import SideBar3 from "../../../../SideBar/SideBar3";
import "./QualityOutboundDashboard.css";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { Chart, ArcElement } from "chart.js/auto";
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown, faBackwardStep, faForwardStep, faBackwardFast, faForwardFast } from '@fortawesome/free-solid-svg-icons';
import QualityInboundDetails from "./QualityInboundDetails";

function QualityOutboundDashboard() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const receiveInboundData = (data) => {
    // Update the data state with the received data
    const updatedData = [...data];
    setData(updatedData);
  };

  // Parse query parameters from URL
  const queryParams = new URLSearchParams(location.search);
  
  const [inboundData, setInboundData] = useState({
    date: queryParams.get("date") || "",
    inTime: queryParams.get("inTime") || "",
    customer: queryParams.get("customer") || "",
    vehicleNumber: queryParams.get("vehicleNumber") || "",
    transporter: queryParams.get("transporter") || "",
    department: queryParams.get("department") || "",
    ticketNo: queryParams.get("ticketNo") || "",
    tpNoPoNo: queryParams.get("tpNoPoNo") || "",
    material: queryParams.get("material") || "",
    moisture: queryParams.get("moisture") || "",
    vm: queryParams.get("vm") || "",
    ash: queryParams.get("ash") || "",
    fc: queryParams.get("fc") || "",
    size: queryParams.get("size") || "",
    fe: queryParams.get("fe") || "",
    loi: queryParams.get("loi") || ""
  });

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

  const handlehome = () => {
    navigate("/home");
  };

  const [data, setData] = useState([
    {
      "Ticket No.": 1,
      Date: "2024-04-23",
      "Vehicle No.": " ",
      In: " ",
      Out: " ",
      "Transporter Name": " ",
      "Product/Material": " ",
      "TP No/Po No": " ",
      "Supplier/customer": " ",
      "Transaction Type": "Outbound",
    },
    {
      "Ticket No.": 2,
      Date: "2024-04-23",
      "Vehicle No.": " ",
      In: " ",
      Out: " ",
      "Transporter Name": " ",
      "Product/Material": " ",
      "TP No/Po No": " ",
      "Supplier/customer": " ",
      "Transaction Type": "Outbound",
    },
    {
      "Ticket No.": 3,
      Date: "2024-04-23",
      "Vehicle No.": " ",
      In: " ",
      Out: " ",
      "Transporter Name": " ",
      "Product/Material": " ",
      "TP No/Po No": " ",
      "Supplier/customer": " ",
      "Transaction Type": "Outbound",
    },
    {
      "Ticket No.": 4,
      Date: "2024-04-23",
      "Vehicle No.": " ",
      In: " ",
      Out: " ",
      "Transporter Name": " ",
      "Product/Material": " ",
      "TP No/Po No": " ",
      "Supplier/customer": " ",
      "Transaction Type": "Outbound",
    },
    {
      "Ticket No.": 5,
      Date: "2024-04-23",
      "Vehicle No.": " ",
      In: " ",
      Out: " ",
      "Transporter Name": " ",
      "Product/Material": " ",
      "TP No/Po No": " ",
      "Supplier/customer": " ",
      "Transaction Type": "Outbound",
    },
    {
      "Ticket No.": 6,
      Date: "2024-04-23",
      "Vehicle No.": " ",
      In: " ",
      Out: " ",
      "Transporter Name": " ",
      "Product/Material": " ",
      "TP No/Po No": " ",
      "Supplier/customer": " ",
      "Transaction Type": "Outbound",
    },
  ]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setCurrentPage(0);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setSelectedDate(getCurrentDate());
  }, []);

  const filteredData = selectedDate
    ? data.filter((item) => item.Date === selectedDate)
    : data;

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredData.slice(offset, offset + itemsPerPage);

  const pageCount = Math.ceil(filteredData.length / itemsPerPage) || 1;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDownload = () => {
    if (file) {
      const reportFilePath = '../../Report/' + file.name;
      fetch(reportFilePath)
        .then(response => {
          if (!response.ok) {
            throw new Error('File not found');
          }
          return response.blob();
        })
        .then(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.name;
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(url);
          document.body.removeChild(a);
        })
        .catch(error => {
          console.error('Error downloading file:', error);
        });
    }
  };

  const tableContainerRef = useRef(null);

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft = 100;
    }
  }, [data]);

  const handleInTime = (index) => {
    const currentTime = new Date().toLocaleTimeString();
    const updatedData = [...data];
    updatedData[index].In = currentTime;
    setData(updatedData);
  };

  const handleOutTime = (index) => {
    const currentTime = new Date().toLocaleTimeString();
    const updatedData = [...data];
    updatedData[index].Out = currentTime;
    setData(updatedData);
  };

  const handleTransactionTypeChange = (index, transactionType) => {
    const updatedData = [...data];
    updatedData[index]["Transaction Type"] = transactionType;
    setData(updatedData);
  };

  const handleTicketClick = (ticketNumber, index) => {
    const transactionType = data[index]["Transaction Type"];
    if (transactionType === "Inbound") {
      navigate(`/QualityInboundDetails?ticketNumber=${ticketNumber}`);
    } else if (transactionType === "Outbound") {
      navigate(`/QualityOutboundDetails?ticketNumber=${ticketNumber}`);
    }
  };


  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <SideBar3
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div className="quality-outbound-dashboard-main-content">
        <div className="quality-outbound-dashboard-date d-flex">
          <label htmlFor="date" className="mt-1">
            &nbsp;Date:&nbsp;
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control w-auto"
            value={selectedDate}
            onChange={handleDateChange}
            max={getCurrentDate()}
          />
          <h3 className="quality-outbound-dashboard-header">Quality Outbound Dashboard</h3>
        </div>

        <div className="quality-outbound-dashboard-table-container" ref={tableContainerRef}>
          <div className="quality-outbound-dashboard-table table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl mt-3">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">Ticket No.</th>
                  <th scope="col">Date</th>
                  <th scope="col">Vehicle No.</th>
                  <th scope="col">In</th>
                  <th scope="col">Out</th>
                  <th scope="col">Transporter Name</th>
                  <th scope="col">Product</th>
                  <th scope="col">PO No</th>
                  <th scope="col">Customer</th>
                  <th scope="col">Transaction Type</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <span
                        style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                        onClick={() => handleTicketClick(item["Ticket No."], offset + index)}
                      >
                        {item["Ticket No."]}
                      </span>
                    </td>
                    <td>{item.Date}</td>
                    <td>{item["Vehicle No."]}</td>
                    <td>
                      {item.In}
                    </td>
                    <td>
                      {item.Out}
                    </td>
                    <td>{item["Transporter Name"]}</td>
                    <td>{item["Product"]}</td>
                    <td>{item["PO No"]}</td>
                    <td>{item["Customer"]}</td>
                    <td>{item["Transaction Type"]}</td>
                    <td>
                      <button className="btn btn-success download-btn" onClick={handleDownload}>
                        <FontAwesomeIcon icon={faFileArrowDown} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="quality-outbound-dashboard-pagination-container">
          <span className="pagination-text">Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage, data.length)} of {data.length} entries</span>
          <div className="pagination-buttons">
            <button onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
            {[...Array(pageCount)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index ? "active" : ""}
                onClick={() => setCurrentPage(index)}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default QualityOutboundDashboard;

