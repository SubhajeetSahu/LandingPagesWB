import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SideBar3 from "../../../../SideBar/SideBar3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faSearch } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from 'styled-components';
// import { Button } from "react-bootstrap";
import { Input, InputNumber, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Button, Dropdown, Menu } from 'antd';
import { FilterOutlined } from '@ant-design/icons';


const StyledTable = styled.table`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const handleFilter = () => {
  // Implement your filter logic here
  console.log('Filtering...');
};
const menu = (
  <Menu>
    <Menu.Item key="1">Transport Name</Menu.Item>
    <Menu.Item key="2">Product/Material</Menu.Item>
    <Menu.Item key="3">Product/Material Type</Menu.Item>
    <Menu.Item key="4">Supplier/Customer</Menu.Item>
    <Menu.Item key="5">Supplier/Customer Address</Menu.Item>
    <Menu.Item key="6">Transaction Type</Menu.Item>
  </Menu>
);



function QualityCheck() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Set default to 6
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(moment());
  const navigate = useNavigate();

  const homeMainContentRef = useRef(null);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
    // Here you would add logic to show the entries based on the selected date
    console.log('Selected date:', dateString);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable body scroll
    return () => {
      document.body.style.overflow = ""; // Re-enable body scroll
    };
  }, []);

  const handlehome = () => {
    navigate("/home");
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/qualities/getAllTransaction`,
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const formattedData = data.map((item) => ({
            ticketNo: item.ticketNo,
            date: item.date,
            vehicleNo: item.vehicleNo,
            transporterName: item.transporterName,
            materialName: item.materialName,
            materialType: item.materialType,
            tpNo: item.tpNo,
            poNo: item.poNo,
            challanNo: item.challanNo,
            supplierOrCustomerName: item.supplierOrCustomerName,
            supplierOrCustomerAddress: item.supplierOrCustomerAddress,
            transactionType: item.transactionType,
          }));
          setData(formattedData);
        } else {
          // Handling for single object response
          const formattedData = [
            {
              ticketNo: data.ticketNo,
              date: data.date,
              vehicleNo: data.vehicleNo,
              transporterName: data.transporterName,
              materialName: data.materialName,
              materialType: data.materialType,
              tpNo: data.tpNo,
              poNo: data.poNo,
              challanNo: data.challanNo,
              supplierOrCustomerName: data.supplierOrCustomerName,
              supplierOrCustomerAddress: data.supplierOrCustomerAddress,
              transactionType: data.transactionType,
            },
          ];
          setData(formattedData);
        }
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setCurrentDate(formattedDate);
  }, []);

  const handleTicketClick = (ticketNumber, productMaterial) => {
    if (productMaterial === "Coal") {
      const item = data.find((item) => item.ticketNo === ticketNumber);
      if (item) {
        const { moisture, vm, ash, fc, ...queryParams } = item;
        const queryString = new URLSearchParams(queryParams).toString();
        navigate("/QualityInboundDetails?" + queryString);
      }
    } else if (productMaterial === "Iron Ore") {
      const item = data.find((item) => item.ticketNo === ticketNumber);
      if (item) {
        const queryString = new URLSearchParams(item).toString();
        navigate("/QualityInboundDetails?" + queryString);
      }
    } else if (productMaterial === "Sponge Iron") {
      const item = data.find((item) => item.ticketNo === ticketNumber);
      if (item) {
        const queryString = new URLSearchParams(item).toString();
        navigate("/QualityOutboundDetails?" + queryString);
      }
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0); // Reset to the first page when searching
  };

  const filteredData = data.filter(
    (item) => {
      const ticketNo = item.ticketNo ? String(item.ticketNo).toLowerCase() : '';
      const vehicleNo = item.vehicleNo ? String(item.vehicleNo).toLowerCase() : '';
      const supplierName = item.supplierOrCustomerName ? String(item.supplierOrCustomerName).toLowerCase() : '';
      const supplierAddress = item.supplierOrCustomerAddress ? String(item.supplierOrCustomerAddress).toLowerCase() : '';

      return (
        ticketNo.includes(searchQuery.toLowerCase()) ||
        vehicleNo.includes(searchQuery.toLowerCase()) ||
        supplierName.includes(searchQuery.toLowerCase()) ||
        supplierAddress.includes(searchQuery.toLowerCase())
      );
    }
  );


  const pageCount = Math.ceil(filteredData.length / itemsPerPage) || 1;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <SideBar3>
        <div style={{ fontFamily: "Arial", color: "#333", "--table-border-radius": "30px" }}>
        <div className="container-fluid mt-0">
        <div className="d-flex justify-content-between align-items-center" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
  <div style={{ flex: "1" }}>
    <DatePicker
      value={selectedDate}
      onChange={handleDateChange}
      style={{ borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
    />
  </div>
  <div style={{ flex: "1", textAlign: "center" }}>
    <h2 style={{ fontFamily: "Arial", marginBottom: "0px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}>
      Quality Dashboard
    </h2>
  </div>
  <div style={{ flex: "1" }}></div> {/* To balance the layout */}
</div>


<div className="d-flex justify-content-center mb-3">
  <div className="d-flex align-items-center">
    Show&nbsp;
    <InputNumber
      min={1}
      value={itemsPerPage}
      onChange={(value) => setItemsPerPage(value)}
      style={{
        width: "60px",
        marginRight: "5px",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
      }}
    />&nbsp;entries&nbsp;
  </div>
  <div className="d-flex align-items-center" style={{ marginLeft: "auto", marginRight: "auto" }}>
    <Input
      placeholder="Search by Ticket No, Vehicle No, Supplier, or Address"
      value={searchQuery}
      onChange={(e) => handleSearch(e.target.value)}
      style={{ width: "500px" }}
      prefix={<SearchOutlined />}
    />
  </div>
  <div>
    <Dropdown overlay={menu}>
      <Button icon={<FilterOutlined />} onClick={handleFilter}>
        Filter
      </Button>
    </Dropdown>
  </div>
</div>


          <div className="table-responsive" style={{ overflowX: "auto", maxWidth: "100%", borderRadius: "10px", maxHeight: "500px" }}>
            <div style={{ maxHeight: "394px", overflowY: "auto" }}>
              <StyledTable className="ant-table table table-striped" style={{ marginBottom: 0 }}>
                <thead className="ant-table-thead">
                  <tr className="ant-table-row">
                    <th
                      className="ant-table-cell"
                      style={{
                        whiteSpace: "nowrap",
                        color: "white",
                        backgroundColor: "#0077b6",
                        borderRight: "1px solid white",
                      }}
                    >
                      Ticket No
                    </th>
                    <th
                      className="ant-table-cell"
                      style={{
                        whiteSpace: "nowrap",
                        color: "white",
                        backgroundColor: "#0077b6",
                        borderRight: "1px solid white",
                      }}
                    >
                      Vehicle No
                    </th>
                    <th
                      className="ant-table-cell"
                      style={{
                        whiteSpace: "nowrap",
                        color: "white",
                        backgroundColor: "#0077b6",
                        borderRight: "1px solid white",
                      }}
                    >
                      Transporter Name
                    </th>
                    <th
                      className="ant-table-cell"
                      style={{
                        whiteSpace: "nowrap",
                        color: "white",
                        backgroundColor: "#0077b6",
                        borderRight: "1px solid white",
                      }}
                    >
                      Product/Material
                    </th>
                    <th
                      className="ant-table-cell"
                      style={{
                        whiteSpace: "nowrap",
                        color: "white",
                        backgroundColor: "#0077b6",
                        borderRight: "1px solid white",
                      }}
                    >
                      Product/MaterialType
                    </th>
                    <th
                      className="ant-table-cell"
                      style={{
                        whiteSpace: "nowrap",
                        color: "white",
                        backgroundColor: "#0077b6",
                        borderRight: "1px solid white",
                      }}
                    >
                      Supplier/Customer
                    </th>
                    <th
                      className="ant-table-cell"
                      style={{
                        whiteSpace: "nowrap",
                        color: "white",
                        backgroundColor: "#0077b6",
                        borderRight: "1px solid white",
                      }}
                    >
                      Supplier/CustomerAddress
                    </th>
                    <th
                      className="ant-table-cell"
                      style={{
                        whiteSpace: "nowrap",
                        color: "white",
                        backgroundColor: "#0077b6",
                        borderRight: "1px solid white",
                      }}
                    >
                      Transaction Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData
                    .slice(
                      currentPage * itemsPerPage,
                      (currentPage + 1) * itemsPerPage
                    )
                    .map((item, index) => (
                      <tr key={index}>
                        <td className="ant-table-cell">
                          <Button
                            onClick={() =>
                              handleTicketClick(item.ticketNo, item.materialName)
                            }
                            style={{
                              background: "#88CCFA",
                              minWidth: "70px",
                              width: `${Math.max(80, item.ticketNo.length * 10)}px`,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item.ticketNo}
                          </Button>
                        </td>
                        <td className="ant-table-cell" style={{ whiteSpace: "nowrap" }}>
                          {item.vehicleNo}
                        </td>
                        <td className="ant-table-cell" style={{ whiteSpace: "nowrap" }}>
                          {item.transporterName}
                        </td>
                        <td className="ant-table-cell" style={{ whiteSpace: "nowrap" }}>
                          {item.materialName}
                        </td>
                        <td className="ant-table-cell" style={{ whiteSpace: "nowrap" }}>
                          {item.materialType}
                        </td>
                        <td className="ant-table-cell" style={{ whiteSpace: "nowrap" }}>
                          {item.supplierOrCustomerName}
                        </td>
                        <td className="ant-table-cell" style={{ whiteSpace: "nowrap" }}>
                          {item.supplierOrCustomerAddress}
                        </td>
                        <td className="ant-table-cell" style={{ whiteSpace: "nowrap" }}>
                          {item.transactionType}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </StyledTable>
            </div>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3 ml-2">
            <span>
              Showing {currentPage * itemsPerPage + 1} to{" "}
              {Math.min((currentPage + 1) * itemsPerPage, filteredData.length)} of{" "}
              {filteredData.length} entries
            </span>
            <div className="ml-auto">
              <button
                className="btn btn-outline-primary btn-sm me-2"
                style={{
                  color: "#0077B6",
                  borderColor: "#0077B6",
                  marginRight: "2px",
                }}
                onClick={() => setCurrentPage(Math.max(0, currentPage - 5))}
                disabled={currentPage === 0}
              >
                &lt;&lt;
              </button>
              <button
                className="btn btn-outline-primary btn-sm me-2"
                style={{
                  color: "#0077B6",
                  borderColor: "#0077B6",
                  marginRight: "2px",
                }}
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 0}
              >
                &lt;
              </button>

              {Array.from({ length: 3 }, (_, index) => {
                const pageNumber = currentPage + index;
                if (pageNumber >= pageCount) return null;
                return (
                  <button
                    key={pageNumber}
                    className={`btn btn-outline-primary btn-sm me-2 ${currentPage === pageNumber ? "active" : ""
                      }`}
                    style={{
                      color: currentPage === pageNumber ? "#fff" : "#0077B6",
                      backgroundColor: currentPage === pageNumber ? "#0077B6" : "transparent",
                      borderColor: "#0077B6",
                      marginRight: "2px",
                    }}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber + 1}
                  </button>
                );
              })}
              {currentPage + 3 < pageCount && <span>...</span>}
              {currentPage + 3 < pageCount && (
                <button
                  className={`btn btn-outline-primary btn-sm me-2 ${currentPage === pageCount - 1 ? "active" : ""
                    }`}
                  style={{
                    color: currentPage === pageCount - 1 ? "#fff" : "#0077B6",
                    backgroundColor: currentPage === pageCount - 1 ? "#0077B6" : "transparent",
                    borderColor: "#0077B6",
                    marginRight: "2px",
                  }}
                  onClick={() => setCurrentPage(pageCount - 1)}
                >
                  {pageCount}
                </button>
              )}
              <button
                className="btn btn-outline-primary btn-sm me-2"
                style={{
                  color: "#0077B6",
                  borderColor: "#0077B6",
                  marginRight: "2px",
                }}
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pageCount - 1}
              >
                &gt;
              </button>
              <button
                className="btn btn-outline-primary btn-sm"
                style={{
                  color: "#0077B6",
                  borderColor: "#0077B6",
                  marginRight: "2px",
                }}
                onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 5))}
                disabled={currentPage === pageCount - 1}
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </SideBar3>
  );
}
export default QualityCheck;