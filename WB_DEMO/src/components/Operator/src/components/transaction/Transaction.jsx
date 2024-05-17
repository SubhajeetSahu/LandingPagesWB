import React, { useState, useEffect, useRef } from "react";
import "./transaction.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileWord } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Chart, ArcElement } from "chart.js/auto";
import SideBar5 from "../../../../SideBar/SideBar5";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Button } from "antd";
 
const OperatorTransaction = () => {
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const navigate = useNavigate();
 
  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
 
    return `${year}-${month}-${day}`;
  }
  const goToTransForm = (
    ticketNo,
    transactionType,
  ) => {
    if (transactionType === "Inbound") {
      navigate(
        `/OperatorTransactionFromInbound/?ticketNumber=${ticketNo}`
      );
    } else {
      navigate(
        `/OperatorTransactionFromOutbound/?ticketNumber=${ticketNo}`
      );
    }
  };
 
 
  const handleQualityReportDownload = () => {
 
    alert("Downloading quality report...");
  };
 
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const homeMainContentRef = useRef(null);
  const [weighments, setWeighments] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const weighmentsPerPage = 5;
  const pagesVisited = pageNumber * weighmentsPerPage;
  const { ticketNo } = useParams();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/weighment/get/{ticketNo}`
        );
        setTicket(response.data);
 
      } catch (error) {
        console.error("Error fetching ticket details:", error);
      }
    };
 
    fetchData();
  }, [ticketNo]);
 
  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:8080/api/v1/weighment/getAll", {
        withCredentials: true, // Include credentials
      })
      .then((response) => {
        // Update state with the fetched data
        setWeighments(response.data);
        console.log(weighments);
      })
      .catch((error) => {
        console.error("Error fetching weighments:", error);
      });
  }, []);
 
 
 
  useEffect(() => {
    Chart.register(ArcElement);
 
    const resizeObserver = new ResizeObserver(() => {
      if (
        homeMainContentRef.current &&
        chartRef.current?.chartInstance &&
        chartRef2.current?.chartInstance
      ) {
        chartRef.current.chartInstance.resize();
        chartRef2.current.chartInstance.resize();
      }
    });
 
    if (homeMainContentRef.current) {
      resizeObserver.observe(homeMainContentRef.current);
    }
 
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
 
  const pageCount = Math.ceil(weighments.length / weighmentsPerPage);
 
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
 
  return (
    <SideBar5>
      <div style={{ fontFamily: "Arial", color: "#333", "--table-border-radius": "30px" }}>
        <div className="container-fluid mt-0">
          <div className="mb-3 text-center">
            <h2 style={{ fontFamily: "Arial", marginBottom: "0px !important" }}>
              Transaction Dashboard
            </h2>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control form-control-sm"
              style={{ width: "auto" }}
              value={currentDate}
              disabled
            />
          </div>
 
          <div className=" table-responsive" style={{ borderRadius: "10px" }}>
            <div >
              <table className=" ant-table table table-striped"
              >
 
                <thead className="ant-table-thead" >
                  <tr className="ant-table-row">
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Ticket No.</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Transaction Type</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Vehicle No.</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>&nbsp;&nbsp;&nbsp;Transporter &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Supplier/Customer</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Gross Wt.</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Tare Wt.</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Net Wt.</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Material/Product</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Quality Report</th>
                  </tr>
                </thead>
                <tbody>
                  {weighments
                    .slice(pagesVisited, pagesVisited + weighmentsPerPage)
                    .map((weighment) => (
                      <tr key={weighment.id}>
                        <td className="ant-table-cell" style={{ textAlign: "center" }}>
                          <Button
 
                            onClick={() => {
                              goToTransForm(
                                weighment.ticketNo,
                                weighment.transactionType,
                                weighment.grossWeight,
                                weighment.tareWeight
                              );
                            }}
                            style={{ background: "#88CCFA" }}
                          >
                            {weighment.ticketNo}
                          </Button>
 
 
                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap", textAlign: "center" }}
                        >
                          {weighment.transactionType}
                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap", textAlign: "center" }}
                        >
                          {weighment.vehicleNo}
                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap", textAlign: "center" }}
                        >
                          {weighment.transporterName}
                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap", textAlign: "center" }}
                        >
                          {weighment.supplierName}
                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap", textAlign: "center" }}
                        >
                          {weighment.grossWeight.split('/')[0]}
                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap", textAlign: "center" }}
                        >
                          {weighment.tareWeight.split('/')[0]}
                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap", textAlign: "center" }}
                        >
                          {weighment.netWeight.split('/')[0]}
                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap", textAlign: "center" }}
                        >
                          {weighment.materialName}
                        </td>
 
 
                        <td className="ant-table-cell"
                          style={{ whiteSpace: "nowrap", textAlign: "center" }}>
                          <button
                            className="btn btn-success btn-sm"
                            style={{padding:"3px 6px"}}
                            onClick={handleQualityReportDownload}
                            disabled // add disabled attribute to disable the button
                          >
                            <FontAwesomeIcon icon={faFileWord} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <ReactPaginate
            previousLabel={"<<"}
            previousLabel1={"<"}

            nextLabel1={">"}
            nextLabel={">>"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBtns"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBtn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            pageLinkClassName={"paginationLink"}
          /> 



          
        </div>
      </div>
    </SideBar5>
  );
}
 
export default OperatorTransaction;
