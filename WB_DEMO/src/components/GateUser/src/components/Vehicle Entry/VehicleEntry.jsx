import React, { useState, useEffect } from 'react';
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

const VehicleEntry = ({ onConfirmTicket = () => {} }) => {
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

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = vehicleEntryDetails.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginateBackward = () => {
    setCurrentPage(currentPage - 1);
  };

  const paginateForward = () => {
    setCurrentPage(currentPage + 1);
  };

  const getSystemOutTime = () => {
    const currentTime = new Date().toLocaleTimeString();
    setSystemOutTime(currentTime);
  };

  const entriesCount = vehicleEntryDetails.length;
  const showingFrom = indexOfFirstEntry + 1;
  const showingTo = Math.min(indexOfLastEntry, entriesCount);

  return (
    <div>
      <Header />
      <FontAwesomeIcon icon={faPlus} />

      <SideBar2 />

      <div className="vehicleEntry-main-content">
        <div className="container mx-auto px-4 py-8" style={{ marginTop: '80px', marginLeft: '20px' }}>
          <h2 className="text-center mb-4"> Gate User Transaction Details </h2>
        </div>

        <div className="container mx-auto px-4 py-8" style={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px' }}>
          <div className='vehicle-table-responsive VehicleEntrytable '>
            <table className="vehicle-table table-bordered">
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
          <div className="row justify-content-between mb-2">
            <div className="col-auto">
              <p>Showing {showingFrom} to {showingTo} of {entriesCount} entries</p>
            </div>
            <div className="col-auto">
              <div className="pagination">
                <button onClick={paginateBackward} disabled={currentPage === 1}>{"<"}</button>
                <button onClick={paginateForward} disabled={indexOfLastEntry >= vehicleEntryDetails.length}>{">"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleEntry;
