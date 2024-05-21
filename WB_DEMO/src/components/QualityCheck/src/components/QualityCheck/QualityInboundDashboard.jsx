import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SideBar3 from "../../../../SideBar/SideBar3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Tag, Button, Input } from "antd";
import styled from 'styled-components';

const StyledDateBox = styled.div`
  display: inline-block;
  padding: 6px 12px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledTable = styled.table`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
function QualityInboundDashboard() {
  const [currentPage, setCurrentPage] = useState(0);
  const [startPageNumber, setStartPageNumber] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();

  const homeMainContentRef = useRef(null);

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
          const filteredData = data.filter(item => item.transactionType === "Inbound");
          const formattedData = filteredData.map((item) => ({
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

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  };

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

  const pageCount = Math.ceil(data.length / itemsPerPage) || 1;

  const handlePageChange = ({ selected }) => {
    const newStartPage = Math.max(1, selected * 3 - 2);
    setCurrentPage(selected);
    setStartPageNumber(newStartPage);
  };

  return (
    <SideBar3>
      <div
        style={{
          fontFamily: "Arial",
          color: "#333",
          "--table-border-radius": "30px",
        }}
      >
         <div className="container-fluid mt-0">
  <div className="position-relative" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
    <StyledDateBox style={{ position: "absolute", left: 0 }}>
      {currentDate}
    </StyledDateBox>
    <h2 style={{ fontFamily: "Arial", marginBottom: "0px", textAlign: "center", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"  }}>
              Quality Inbound Dashboard
            </h2>
          </div>
          <div className="table-responsive" style={{ overflowX: "auto", maxWidth: "100%", borderRadius: "10px" }}>
            <div>
            <StyledTable className="ant-table table table-striped">
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
                      Ticket No.
                    </th>
                    {/* <th
                      className="ant-table-cell"
                      style={{
                        whiteSpace: "nowrap",
                        color: "white",
                        backgroundColor: "#0077b6",
                        borderRight: "1px solid white",
                      }}
                    >
                      Date
                    </th> */}
                    <th
                      className="ant-table-cell"
                      style={{
                        whiteSpace: "nowrap",
                        color: "white",
                        backgroundColor: "#0077b6",
                        borderRight: "1px solid white",
                      }}
                    >
                      Vehicle No.
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
                      Material
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
                      Material Type
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
                      Supplier
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
                      Supplier Address
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
                  {data
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
                              minWidth: "70px", // Adjust the minimum width as needed
                              width: `${Math.max(80, item.ticketNo.length * 10)}px`, // Adjust the multiplier as needed
                              whiteSpace: "nowrap", // Prevent text wrapping
                            }}
                          >
                            {item.ticketNo}
                          </Button>
                        </td>
                        {/* <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item.date}
                        </td> */}
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item.vehicleNo}
                        </td>

                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item.transporterName}
                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item.materialName}
                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item.materialType}
                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item.supplierOrCustomerName}
                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item.supplierOrCustomerAddress}
                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap" }}
                        >
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
              {Math.min((currentPage + 1) * itemsPerPage, data.length)} of{" "}
              {data.length} entries
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
                      backgroundColor:
                        currentPage === pageNumber ? "#0077B6" : "transparent",
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
                    backgroundColor:
                      currentPage === pageCount - 1 ? "#0077B6" : "transparent",
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

export default QualityInboundDashboard;
