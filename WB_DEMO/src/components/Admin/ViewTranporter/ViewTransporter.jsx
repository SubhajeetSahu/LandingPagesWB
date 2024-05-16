import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import SideBar from "../../SideBar/SideBar";
import './ViewTransporter.css';

const ViewTransporter = () => {
  const [transporters, setTransporters] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/transporter/details')
      .then(response => response.json())
      .then(data => setTransporters(data))
      .catch(error => console.error('Error fetching transporters:', error));
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'transporterId',
      key: 'transporterId',
    },
    {
      title: 'Transporter Name',
      dataIndex: 'transporterName',
      key: 'transporterName',
    },
    {
      title: 'Email',
      dataIndex: 'transporterEmail',
      key: 'transporterEmail',
    },
    {
      title: 'Contact No',
      dataIndex: 'transporterContactNo',
      key: 'transporterContactNo',
    },
    {
      title: 'Address',
      dataIndex: 'transporterAddress',
      key: 'transporterAddress',
    },
  ];

  return (
    <SideBar>
      <div className='view-transporter-page container-fluid'>
        <h2 className="text-center">View Transporter</h2>
        <div className="table-responsive">
          <Table dataSource={transporters} columns={columns} rowKey="transporterId" 
          className="transporter-table mt-3 custom-table"/>
        </div>
      </div>
    </SideBar>
  );
};

export default ViewTransporter;
