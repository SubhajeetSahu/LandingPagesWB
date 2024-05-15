
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import SideBar from "../../SideBar/SideBar";
import './ViewVehicle.css';

const ViewVehicle = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/vehicles')
      .then(response => response.json())
      .then(data => setVehicles(data))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  const columns = [
    {
      title: 'Vehicle Number',
      dataIndex: 'vehicleNo',
      key: 'vehicleNo',
    },
    {
      title: 'Transporter',
      dataIndex: 'transporter',
      key: 'transporter',
      render: transporter => (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {transporter.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'vehicleType',
      key: 'vehicleType',
    },
    {
      title: 'Vehicle Manufacturer',
      dataIndex: 'vehicleManufacturer',
      key: 'vehicleManufacturer',
    },
    {
      title: 'Fitness Up to',
      dataIndex: 'fitnessUpto',
      key: 'fitnessUpto',
    },
  ];

  return (
    <SideBar>
      <div className='view-vehicle-page'>
        <h2 className="text-center">View Vehicles</h2>
        <div>
          <Table dataSource={vehicles} columns={columns} rowKey="vehicleNo" 
          className="user-table mt-3 custom-table"/>
        </div>
      </div>
    </SideBar>
  );
};

export default ViewVehicle;
