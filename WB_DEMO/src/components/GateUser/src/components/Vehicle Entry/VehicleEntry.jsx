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
  const [vehicleEntryDetails, setVehicleEntryDetails] = useState([]); // Define vehicleEntryDetails state variable
  const navigate = useNavigate();
 
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);
 
  useEffect(() => {
    // fetchVehicleEntryDetails();
    // const fetchVehicleEntryDetails = () => {
    fetch("http://localhost:8080/api/v1/gate", {
      credentials: "include" // Include credentials in the request
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setVehicleEntryDetails(data); // Update state variable with fetched data
      })
      .catch(error => {
        console.error('Error fetching vehicle entry details:', error);
      });
    // };// Fetch data when the component mounts
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
 
        <div className="container mx-auto px-4 py-8" style={{ marginTop: '80px', marginLeft: '20px' }}>
          <h2 className="text-center mb-4"> Gate User Transaction Details </h2>
        </div>
 
        {showPopup && (
          <div className="backdrop"></div>
        )}
 
        <div className="container mx-auto px-4 py-8" style={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px' }}>
          {showPopup && (
            {/* <div className="modal show" tabIndex="-1" style={{ display: 'block', }}>
              <div className="modal-dialog modal-dialog-centered" style={{ marginTop: '30px', width: '400px', maxWidth: '100%' }} >
                <div className="modal-content" >
                  <div className="modal-header">
                    <h5 className="modal-title" style={{ paddingRight: '7.5rem' }}>Select Transaction Type</h5>
                    <button type="button" className="close" onClick={closePopup} style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}>
                      <span style={{ color: 'red' }}>&times;</span>
                    </button>
                  </div>
 
                  <div className="modal-body d-flex flex-row justify-content-center align-items-center radio-container">
                    <div className="form-check  ">
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
                    <div style={{ width: '20px' }}></div>
                    <button type="button" className="btn btn-success" onClick={handleConfirm} disabled={!selectedOption}>Confirm</button>
                  </div>
                </div>
              </div>
            </div> */}
          )}
 
          <div className="row justify-content-between mb-2">
            <div className="col-auto d-flex align-items-center">
              <label htmlFor="date" style={{ marginRight: '20px', marginLeft: '-20px' }}></label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="form-control mb-3"
                style={{ width: '150px' }}
              />
            </div>
            {/* <div className="col-auto text-right">
              <button onClick={openPopup} className="btn btn-sm btn-primary btn-add-ticket" style={{ padding: '0', width: '100px', height: '40px' }}>
                <strong>Add Ticket</strong> <FontAwesomeIcon icon={faPlus} style={{ marginLeft: '5px', fontWeight: 'bold' }} />
              </button>
            </div> */}
          </div>
          <div className='vehicle-table-responsive VehicleEntrytable '>
            <table className="vehicle-table table-bordered">
              <thead className="text-center">
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
                {vehicleEntryDetails.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.ticketNo}</td>
                    <td>{entry.vehicleNo}</td>
                    <td>{entry.vehicleIn}</td>
                    <td>{entry.vehicleOut}</td> {/* Assuming this is the correct field for Out Time/Date */}
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
      </div>
    </div>
  );
};
 
const TicketInputBox = ({ placeholder, width }) => {
  return (
    <td>
      <input
        className="form-control"
        type="text"
        placeholder={placeholder}
        style={{ width: width }}
      />
    </td>
  );
};
 
export default VehicleEntry;