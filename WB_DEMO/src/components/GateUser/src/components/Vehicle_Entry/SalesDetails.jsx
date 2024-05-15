import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar2 from "../../../../SideBar/SideBar2";
import "./SalesDetails.css";

const SalesDetails = ({ onConfirmTicket = () => { } }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [vehicleEntryDetails, setVehicleEntryDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(5);
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

    const handleVehicleClick = () => {
        // Navigate to VehicleEntry-Outbound page
        navigate('/VehicleEntry-Outbound');
    };

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = vehicleEntryDetails.slice(indexOfFirstEntry, indexOfLastEntry);

    return (
        <SideBar2>
            <div className="salesdetail-main">
                <div className="container-fluid">
                    <div className="container mx-auto px-4 py-8">
                        <h2 className="text-center mb-6"> Sales Details </h2>
                    </div>
                    <div className="container-fluid sales-table-container mx-auto px-4 py-8">
                        <div className="sales-table table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl mt-3 VehicleEntrytable ">
                            <table className="sales-table table-bordered table-striped" style={{ marginBottom: '10px', marginRight: '50px' }}>
                                <thead className="text-center">
                                    <tr>
                                        <th scope="col" style={{ width: '5%', padding: '5px', margin: '5px' }}>Vehicle No.</th>
                                        <th scope="col" style={{ width: '5%', padding: '5px', margin: '5px' }}>PO No.</th>
                                        <th scope="col" style={{ width: '20%', padding: '5px', margin: '5px' }}>PurchasePass No </th>
                                        <th scope="col" style={{ width: '20%', padding: '5px', margin: '5px' }}>Transporter Name </th>
                                        <th scope="col" style={{ width: '20%', padding: '5px', margin: '5px' }}>Customer Name </th>
                                        <th scope="col" style={{ width: '5%', padding: '5px', margin: '5px' }}>Product Name</th>
                                        <th scope="col" style={{ width: '5%', padding: '5px', margin: '5px' }}>Product Type</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {currentEntries.map((entry, index) => (
                                        <tr key={entry.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                            <td>
                                                {/* Use anchor tag for navigation */}
                                                <a href="/VehicleEntry-Outbound" onClick={handleVehicleClick}>{entry.vehicleNo}</a>
                                            </td>
                                            <td>{entry.poNo}</td>
                                            <td>{entry.purchasePassNo}</td>
                                            <td>{entry.transporter}</td>
                                            <td>{entry.customerName}</td>
                                            <td>{entry.productName}</td>
                                            <td>{entry.productType}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </SideBar2>
    );
};

export default SalesDetails;
