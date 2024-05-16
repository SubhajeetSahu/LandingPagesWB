import React, { useState, useEffect, useRef } from "react";
import "./transaction.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleXmark,
  faGreaterThan,
  faLessThan,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Chart, ArcElement } from "chart.js/auto";
// import Header from "../../../../Header/Header";
import SideBar5 from "../../../../SideBar/SideBar5";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

const OperatorTransaction = () => {
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  /* const [curPage, setCurPage] = useState(1);
  let totPage = 5; */
  const navigate = useNavigate();

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const closeForm = () => {
    navigate("/home");
  };
  const goToTransForm = (
    ticketNo,
    transactionType,
    grossWeight,
    tareWeight
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

  // const goToTransForm1 = () => {
  //   navigate("/OperatorTransactionFromOutbound");
  // };

  const handleQualityReportDownload = () => {
    // Implement download functionality here

    alert("Downloading quality report...");
  };

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const homeMainContentRef = useRef(null);
  const [weighments, setWeighments] = useState([]);
  const [ticket, setTicket] = useState(null);
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

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

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
      {/* <Header toggleSidebar={toggleSidebar} /> */}

      <div className="container-fluid">
        <div className="row">
          <h2 className="tr_dash1">Transaction Dashboard</h2>
          <div className="date">
            <input
              type="date"
              id="trDate"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="Date1"
              readOnly
            />
            <br />
            <br />
          </div>
        </div>
        {/* <div className="row mt-4">
          <div className="col-12">
            <h1 className="tr_dash1">Transaction Dashboard</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="trDate">Date:-</label>
            <input
              type="date"
              id="trDate"
              value="{currentDate}"
              className="form-control Date1"
              readOnly
            />
          </div>
        </div>  */}
        <div className="backend" >
          <div className="table-responsive" >
          <table className="table table-bordered">
            
            <thead className="text-center">
              <tr >
                <th>Ticket No.</th>
                <th>Transaction Type</th>
                {/* <th>Weightment No.</th> */}
                <th>Vehicle No.</th>
                {/* <th>In Time/ Date</th> */}
                <th>Transporter</th>
                <th>Supplier/ Customer</th>
                <th>Gross wt./ Time</th>
                <th>Tare wt./ Time</th>
                <th>Net wt./ Time</th>
                <th>Material/Product</th>
                {/* <th>Fitness Upto</th> */}

                {/* <th>Status</th> */}
                <th>Quality Report</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {weighments
                .slice(pagesVisited, pagesVisited + weighmentsPerPage)
                .map((weighment) => (
                  <tr key={weighment.id}>
                    <td>
                      <input
                        value={weighment.ticketNo}
                        style={{
                          justifyContent: "center",
                          textAlign: "center",
                          backgroundColor: "#89CFF0",
                          width: "80px",
                          cursor: "pointer",
                        }}
                        // className="form-control back"
                        className="input-celll"
                        onClick={() => {
                          goToTransForm(
                            weighment.ticketNo,
                            weighment.transactionType,
                            weighment.grossWeight,
                            weighment.tareWeight
                          );
                        }}
                      />
                    </td>
                    <td>
                      <input
                        value={weighment.transactionType}
                        style={{ width: "90px" }}
                        className="input-celll"
                      />
                    </td>
                    {/* <td>
                      <input
                        value={weighment.weighmentNo}
                        style={{ width: "90px" }}
                        className="input-celll"
                      />
                    </td> */}
                    <td>
                      <input
                        value={weighment.vehicleNo}
                        style={{ width: "90px" }}
                        className="input-celll"
                      />
                    </td>
                    {/* <td>
                      <input
                        value={weighment.inTime}
                        style={{ width: "90px" }}
                        className="input-celll"
                      />
                    </td> */}
                    <td>
                      <input
                        value={weighment.transporterName}
                        style={{ width: "150px" }}
                        className="input-celll"
                      />
                    </td>
                    <td>
                      <input
                        value={weighment.supplierName}
                        style={{ width: "90px" }}
                        className="input-celll"
                      />
                    </td>
                    <td>
                      <input
                        value={weighment.grossWeight}
                        style={{ width: "90px" }}
                        className="input-celll"
                      />
                    </td>
                    <td>
                      <input
                        value={weighment.tareWeight}
                        style={{ width: "90px" }}
                        className="input-celll"
                      />
                    </td>
                    <td>
                      <input
                        value={weighment.netWeight}
                        style={{ width: "90px" }}
                        className="input-celll"
                      />
                    </td>
                    <td>
                      <input
                        value={weighment.materialName}
                        style={{ width: "90px" }}
                        className="input-celll"
                      />
                    </td>
                    {/* <td>
                      <input
                        value={weighment.vehicleFitnessUpTo}
                        style={{ width: "90px" }}
                        className="input-celll"
                      />
                    </td> */}

                    {/* <td>
                      <input
                        value={weighment.status}
                        style={{ width: "90px" }}
                        className="input-celll"
                      />
                    </td> */}
                    <td className="icon-celll">
                      <FontAwesomeIcon
                        icon={faDownload}
                        onClick={handleQualityReportDownload}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
        </div>
        <br />
        </div>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBtns"}
          previousLinkClassName={"previousBtn"}
          nextLinkClassName={"nextBtn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          pageLinkClassName={"paginationLink"}
        />
     
    </SideBar5>
  );
};

export default OperatorTransaction;
