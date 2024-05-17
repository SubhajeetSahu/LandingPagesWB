// HomePage6.jsx
import { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';
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
      title: 'Sale Order No',
      dataIndex: 'saleOrderNo',
      key: 'saleOrderNo',
      render: (text, record) => <Button onClick={() => handleRowClick(record)} style={{backgroundColor:"#88CCFA"}}>{text}</Button>,
    },
    {
      title: 'Purchase Order No',
      dataIndex: 'purchaseOrderNo',
      key: 'purchaseOrderNo',
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
    {
      title: 'Progressive Qty',
      dataIndex: 'progressiveQty',
      key: 'progressiveQty',
    },
    {
      title: 'Balance Qty',
      dataIndex: 'balanceQty',
      key: 'balanceQty',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type="primary" icon={<EyeOutlined />} onClick={() => handleViewClick(record.saleOrderNo)} />
      ),
    },
  ];

  const handleRowClick = (record) => {
    navigate('/ProcessOrder', { state: { saleOrderNo: record.saleOrderNo, productName: record.productName } });
  };

  const handleViewClick = (saleOrderNo) => {
    navigate(`/SalesDisplay?saleOrderNo=${saleOrderNo}`);
  };

  return (
    <SideBar6>
      <div className='home-page-6 container-fluid'>
        <h2 className="text-center">Sales Dashboard</h2>
        <div className="table-responsive">
          <Table dataSource={sales} columns={columns} rowKey="purchaseOrderNo" className="user-table mt-3 custom-table" />
        </div>
      </div>
    </SideBar6>
  );
};

export default HomePage6;