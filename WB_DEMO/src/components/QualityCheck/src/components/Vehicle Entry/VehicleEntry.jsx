import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faTruck,
  faPrint,
  faVideo,
  faFileAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../Pages/header"; 
import Sidebar from "../../Pages/Sidebar"; 
// import "./VehicleEntry.css";
 
const VehicleEntry = ({ onConfirmTicket = () => { } }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  // Define totalUsers and totalVehicleEntry
  const [totalUsers, setTotalUsers] = useState(100);
  const [totalVehicleEntry, setTotalVehicleEntry] = useState(50);
 
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
      inTimeDate: "", // Add In Time/Date field
      outTimeDate: "" // Add Out Time/Date field
    };
    onConfirmTicket(details);
    console.log(selectedOption); // Add this line for debugging
 
    if (selectedOption === 'inbound') {
      navigate('/VehicleEntryDetails'); // Navigate to VehicleEntryDetails page if inbound is selected
    }
 
    setSelectedOption(''); // Move this line after the navigation check
    closePopup();
  };
 
 
  return (
    <div>
      <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000, // Ensure the header is above other content
    //   backgroundColor: "#333" // Example background color
    }} className="home-header d-flex justify-content-center">
      <h3 className="home-header-title text-4xl text-center text-uppercase text-white mt-3 d-flex justify-content-center align-items-center flex-wrap">
        Vehicle Entry
      </h3>
    </div>
      <Sidebar /> {/* Use Sidebar component */}
      <div className="container-fluid">
        <div className="container mx-auto px-4 py-8" style={{ marginTop: '70px', marginLeft: '20px' }}>
          <h2 className="text-center mb-4">Dashboard</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="bg-light p-4 rounded">
                <h3 className="text-lg font-weight-bold mb-2">Total Users</h3>
                <p className="text-xl">{totalUsers}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bg-light p-4 rounded">
                <h3 className="text-lg font-weight-bold mb-2">Total Vehicle Entry</h3>
                <p className="text-xl">{totalVehicleEntry}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8" style={{ marginTop: '80px', marginLeft: '20px' }}>
          {showPopup && (
          <div className="modal show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <div className="modal-dialog modal-dialog-centered" style={{ height: '60px' }}>
            <div className="modal-content" style={{ overflowY: 'auto' }}>
                <div className="modal-header">
                  <h5 className="modal-title" style={{ paddingRight: '16.5rem' }}>Select Ticket Type</h5>
                  <button type="button" className="close" onClick={closePopup} style={{ backgroundColor: 'red', border: 'none' }}>
                    <span style={{ color: 'red' }}>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-check">
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
                  <div className="form-check">
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
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closePopup}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={handleConfirm} disabled={!selectedOption}>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        )}
          <div className="row justify-content-end mb-4">
            <button onClick={openPopup} className="btn btn-sm btn-primary" style={{ padding: '0', width: '100px', height: '30px' }}>
              Add Ticket
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Ticket No.</th>
                <th>In Time/Date</th>
                <th>Out Time/Date</th>
                <th>Vehicle Type</th>
                <th>No. of Wheels</th>
                <th>RC</th>
                <th>Vehicle No.</th>
                <th>TP No.</th>
                <th>PO No.</th>
                <th>Challan No.</th>
                <th>Out</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TicketInputBox placeholder="Ticket No." />
                <TicketInputBox placeholder="In Time/Date" />
                <TicketInputBox placeholder="Out Time/Date" />
                <TicketInputBox placeholder="Vehicle Type" />
                <TicketInputBox placeholder="No. of Wheels" />
                <TicketInputBox placeholder="RC" />
                <TicketInputBox placeholder="Vehicle No." />
                <TicketInputBox placeholder="TP No." />
                <TicketInputBox placeholder="PO No." />
                <TicketInputBox placeholder="Challan No." />
                <td>
                  <button className="btn btn-danger">Out</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
 
const TicketInputBox = ({ placeholder }) => {
  return (
    <td>
      <input
        className="form-control"
        type="text"
        placeholder={placeholder}
        style={{ width: '80px' }} // Decreased width for input box
      />
    </td>
  );
};
 
export default VehicleEntry;
