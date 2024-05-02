import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import OutTime_Img from "../../assets/OutTime_Img.png";
import { Link } from "react-router-dom";
import "./VehicleEntry.css";
import { Chart, ArcElement } from "chart.js/auto";
import Header from "../../../../Header/Header";
import SideBar2 from "../../../../SideBar/SideBar2";
import "./VehicleEntry.css";
 
const VehicleEntry = ({ onConfirmTicket = () => { } }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [systemOutTime, setSystemOutTime] = useState('');
  const [vehicleEntryDetails, setVehicleEntryDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(3); // Number of entries per page
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
 
 
  const getSystemOutTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setSystemOutTime(currentTime);
  };
 
  const entriesCount = vehicleEntryDetails.length;
  const showingFrom = indexOfFirstEntry + 1;
  const showingTo = Math.min(indexOfLastEntry, entriesCount);
 
  const totalPages = Math.ceil(vehicleEntryDetails.length / entriesPerPage);
 
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => setCurrentPage(i)} className={currentPage === i ? "active" : ""}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };
 
  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <FontAwesomeIcon icon={faPlus} />
 
      <SideBar2
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
 
      <div className="vehicleEntry-main-content">
        <div className="container mx-auto px-4 py-8" style={{ marginTop: '70px', marginLeft: '20px' }}>
        <div className="col-auto d-flex align-items-center">
          {/* <label htmlFor="datePicker"> Date:</label> */}
          <input
            type="date"
            id="datePicker"
            value={selectedDate}
            onChange={handleDateChange}
            className="form-control mb-3"
            style={{ width: '150px' }}
          />
            <h2 className="text-center mb-4" style={{marginLeft: '60px'}}> Gate User Transaction Details </h2>
        </div>
        
        </div>
    
        <div className="container mx-auto px-4 py-8" style={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px', overflowX: 'auto' }}> {/* Add overflowX style for horizontal scrollbar */}
          <div className='vehicle-table-responsive VehicleEntrytable '>
            <table className="vehicle-table table-bordered" style={{ marginBottom: '30px' }}> {/* Add margin bottom to the table */}
              <thead className="text-center">
                {/* Table headers */}
                <tr>
                  <th scope="col" style={{ width: '5%', padding: '5px', margin: '5px ' }}>Ticket No.</th>
                  <th scope="col" style={{ width: '8%', padding: '5px', margin: '5px' }}>Vehicle No.</th>
                  <th scope="col" style={{ width: '10%', padding: '5px', margin: '5px' }}>In Time/Date</th>
                  <th scope="col" style={{ width: '10%', padding: '5px', margin: '5px' }}>Out Time/Date</th>
                  <th scope="col" style={{ width: '7%', padding: '5px', margin: '5px' }}>Vehicle Type</th>
                  <th scope="col" style={{ width: '7%', padding: '5px', margin: '5px' }}>No. of Wheels</th>
                  <th scope="col" style={{ width: '8%', padding: '5px', margin: '5px' }}>Transporter</th>
                  <th scope="col" style={{ width: '8%', padding: '5px', margin: '5px' }}>Supplier</th>
                  <th scope="col" style={{ width: '10%', padding: '5px', margin: '5px' }}>Supplier's Address</th>
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
                {/* Render current entries */}
                {currentEntries.map((entry) => (
                  <tr key={entry.id}>
                    {/* Render table rows */}
                    <td>{entry.ticketNo}</td>
                    <td>{entry.vehicleNo}</td>
                    <td>{entry.vehicleIn}</td>
                    <td>{entry.vehicleOut}</td>
                    <td>{entry.vehicleType}</td>
                    <td>{entry.vehicleWheelsNo}</td>
                    <td>{entry.transporter}</td>
                    <td>{entry.supplier}</td>
                    <td>{entry.supplierAddress}</td>
                    <td>{entry.material}</td>
                    <td>{entry.tpNo}</td>
                    <td>{entry.tpNetWeight}</td>
                    <td>{entry.poNo}</td>
                    <td>{entry.challanNo}</td>
                    <td>{entry.transactionType}</td>
                    <td>
                      <button className="image-button" onClick={getSystemOutTime}>
                        <div className="image-container red-background">
                          <img src={OutTime_Img} alt="Out" className="time-image" />
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Add some space between the table and pagination section */}
        <div style={{ marginTop: '30px', marginRight: '80px', marginLeft: '80px' }}>
          <div className="row justify-content-between mb-2">
            <div className="col-auto ">
              <p>Showing {showingFrom} to {showingTo} of {entriesCount} entries</p>
            </div>
            <div className="col-auto">
              <div className="pagination">
                <button onClick={paginateBackwardDouble} disabled={currentPage === 1}>{"<<"}</button>
                <button onClick={paginateBackward} disabled={currentPage === 1}>{"<"}</button>
                {renderPageNumbers()}
                <button onClick={paginateForward} disabled={indexOfLastEntry >= vehicleEntryDetails.length}>{">"}</button>
                <button onClick={paginateForwardDouble} disabled={indexOfLastEntry >= vehicleEntryDetails.length}>{">>"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// const TicketInputBox = ({ placeholder, width }) => {
//   return (
//     <td>
//       <input
//         className="form-control"
//         type="text"
//         placeholder={placeholder}
//         style={{ width: width }}
//       />
//     </td>
//   );
// };
export default VehicleEntry;