import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./VehicleEntry.css";
import { Chart, ArcElement } from "chart.js/auto";
import Header from "../../../../Header/Header";
import SideBar2 from "../../../../SideBar/SideBar2";

const VehicleEntry = ({ onConfirmTicket = () => { } }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
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


  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <SideBar2
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div className="vehicleEntry-main-content">

        <div className="container mx-auto px-4 py-8" style={{ marginTop: '100px', marginLeft: '20px' }}>
          <h2 className="text-center mb-4"> Gate User Dashboard</h2>
        </div>
        {/* Popup Modal */}

        <div className="container mx-auto px-4 py-8" style={{ marginTop: '40px', marginLeft: '20px' }}>
          {showPopup && (
            <div className="modal show" tabIndex="-1" style={{ display: 'block', }}>
              <div className="modal-dialog modal-dialog-centered" style={{ marginTop: '30px' }} >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" style={{ paddingRight: '16.5rem' }}>Select Ticket Type</h5>
                    <button type="button" className="close" onClick={closePopup} style={{ backgroundColor: 'gray', border: 'none' }}>
                      <span style={{ color: 'red' }}>&times;</span>
                    </button>
                  </div>
                  {/* Modal Body */}
                  <div className="modal-body">
                    <div className="form-check mb-4"> {/* Add margin bottom */}
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
          {/* Ticket Input Table */}
          <div className="row justify-content-between mb-2">
            {/* Date field */}
            <div className="col-auto d-flex align-items-center"> {/* Adjusted layout to align items */}
              <label htmlFor="date" style={{ marginRight: '20px' }}>Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="form-control mb-3"
                style={{ width: '150px' }} // Adjust width here
              />
            </div>
            <div className="col-auto text-right"> {/* Added a column for the button and aligned it to the right */}
              <button onClick={openPopup} className="btn btn-sm btn-primary" style={{ padding: '0', width: '100px', height: '30px' }}>
                Add Ticket
              </button>
            </div>
          </div>
          <div className='VehicleEntrytable'>
          <table className="table table-bordered ">
            <thead className="text-center">
              <tr>
                <th style={{ width: '5%' }}>Ticket No.</th>
                <th style={{ width: '8%' }}>Vehicle No.</th>
                <th style={{ width: '10%' }}>In Time/Date</th>
                <th style={{ width: '10%' }}>Out Time/Date</th>
                <th style={{ width: '7%' }}>Vehicle Type</th>
                <th style={{ width: '7%' }}>No. of Wheels</th>
                <th style={{ width: '8%' }}>Transporter</th>
                <th style={{ width: '8%' }}>Supplier</th>
                <th style={{ width: '10%' }}>Supplier's Address</th>
                <th style={{ width: '8%' }}>Material</th>
                <th style={{ width: '5%' }}>TP No.</th>
                <th style={{ width: '5%' }}>TP Net weight</th>
                <th style={{ width: '5%' }}>PO No.</th>
                <th style={{ width: '5%' }}>Challan No.</th>
                <th style={{ width: '8%' }}>Transaction Status </th>
                <th style={{ width: '5%' }}>IN</th>
                <th style={{ width: '5%' }}>OUT</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                {/* Ticket Input Box Component */}
                <TicketInputBox placeholder="Ticket No." width="80px" />
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

                <td>
                  <button className="btn btn-success">IN</button>
                </td>
                <td>
                  <button className="btn btn-danger">OUT</button>
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
  return (
    <td>
      <input
        className="form-control"
        type="text"
        placeholder={placeholder}
        style={{ width: '60px' }} // Set width dynamically based on the width prop
      />
    </td>

  );
};

export default VehicleEntry;
