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

const VehicleEntry = ({ onConfirmTicket = () => { } }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [systemOutTime, setSystemOutTime] = useState('');
  const [vehicleEntryDetails, setVehicleEntryDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(5); // Number of entries per page
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
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
        setVehicleEntryDetails(data);
      })
      .catch(error => {
        console.error('Error fetching vehicle entry details:', error);
      });
  }, []);

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

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
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

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = vehicleEntryDetails.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginateBackwardDouble = () => {
    setCurrentPage(1); // Set current page to 1 when "<<"" button is clicked
  };

  const paginateBackward = () => {
    setCurrentPage(currentPage - 1);
  };
  const paginateForward = () => {
    setCurrentPage(currentPage + 1);
  };

  const paginateForwardDouble = () => {
    setCurrentPage(totalPages); // Set current page to the total number of pages when ">>"" button is clicked
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

  const entriesCount = vehicleEntryDetails.length;
  const showingFrom = indexOfFirstEntry + 1;
  const showingTo = Math.min(indexOfLastEntry, entriesCount);

  const totalPages = Math.ceil(vehicleEntryDetails.length / entriesPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = 3; // Number of page numbers to show
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(startPage + totalPagesToShow - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span key={i} style={{ margin: '0 5px' }}>
          <button
            onClick={() => setCurrentPage(i)}
            className={`page-number-button ${currentPage === i ? "active" : ""}`}
            style={{ borderRadius: '5px', borderWidth: '1px' }}
          >
            {i}
          </button>
        </span>
      );
    }

    if (totalPages > totalPagesToShow && currentPage < totalPages - 1) {
      pageNumbers.push(
        <span key="ellipsis" style={{ margin: '0 5px' }}>
          ...
        </span>
      );

      pageNumbers.push(
        <span key={totalPages} style={{ margin: '0 5px' }}>
          <button
            onClick={() => setCurrentPage(totalPages)}
            className={`page-number-button ${currentPage === totalPages ? "active" : ""}`}
            style={{ borderRadius: '5px', borderWidth: '1px' }}
          >
            {totalPages}
          </button>
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <SideBar2>
      <div className="vehicleEntry-main">
        <div className="container-fluid">
          <div className="container mx-auto px-4 py-8" style={{ marginTop: '20px', marginLeft: '20px' }}>
            <h2 className="text-center mb-6"> Gate User Transaction Details </h2>
          </div>
          <div className="d-flex align-items-center mb-3">
            <input
              type="text"
              value={selectedDate}
              readOnly // Make input read-only
              className="form-control"
              style={{ width: '110px', marginLeft: '20px' }}
            />
          </div>
          <div className="container-fluid vehicle-table-container mx-auto px-4 py-8">
            <div className="vehicle-table table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl mt-3 VehicleEntrytable">
              <table className="vehicle-table table-bordered table-striped" style={{ marginBottom: '10px', marginRight: '50px' }}>
                <thead className="text-center">
                  <tr>
                    <th scope="col" style={{ width: '5%', padding: '5px', margin: '5px ' }}>Ticket No.</th>
                    <th scope="col" style={{ width: '8%', padding: '5px', margin: '5px' }}>Vehicle No.</th>
                    <th scope="col" style={{ width: '10%', padding: '5px', margin: '5px' }}>In Time/Date</th>
                    <th scope="col" style={{ width: '10%', padding: '5px', margin: '5px' }}>Out Time/Date</th>
                    <th scope="col" style={{ width: '8%', padding: '5px', margin: '5px' }}>Transporter</th>
                    <th scope="col" style={{ width: '8%', padding: '5px', margin: '5px' }}>Supplier/Customer</th>
                    <th scope="col" style={{ width: '10%', padding: '5px', margin: '5px' }}>Supplier's /Customer's Address</th>
                    <th scope="col" style={{ width: '8%', padding: '5px', margin: '5px' }}>Material</th>
                    <th scope="col" style={{ width: '5%', padding: '5px', margin: '5px' }}>TP No.</th>
                    <th scope="col" style={{ width: '5%', padding: '5px', margin: '5px' }}>TP Net weight</th>
                    <th scope="col" style={{ width: '5%', padding: '5px', margin: '5px' }}>PO No.</th>
                    <th scope="col" style={{ width: '5%', padding: '5px', margin: '5px' }}>Challan No.</th>
                    <th scope="col" style={{ width: '8%', padding: '5px', margin: '5px' }}>Transaction Type</th>
                    <th scope="col" style={{ width: '5%', padding: '5px', margin: '5px' }}>OUT</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {currentEntries.map((entry, index) => (
                    <tr key={entry.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                      <td>{entry.ticketNo}</td>
                      <td>{entry.vehicleNo}</td>
                      <td>{entry.vehicleIn}</td>
                      <td>{entry.vehicleOut}</td>
                      <td>{entry.transporter}</td>
                      <td>{entry.transactionType === 'Inbound' ? entry.supplier : entry.customer}</td>
                      <td>{entry.transactionType === 'Inbound' ? entry.supplierAddress : entry.customerAddress}</td>
                      <td>{entry.material}</td>
                      <td>{entry.tpNo}</td>
                      <td>{entry.tpNetWeight}</td>
                      <td>{entry.poNo}</td>
                      <td>{entry.challanNo}</td>
                      <td>{entry.transactionType}</td>
                      <td>
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
          <div style={{ marginTop: '10px', marginRight: '30px', marginLeft: '20px' }}>
            <div className="row justify-content-between mb-2" style={{ margin: '0', padding: '0' }}>
              <div className="col-auto" style={{ margin: '0', padding: '0' }}>
                <p style={{ margin: '0', padding: '0' }}>
                  Showing <span style={{ color: 'red' }}>{showingFrom}</span> to{' '}
                  <span style={{ color: 'red' }}>{showingTo}</span> of{' '}
                  <span style={{ color: 'blue' }}>{entriesCount}</span> entries
                </p>
              </div>
              <div className="pagination-button" style={{ margin: '0', padding: '0' }}>
                <div className="pagination" style={{ margin: '0', padding: '0' }}>
                  <button
                    className={`backword-double-button ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={paginateBackwardDouble}
                    disabled={currentPage === 1}
                    style={{ borderRadius: '5px', borderWidth: '1px', margin: '0', padding: '5px' }}>{"<<"}
                  </button>
                  <span style={{ margin: '0 5px' }}></span>
                  <button
                    className={`backword-button ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={paginateBackward}
                    disabled={currentPage === 1}
                    style={{ borderRadius: '5px', borderWidth: '1px', margin: '0', padding: '5px' }}>{"<"}
                  </button>
                  <span style={{ margin: '0 5px' }}></span>
                  {renderPageNumbers()}
                  <span style={{ margin: '0 5px' }}></span>
                  <button
                    className={`forward-button ${indexOfLastEntry >= vehicleEntryDetails.length ? 'disabled' : ''}`}
                    onClick={paginateForward}
                    disabled={indexOfLastEntry >= vehicleEntryDetails.length}
                    style={{ borderRadius: '5px', borderWidth: '1px', margin: '0', padding: '5px' }}>{">"}
                  </button>
                  <span style={{ margin: '0 5px' }}></span>
                  <button
                    className={`forward-double-button ${indexOfLastEntry >= vehicleEntryDetails.length ? 'disabled' : ''}`}
                    onClick={paginateForwardDouble}
                    disabled={indexOfLastEntry >= vehicleEntryDetails.length}
                    style={{ borderRadius: '5px', borderWidth: '1px', margin: '0', padding: '5px' }}>{">>"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBar2>
  );
};

export default VehicleEntry;
