import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import SideBar from "../../SideBar/SideBar";
import './ViewCustomer.css';

const ViewCustomer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/customers')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Email',
      dataIndex: 'customerEmail',
      key: 'customerEmail',
    },
    {
      title: 'Contact No',
      dataIndex: 'customerContactNo',
      key: 'customerContactNo',
    },
    {
      title: 'Address Line 1',
      dataIndex: 'customerAddressLine1',
      key: 'customerAddressLine1',
    },
    {
      title: 'Address Line 2',
      dataIndex: 'customerAddressLine2',
      key: 'customerAddressLine2',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'ZIP',
      dataIndex: 'zip',
      key: 'zip',
    },
  ];

  return (
    <SideBar>
      <div className='view-customer-page'>
        <h2 className="text-center">View Customer</h2>
        <div>
          <Table dataSource={customers} columns={columns} rowKey="customerId" />
        </div>
      </div>
    </SideBar>
  );
};

export default ViewCustomer;
