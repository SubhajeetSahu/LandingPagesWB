import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import Header from "../../../../Header/Header";
import SideBar3 from "../../../../SideBar/SideBar3";
import "./QualityCheck.css";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Chart, ArcElement } from "chart.js/auto";
import { useMediaQuery } from 'react-responsive';

function QualityCheck() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

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
      Date: "2024-04-17",
      "Vehicle No.": "ABC123",
      In: "09:00",
      Out: "11:30",
      "Transporter Name": "XYZ Logistics",
      "Product Name": "Coal",
      "TP No.": "TP001",
      "PO No.": "PO001",
      "Supplier Name": "Supplier A",
      "Transaction Status" : "Inbound",
    },
    {
      "Ticket No.": 2,
      Date: "2024-04-17",
      "Vehicle No.": "DEF456",
      In: "12:00",
      Out: "14:30",
      "Transporter Name": "ABC Transport",
      "Product Name": "Iron Ore",
      "TP No.": "TP002",
      "PO No.": "PO002",
      "Supplier Name": "Supplier B",
      "Transaction Status": "Outbound",
    },
    {
      "Ticket No.": 3,
      Date: "2024-04-17",
      "Vehicle No.": "GHI789",
      In: "10:00",
      Out: "12:30",
      "Transporter Name": "PQR Logistics",
      "Product Name": "Limestone",
      "TP No.": "TP003",
      "PO No.": "PO003",
      "Supplier Name": "Supplier C",
       "Transaction Status": "Inbound",
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
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DailyReport");
    XLSX.writeFile(wb, "daily_report.xlsx");
  };

  const tableContainerRef = useRef(null);

  useEffect(() => {
    // Scroll the table container to a specific position
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft = 100; // Adjust the value as needed
    }
  }, [data]); 

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <SideBar3
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div className="daily-report-main-content">
        <div className="daily-report-date d-flex">
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
          <h2 className="header">Quality Dashboard</h2>
        </div>
        
        <div className="daily-report-table-container" ref={tableContainerRef}>
          <div className="daily-report-table table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl mt-3">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">Ticket No.</th>
                  <th scope="col">Date</th>
                  <th scope="col">Vehicle No.</th>
                  <th scope="col">In</th>
                  <th scope="col">Out</th>
                  <th scope="col">Transporter Name</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">TP No.</th>
                  <th scope="col">PO No.</th>
                  <th scope="col">Supplier Name</th>
                  <th scope="col">Transaction Status</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Link to="/QualityDetailsEntry">
                        {item["Ticket No."]}
                      </Link>
                    </td>
                    <td>{item.Date}</td>
                    <td>{item["Vehicle No."]}</td>
                    <td>{item.In}</td>
                    <td>{item.Out}</td>
                    <td>{item["Transporter Name"]}</td>
                    <td>{item["Product Name"]}</td>
                    <td>{item["TP No."]}</td>
                    <td>{item["PO No."]}</td>
                    <td>{item["Supplier Name"]}</td>
                    <td>{item["Transaction Status"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pagination-download-container">
          <div className="pagination-container mt-3">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName={"pagination-buttons"}
              previousLinkClassName={"previous-button"}
              nextLinkClassName={"next-button"}
              disabledClassName={"pagination-disabled"}
              activeClassName={"pagination-active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QualityCheck;
