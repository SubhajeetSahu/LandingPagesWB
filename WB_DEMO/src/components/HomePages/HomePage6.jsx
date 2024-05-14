import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import SideBar6 from '../SideBar/Sidebar6';
import './HomePage6.css';

const HomePage6 = () => {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/sales/getAll/sales')
      .then(response => response.json())
      .then(data => setSales(data))
      .catch(error => console.error('Error fetching sales:', error));
  }, []);

  const columns = [
    {
      title: 'Purchase Order No',
      dataIndex: 'purchaseOrderNo',
      key: 'purchaseOrderNo',
      render: (text, record) => <a onClick={() => handleRowClick(record)}>{text}</a>,
    },
    {
      title: 'Sale Order No',
      dataIndex: 'saleOrderNo',
      key: 'saleOrderNo',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Broker Name',
      dataIndex: 'brokerName',
      key: 'brokerName',
    },
    {
      title: 'Ordered Qty',
      dataIndex: 'orderedQty',
      key: 'orderedQty',
    },
  ];

  const handleRowClick = (record) => {
    navigate('/ProcessOrder', { state: { purchaseOrderNo: record.purchaseOrderNo, productName: record.productName } });
  };

  return (
    <SideBar6>
      <div className='home-page-6'>
        <h2 className="text-center">Sales Dashboard</h2>
        <div>
          <Table dataSource={sales} columns={columns} rowKey="purchaseOrderNo" />
        </div>
      </div>
    </SideBar6>
  );
};

export default HomePage6;