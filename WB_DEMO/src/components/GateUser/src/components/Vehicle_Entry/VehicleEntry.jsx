import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import OutTime_truck from "../../assets/OutTime_truck.png";
import { Link } from "react-router-dom";
import { Chart, ArcElement } from "chart.js/auto";
import SideBar2 from "../../../../SideBar/SideBar2";
import "./VehicleEntry.css";
import Swal from 'sweetalert2';
import { Table, Tag, Button, Input } from "antd";



const VehicleEntry = ({ onConfirmTicket = () => { } }) => {
  const [currentDate, setCurrentDate] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [systemOutTime, setSystemOutTime] = useState('');
  const [vehicleEntryDetails, setVehicleEntryDetails] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [startPageNumber, setStartPageNumber] = useState(1);
  const itemsPerPage = 5;



  // Code for Date:

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);


  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  };

  // API for Pagination:

  useEffect(() => {
    // Initial fetch
    fetch("http://localhost:8080/api/v1/gate", {
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setVehicleEntryDetails(data.transactions);
        setTotalPage(data.totalPages);
        console.log("total Page " + data.totalPages);
        // Set the current page to 1 to trigger the paginated fetch
        setCurrentPage(0);
      })
      .catch(error => {
        console.error('Error fetching vehicle entry details:', error);
      });
  }, []);



  useEffect(() => {
    if (currentPage !== null) {
      fetchData(currentPage);
    }
  }, [currentPage]);

  const fetchData = (pageNumber) => {
    fetch(`http://localhost:8080/api/v1/gate?page=${pageNumber}`, {
      credentials: "include"
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setVehicleEntryDetails(data.transactions);
        setTotalPage(data.totalPages);
        console.log("total Page " + data.totalPages);
      })
      .catch(error => {
        console.error('Error fetching vehicle entry details:', error);
      });
  };


  const pageCount = totalPage;
  const handlePageChange = ({ selected }) => {
    const newStartPage = Math.max(1, selected * 3 - 2);
    setCurrentPage(selected);
    setStartPageNumber(newStartPage);
  };

  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const homeMainContentRef = useRef(null);

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

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };



  const handleConfirm = () => {
    const details = {
      ticketType: selectedOption,
      inTimeDate: selectedDate,
      outTimeDate: selectedDate // Assuming both in and out time/date are same for now
    };
    onConfirmTicket(details);

    if (selectedOption === 'inbound') {
      navigate('/VehicleEntryDetails');
    }

    setSelectedOption('');
    setSelectedDate('');
    closePopup();
  };

  // API for Vehicle Out

  const handleVehicleExit = async (ticketNo) => {
    console.log(`handleVehicleExit called with ticketNo: ${ticketNo}`); // Log the ticket number to ensure the function is called
    try {
      const response = await fetch(`http://localhost:8080/api/v1/gate/out/${ticketNo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Add body if needed
        // body: JSON.stringify({ someKey: someValue }),
        credentials: 'include'
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      console.log("API response:", data);


      if (response.ok) {
        // Display the API response using SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Vehicle Exit Status',
          text: data.message || JSON.stringify(data), // Assuming the response body is the message you want to display
          showConfirmButton: true
        });
      } else {
        // Display the error message from the API response using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Vehicle Exit Status',
          text: data.message || 'An error occurred', // Assuming the response body contains the message you want to display
          showConfirmButton: true
        });
      }
    } catch (error) {
      console.error("Fetch error:", error); // Log the error for debugging

      // Display a generic error message if the API response is not available
      Swal.fire({
        icon: 'error',
        title: 'Error checking vehicle status',
        text: 'Please try again later',
        showConfirmButton: true
      });
    }
  };





  return (
    <SideBar2>
      <div style={{ fontFamily: "Arial", color: "#333", "--table-border-radius": "30px" }}>
        <div className="container-fluid mt-0">
          <div className="mb-3 text-center">
            <h2 style={{ fontFamily: "Arial", marginBottom: "0px !important" }}>
              Gate User Transaction Details
            </h2>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control form-control-sm"
              style={{ width: "auto" }}
              value={currentDate}
              onChange={handleDateChange}
            />
          </div>
          <div className=" table-responsive" style={{ overflowX: "auto", maxWidth: "100%", borderRadius: "10px" }}>
            <div >
              <table className=" ant-table table table-striped" style={{ width: "100%" }} >
                <thead className="ant-table-thead" >
                  <tr className="ant-table-row">
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Ticket No.</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Vehicle No.</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>In Time/Date</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Out Time/Date</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Transporter</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Supplier/Customer</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Supplier's /Customer's Address</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Material/Product</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>TP No.</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>TP Net weight</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>PO No.</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Challan No.</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Transaction Type</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>OUT</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {vehicleEntryDetails.map((entry, index) => (
                    <tr key={entry.id}>
                      <td className="ant-table-cell" style={{ textAlign: "center" }} >{entry.ticketNo}</td>
                      <td className="ant-table-cell" style={{ whiteSpace: "nowrap", textAlign: "center" }}> {entry.vehicleNo} </td>
                      <td className="ant-table-cell" style={{ whiteSpace: "nowrap", textAlign: "center" }}> {entry.vehicleIn} </td>
                      <td className="ant-table-cell" style={{ whiteSpace: "nowrap", textAlign: "center" }}> {entry.vehicleOut}</td>
                      <td className="ant-table-cell" style={{ whiteSpace: "nowrap", textAlign: "center" }}> {entry.transporter}</td>
                      <td className="ant-table-cell" style={{ whiteSpace: "nowrap", textAlign: "center" }}> {entry.transactionType === 'Inbound' ? entry.supplier : entry.customer}</td>
                      <td className="ant-table-cell" style={{ whiteSpace: "nowrap", textAlign: "center" }}> {entry.transactionType === 'Inbound' ? entry.supplierAddress : entry.customerAddress}</td>
                      <td className="ant-table-cell" style={{ whiteSpace: "nowrap", textAlign: "center" }}> {entry.material}</td>
                      <td className="ant-table-cell" style={{ whiteSpace: "nowrap", textAlign: "center" }}> {entry.tpNo}</td>
                      <td className="ant-table-cell" style={{ whiteSpace: "nowrap", textAlign: "center" }}> {entry.tpNetWeight}</td>
                      <td className="ant-table-cell" style={{ whiteSpace: "nowrap", textAlign: "center" }}> {entry.poNo}</td>
                      <td className="ant-table-cell" style={{ whiteSpace: "nowrap", textAlign: "center" }}> {entry.challanNo}</td>
                      <td>{entry.transactionType}</td>
                      <td className="ant-table-cell" style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                        <button className="image-button" onClick={() => handleVehicleExit(entry.ticketNo)}>
                          <div className="image-container" style={{ border: 'none' }}>
                            <img src={OutTime_truck} alt="Out" className="time-image" />
                          </div>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Code for Pagination: */}
      <div className="d-flex justify-content-between align-items-center mt-3 ml-2">
        <span>
          Showing {currentPage * itemsPerPage + 1} to{" "}
          {Math.min((currentPage + 1) * itemsPerPage, totalPage)} of{" "}
          {totalPage} entries
        </span>
        <div className="ml-auto">
          <button
            className="btn btn-outline-primary btn-sm me-2"
            style={{
              color: "#0077B6",
              borderColor: "#0077B6",
              marginRight: "2px",
            }}
            onClick={() => setCurrentPage(Math.max(0, currentPage - 5))}
            disabled={currentPage === 0}
          >
            &lt;&lt;
          </button>
          <button
            className="btn btn-outline-primary btn-sm me-2"
            style={{
              color: "#0077B6",
              borderColor: "#0077B6",
              marginRight: "2px",
            }}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            &lt;
          </button>

          {Array.from({ length: 3 }, (_, index) => {
            const pageNumber = currentPage + index;
            if (pageNumber >= pageCount) return null;
            return (
              <button
                key={pageNumber}
                className={`btn btn-outline-primary btn-sm me-2 ${currentPage === pageNumber ? "active" : ""
                  }`}
                style={{
                  color: currentPage === pageNumber ? "#fff" : "#0077B6",
                  backgroundColor:
                    currentPage === pageNumber ? "#0077B6" : "transparent",
                  borderColor: "#0077B6",
                  marginRight: "2px",
                }}
                //onClick={() => setCurrentPage(pageNumber)}
                onClick={() => setCurrentPage(pageNumber)}

              >
                {pageNumber + 1}
              </button>
            );
          })}
          {currentPage + 3 < pageCount && <span>...</span>}
          {currentPage + 3 < pageCount && (
            <button
              className={`btn btn-outline-primary btn-sm me-2 ${currentPage === pageCount - 1 ? "active" : ""
                }`}
              style={{
                color: currentPage === pageCount - 1 ? "#fff" : "#0077B6",
                backgroundColor:
                  currentPage === pageCount - 1 ? "#0077B6" : "transparent",
                borderColor: "#0077B6",
                marginRight: "2px",
              }}
              onClick={() => setCurrentPage(pageCount - 1)}
            >



              {pageCount}
            </button>
          )}
          <button
            className="btn btn-outline-primary btn-sm me-2"
            style={{
              color: "#0077B6",
              borderColor: "#0077B6",
              marginRight: "2px",
            }}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === pageCount - 1}
          >
            &gt;
          </button>
          <button
            className="btn btn-outline-primary btn-sm"
            style={{
              color: "#0077B6",
              borderColor: "#0077B6",
              marginRight: "2px",
            }}
            onClick={() =>
              setCurrentPage(Math.min(pageCount - 1, currentPage + 5))
            }
            disabled={currentPage === pageCount - 1}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </SideBar2>
  );
};

export default VehicleEntry;
