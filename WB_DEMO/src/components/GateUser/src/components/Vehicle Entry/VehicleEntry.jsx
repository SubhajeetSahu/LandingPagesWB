// VehicleEntry.jsx
 
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import InTime_Img from "../../assets/InTime_Img.svg";
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
 
 
  const navigate = useNavigate();
 
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
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
    console.log(selectedOption); // Add this line for debugging
 
    if (selectedOption === 'inbound') {
      navigate('/VehicleEntryDetails'); // Navigate to VehicleEntryDetails page if inbound is selected
    }
 
    setSelectedOption(''); // Move this line after the navigation check
    setSelectedDate('');
    closePopup();
  };
  // Function to get the system out time
  const getSystemOutTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setSystemOutTime(currentTime);
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
 
        <div className="container mx-auto px-4 py-8" style={{ marginTop: '100px', marginLeft: '20px' }}>
          <h2 className="text-center mb-4"> Gate User Dashboard</h2>
        </div>
 
        {/* Add backdrop for modal */}
        {showPopup && (
          <div className="backdrop"></div>
        )}
        {/* Popup Modal */}
 
        <div className="container mx-auto px-4 py-8" style={{ marginTop: '40px', marginLeft: '20px' }}>
          {showPopup && (
            <div className="modal show" tabIndex="-1" style={{ display: 'block', }}>
              <div className="modal-dialog modal-dialog-centered" style={{ marginTop: '30px', width: '400px', maxWidth: '100%' }} >
                <div className="modal-content" >
                  <div className="modal-header">
                    <h5 className="modal-title" style={{ paddingRight: '7.5rem' }}>Select Transaction Type</h5>
                    <button type="button" className="close" onClick={closePopup} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}>
                      <span style={{ color: 'red' }}>&times;</span>
                    </button>
                  </div>
                  {/* Modal Body */}
                  <div className="modal-body d-flex flex-row justify-content-center align-items-center radio-container">
                    <div className="form-check  "> {/* Add margin right to create space between radio buttons */}
                      <input
                        type="radio"
                        id="inbound"
                        value="inbound"
                        checked={selectedOption === 'inbound'}
                        onChange={handleOptionChange}
                        className="form-check-input"
                      />
                      <label htmlFor="inbound" className="form-check-label">Inbound</label>
                    </div>
                    <div className="form-check ">
                      <input
                        type="radio"
                        id="outbound"
                        value="outbound"
                        checked={selectedOption === 'outbound'}
                        onChange={handleOptionChange}
                        className="form-check-input"
                      />
                      <label htmlFor="outbound" className="form-check-label">Outbound</label>
                    </div>
                  </div>
                  <div className="modal-footer d-flex justify-content-center">
                    <button type="button" className="btn btn-secondary" onClick={closePopup}>Cancel</button>
                    <div style={{ width: '20px' }}></div> {/* Reduce width */}
                    <button type="button" className="btn btn-success" onClick={handleConfirm} disabled={!selectedOption}>Confirm</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Ticket Input Table */}
          <div className="row justify-content-between mb-2">
            {/* Date field */}
            <div className="col-auto d-flex align-items-center"> {/* Adjusted layout to align items */}
              <label htmlFor="date" style={{ marginRight: '20px', marginLeft: '-70px' }}>Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="form-control mb-3"
                style={{ width: '150px' }} // Adjust width here
              />
            </div>
            <div className="col-auto text-right"> {/* Added a column for the button and aligned it to the right */}
              <button onClick={openPopup} className="btn btn-sm btn-primary btn-add-ticket" style={{ padding: '0', width: '100px', height: '40px' }}>
                <strong>Add Ticket</strong> <FontAwesomeIcon icon={faPlus} style={{ marginLeft: '5px', fontWeight: 'bold' }} />
              </button>
            </div>
          </div>
          <div className='table-responsive VehicleEntrytable '>
            <table className="table table-bordered">
              <thead className="text-center">
                <tr>
                  <th style={{ width: '5%', padding: '5px', margin: '5px ' }}>Ticket No.</th>
                  <th style={{ width: '8%', padding: '5px', margin: '5px' }}>Vehicle No.</th>
                  <th style={{ width: '10%', padding: '5px', margin: '5px' }}>In Time/Date</th>
                  <th style={{ width: '10%', padding: '5px', margin: '5px' }}>Out Time/Date</th>
                  <th style={{ width: '7%', padding: '5px', margin: '5px' }}>Vehicle Type</th>
                  <th style={{ width: '7%', padding: '5px', margin: '5px' }}>No. of Wheels</th>
                  <th style={{ width: '8%', padding: '5px', margin: '5px' }}>Transporter</th>
                  <th style={{ width: '8%', padding: '5px', margin: '5px' }}>Supplier</th>
                  <th style={{ width: '10%', padding: '5px', margin: '5px' }}>Supplier's Address</th>
                  <th style={{ width: '8%', padding: '5px', margin: '5px' }}>Material</th>
                  <th style={{ width: '5%', padding: '5px', margin: '5px' }}>TP No.</th>
                  <th style={{ width: '5%', padding: '5px', margin: '5px' }}>TP Net weight</th>
                  <th style={{ width: '5%', padding: '5px', margin: '5px' }}>PO No.</th>
                  <th style={{ width: '5%', padding: '5px', margin: '5px' }}>Challan No.</th>
                  <th style={{ width: '8%', padding: '5px', margin: '5px' }}>Transaction Type</th>
                  {/* <th style={{ width: '5%', padding: '5px', margin: '5px' }}>IN</th> */}
                  <th style={{ width: '5%', padding: '5px', margin: '5px' }}>OUT</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  {/* Ticket Input Box Component */}
                  <TicketInputBox placeholder="Ticket No." width="80px " />
                  <TicketInputBox placeholder="Vehicle No." width="110px" />
                  <TicketInputBox placeholder="In Time/Date" width="140px" />
                  <TicketInputBox placeholder="Out Time/Date" width="140px" />
                  <TicketInputBox placeholder="Vehicle Type" width="90px" />
                  <TicketInputBox placeholder="No. of Wheels" width="90px" />
                  <TicketInputBox placeholder="Transporter" width="110px" />
                  <TicketInputBox placeholder="Supplier" width="110px" />
                  <TicketInputBox placeholder="Supplier's Address" width="140px" />
                  <TicketInputBox placeholder="Material" width="110px" />
                  <TicketInputBox placeholder="TP No." width="80px" />
                  <TicketInputBox placeholder="TP Net weight" width="80px" />
                  <TicketInputBox placeholder="PO No." width="80px" />
                  <TicketInputBox placeholder="Challan No." width="80px" />
                  <TicketInputBox placeholder="Transaction Status" width="80px" />
 
                  {/* <td>
                    <button className="image-button">
                      <div className="image-container green-background">
                        <img src={InTime_Img} alt="In" className="time-image" />
                      </div>
                    </button>
                  </td> */}
                  <td>
                    <button className="image-button" onClick={getSystemOutTime}>
                      <div className="image-container red-background">
                        <img src={OutTime_Img} alt="Out" className="time-image" />
                      </div>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
 
const TicketInputBox = ({ placeholder }) => {
  // Calculate the width dynamically based on the length of the placeholder
  const width = placeholder.length * 10; // You can adjust the multiplier as needed
 
  return (
    <td>
      <input
        className="form-control"
        type="text"
        placeholder={placeholder}
        style={{ width: `${width}px` }} // Set width dynamically based on the length of the placeholder
      />
    </td>
  );
};
 
export default VehicleEntry;
 