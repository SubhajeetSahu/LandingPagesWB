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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown, faBackwardStep, faForwardStep, faBackwardFast, faForwardFast } from '@fortawesome/free-solid-svg-icons';

function QualityCheck() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const [pageNumberInput, setPageNumberInput] = useState(currentPage + 1);

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
      Date: "2024-04-18",
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
      Date: "2024-04-18",
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
      Date: "2024-04-18",
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
    {
      "Ticket No.": 4,
      "Date": "2024-04-18",
      "Vehicle No.": "JKL012",
      "In": "08:30",
      "Out": "10:45",
      "Transporter Name": "LMN Shipping",
      "Product Name": "Copper",
      "TP No.": "TP004",
      "PO No.": "PO004",
      "Supplier Name": "Supplier D",
      "Transaction Status": "Outbound"
   },
   
   {
      "Ticket No.": 5,
      "Date": "2024-04-18",
      "Vehicle No.": "MNO345",
      "In": "11:15",
      "Out": "13:45",
      "Transporter Name": "STU Transport",
      "Product Name": "Steel",
      "TP No.": "TP005",
      "PO No.": "PO005",
      "Supplier Name": "Supplier E",
      "Transaction Status": "Outbound"
   },
   
   {
      "Ticket No.": 6,
      "Date": "2024-04-18",
      "Vehicle No.": "PQR678",
      "In": "09:30",
      "Out": "11:00",
      "Transporter Name": "VWX Logistics",
      "Product Name": "Aluminum",
      "TP No.": "TP006",
      "PO No.": "PO006",
      "Supplier Name": "Supplier F",
      "Transaction Status": "Inbound"
   },
   
   {
      "Ticket No.": 7,
      "Date": "2024-04-18",
      "Vehicle No.": "STU901",
      "In": "14:00",
      "Out": "16:30",
      "Transporter Name": "YZA Shipping",
      "Product Name": "Nickel",
      "TP No.": "TP007",
      "PO No.": "PO007",
      "Supplier Name": "Supplier G",
      "Transaction Status": "Outbound"
   },
   
   {
      "Ticket No.": 8,
      "Date": "2024-04-18",
      "Vehicle No.": "VWX234",
      "In": "10:45",
      "Out": "12:15",
      "Transporter Name": "BCD Transport",
      "Product Name": "Zinc",
      "TP No.": "TP008",
      "PO No.": "PO008",
      "Supplier Name": "Supplier H",
      "Transaction Status": "Inbound"
   },
   
   {
      "Ticket No.": 9,
      "Date": "2024-04-18",
      "Vehicle No.": "YZA567",
      "In": "13:30",
      "Out": "15:45",
      "Transporter Name": "EFG Logistics",
      "Product Name": "Lead",
      "TP No.": "TP009",
      "PO No.": "PO009",
      "Supplier Name": "Supplier I",
      "Transaction Status": "Outbound"
   },
   
   {
      "Ticket No.": 10,
      "Date": "2024-04-18",
      "Vehicle No.": "BCD890",
      "In": "08:15",
      "Out": "10:30",
      "Transporter Name": "HIJ Shipping",
      "Product Name": "Gold",
      "TP No.": "TP010",
      "PO No.": "PO010",
      "Supplier Name": "Supplier J",
      "Transaction Status": "Inbound"
   },
   
   {
      "Ticket No.": 11,
      "Date": "2024-04-18",
      "Vehicle No.": "EFG123",
      "In": "11:00",
      "Out": "13:15",
      "Transporter Name": "KLM Transport",
      "Product Name": "Silver",
      "TP No.": "TP011",
      "PO No.": "PO011",
      "Supplier Name": "Supplier K",
      "Transaction Status": "Outbound"
   },
   
   {
      "Ticket No.": 12,
      "Date": "2024-04-18",
      "Vehicle No.": "HIJ456",
      "In": "09:45",
      "Out": "11:30",
      "Transporter Name": "NOP Logistics",
      "Product Name": "Platinum",
      "TP No.": "TP012",
      "PO No.": "PO012",
      "Supplier Name": "Supplier L",
      "Transaction Status": "Inbound"
   },
   
   {
       "Ticket No.": 13,
       "Date": "2024-04-18",
       "Vehicle No.": "KLM789",
       "In": "14:15",
       "Out": "16:30",
       "Transporter Name": "QRS Shipping",
       "Product Name": "Titanium",
       "TP No.": "TP013",
       "PO No.": "PO013",
       "Supplier Name": "Supplier M",
       "Transaction Status": "Outbound"
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
    setPageNumberInput(selected + 1); // Update input value when page changes
  };

  const handleDownload = () => {
    if (file) {
      const reportFilePath = '../../Report/' + file.name; // Constructing the relative path
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
          // Handle error (e.g., display a message to the user)
        });
    }
  };
  

  const tableContainerRef = useRef(null);

  useEffect(() => {
    // Scroll the table container to a specific position
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollLeft = 100; // Adjust the value as needed
    }
  }, [data]); 

  // Handle input change for page number input
  const handlePageNumberInputChange = (event) => {
    setPageNumberInput(event.target.value);
  };

  // Handle input blur (when user clicks outside) for page number input
  const handlePageNumberInputBlur = () => {
    // Convert input value to integer
    let pageNumber = parseInt(pageNumberInput);

    // Check if pageNumber is valid and within range
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= pageCount) {
      setCurrentPage(pageNumber - 1); // Set current page
    } else {
      // Reset input value if invalid
      setPageNumberInput(currentPage + 1);
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
                  <th scope="col">Product</th>
                  <th scope="col">TP No.</th>
                  <th scope="col">PO No.</th>
                  <th scope="col">Supplier</th>
                  <th scope="col">Transaction Type</th>
                  <th scope="col"></th>
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
        <div className="quality-check-pagination-download-container">
          <div className="quality-check-pagination-container mt-3">
          <button className="pagination-buttons fast-backward-button" onClick={() => setCurrentPage(0)} disabled={currentPage === 0}>
              <FontAwesomeIcon icon={faBackwardFast} />
            </button>
            <button className="pagination-buttons previous-button" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>
              <FontAwesomeIcon icon={faBackwardStep} />
            </button>
            <input
              type="number"
              className="page-number-input"
              value={pageNumberInput}
              onChange={handlePageNumberInputChange}
              onBlur={handlePageNumberInputBlur}
              min="1"
              max={pageCount}
            />
            <span>/ {pageCount}</span>
            <button className="pagination-buttons next-button" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageCount - 1}>
              <FontAwesomeIcon icon={faForwardStep} />
            </button>
            <button className="pagination-buttons fast-forward-button" onClick={() => setCurrentPage(pageCount - 1)} disabled={currentPage === pageCount - 1}>
              <FontAwesomeIcon icon={faForwardFast} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QualityCheck;

