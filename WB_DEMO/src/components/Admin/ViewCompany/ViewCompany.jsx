import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import SideBar from "../../SideBar/SideBar";
import './ViewCompany.css';

const ViewCompany = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/company')
      .then(response => response.json())
      .then(data => setCompanies(data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  const columns = [
    {
      title: 'Company ID',
      dataIndex: 'companyId',
      key: 'companyId',
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Company Email',
      dataIndex: 'companyEmail',
      key: 'companyEmail',
    },
    {
      title: 'Company Contact No',
      dataIndex: 'companyContactNo',
      key: 'companyContactNo',
    },
    {
      title: 'Company Address',
      dataIndex: 'companyAddress',
      key: 'companyAddress',
    },
  ];

  return (
    <SideBar>
    <div className='view-company-page container-fluid'>
    <h2 className="text-center">View Company</h2>
    <div className="table-responsive">
      <Table dataSource={companies} columns={columns} rowKey="companyId" 
      className="user-table mt-3 custom-table"/>
    </div>
    </div>
    </SideBar>
  );
};

export default ViewCompany;