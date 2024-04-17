import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Chart, ArcElement } from "chart.js/auto";
import Header from "../../../../Header/Header";
import SideBar4 from "../../../../SideBar/SideBar4";

import {
  faHome,
  faBackward,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

function ManagementLocation() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
  };

  const handlehome = () => {
    navigate("/home");
  };

  const handleback = () => {
    navigate(-1);
  };

  const data = [
    {
      date: "2024-04-01",
      truckNo: "ABC123",
      transporter: "Jagannath Travels",
      supplier: "MCL",
      product: "Hematite",
      poNo: "PO001",
      challanNo: "CH001",
    },
    {
      date: "2024-04-01",
      truckNo: "DEF456",
      transporter: "Jagannath Travels",
      supplier: "MCL",
      product: "Coal",
      poNo: "PO002",
      challanNo: "CH002",
    },
    {
      date: "2024-04-02",
      truckNo: "GHI789",
      transporter: "Shardha Travels",
      supplier: "MCL",
      product: "Iron Ore",
      poNo: "PO003",
      challanNo: "CH003",
    },
    {
      date: "2024-04-02",
      truckNo: "JKL012",
      transporter: "Shardha Travels",
      supplier: "MCL",
      product: "Dolomite",
      poNo: "PO004",
      challanNo: "CH004",
    },
    {
      date: "2024-04-03",
      truckNo: "MNO345",
      transporter: "Shardha Travels",
      supplier: "MCL",
      product: "Coal",
      poNo: "PO005",
      challanNo: "CH005",
    },
  ];

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
    ? data.filter((item) => item.date === selectedDate)
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
      <div className="report-header d-flex justify-content-center">
      </div>
      <div className="daily-report-date d-flex align-items-center ml-3 mt-3 ">
        <label htmlFor="date" className="mb-0 mr-3">
          &nbsp;Date:&nbsp;
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="form-control w-auto"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="dail-report-table table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl mt-3">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Truck no.</th>
              <th>Transporter</th>
              <th>Supplier</th>
              <th>Product</th>
              <th>Po no.</th>
              <th>Challan no.</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.truckNo}</td>
                <td>{item.transporter}</td>
                <td>{item.supplier}</td>
                <td>{item.product}</td>
                <td>{item.poNo}</td>
                <td>{item.challanNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          disabledClassName={"disabled"}
          activeClassName={"active"}
          // Custom styling to hide the page count
          pageClassName={"d-none"}
          breakClassName={"d-none"}
          pageLinkClassName={"d-none"}
          marginPagesDisplayed={0}
          breakLabel={null}
        />
      )}
      {/* <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={handleDownload}>
          Download Report
        </button>
      </div> */}

      <div className="mt-5 mb-3 d-flex justify-content-center gap-5 vh-70 fixed-bottom">
        <button className="icon-button" onClick={handlehome}>
          <FontAwesomeIcon icon={faHome} size="lg" />
          <span className="ms-1">Home</span>
        </button>
        <button className="icon-button" onClick={handleback}>
          <FontAwesomeIcon icon={faBackward} size="lg" />
          <span className="ms-1">Back</span>
        </button>
        <button className="icon-button" onClick={handleSignOut}>
          <FontAwesomeIcon icon={faPowerOff} size="lg" />
          <span className="ms-1">Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export default ManagementLocation;
