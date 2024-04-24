import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Header from "../../../../Header/Header";
import SideBar3 from "../../../../SideBar/SideBar3";
import "./QualityCheck.css";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { Chart, ArcElement } from "chart.js/auto";
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown, faBackwardStep, faForwardStep, faBackwardFast, faForwardFast } from '@fortawesome/free-solid-svg-icons';
import QualityInboundDetails from "./QualityInboundDetails";

function QualityCheck() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
 
  const [isDownloadDisabled, setIsDownloadDisabled] = useState(true);

  const handleDownload = () => {
    const requiredFields = ['Vehicle No.', 'Transporter Name', 'Product/Material', 'Product/Material Type', 'TP No', 'Po No', 'Challan No', 'Supplier/customer', 'Supplier/customer Address'];
    const allowedEmptyFields = 2; // Adjust this value based on your requirement
  
    const hasDataToDownload = data.some(item => {
      const emptyFieldCount = requiredFields.filter(field => !item[field]).length;
      return emptyFieldCount <= allowedEmptyFields;
    });
  
    if (hasDataToDownload) {
      // Your existing download logic
    } else {
      console.log("Not enough data to download. Please fill in more fields.");
    }
  
    setIsDownloadDisabled(!hasDataToDownload); // Set the disabled state of the button
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

  const handlehome = () => {
    navigate("/home");
  };

  const [data, setData] = useState([
    {
      "Ticket No.": 1,
      Date: "2024-04-24",
      "Vehicle No.": "OD35F-3948",
      In: "11:16",
      Out: "12:20",
      "Transporter Name": "JEEN TRADE AND EXPORTS PRIVATE LTD",
      "Product/Material": "Coal",
      "Product/Material Type": "ROM -100MM",
      "TP No/Document No": "I22405984/75",
      "Po No": " ",
      "Challan No": "1310002441-5300025809",
      "Supplier/customer": "MCL Bhubaneswari",
      "Supplier/customer Address": "Talcher",
      "Transaction Type": "Inbound",
    },
    {
      "Ticket No.": 2,
      Date: "2024-04-24",
      "Vehicle No.": "HR38Z1951",
      In: "16:25",
      Out: "21:45",
      "Transporter Name": "MAA SHERAWALI TRANSPORT",
      "Product/Material": "SPONGE IRON",
      "Product/Material Type": "LUMPS",
      "TP No/Document No": "VPL/23-24/S1294",
      "Po No": "97/3",
      "Challan No": " ",
      "Supplier/customer": "SAMRIDHI TRADES",
      "Supplier/customer Address": "MUZAFFARNAGAR",
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
      <div className="quality-check-main-content">
        <div className="quality-check-date d-flex">
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
          <h2 className="quality-check-header">Quality Dashboard</h2>
        </div>

        <div className="quality-check-table-container" ref={tableContainerRef}>
          <div className="quality-check-table table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl mt-3">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">Ticket No.</th>
                  <th scope="col">Date</th>
                  <th scope="col">Vehicle No.</th>
                  <th scope="col">In</th>
                  <th scope="col">Out</th>
                  <th scope="col">Transporter Name</th>
                  <th scope="col">Product/Material</th>
                  <th scope="col">Product/Material Type</th>
                  <th scope="col">TP No/Document No</th>
                  <th scope="col">Po No</th>
                  <th scope="col">Challan No</th>
                  <th scope="col">Supplier/Customer</th>
                  <th scope="col">Supplier/Customer Address</th>
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
                    <td>{item["Product/Material"]}</td>
                    <td>{item["Product/Material Type"]}</td>
                    <td>{item["TP No/Document No"]}</td>
                    <td>{item["Po No"]}</td>
                    <td>{item["Challan No"]}</td>
                    <td>{item["Supplier/customer"]}</td>
                    <td>{item["Supplier/customer Address"]}</td>
                    <td>{item["Transaction Type"]}</td>
                    <td>
                    <button
  className={`btn btn-success download-btn ${isDownloadDisabled ? 'disabled' : ''}`}
  onClick={handleDownload}
  disabled={isDownloadDisabled}
>
  <FontAwesomeIcon icon={faFileArrowDown} />
</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="quality-check-pagination-container">
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

export default QualityCheck;

