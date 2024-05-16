import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SideBar3 from "../../../../SideBar/SideBar3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileWord } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Tag, Button, Input } from "antd";

function QualityCheck() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;
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
          const formattedData = data.map((item) => ({
            ticketNo: item.ticketNo,
            date: item.date,
            vehicleNo: item.vehicleNo,
            in: item.in,
            out: item.out,
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
              in: data.in,
              out: data.out,
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

  const handleDownload = (ticketNumber) => {
    const item = data.find((item) => item.ticketNo === ticketNumber);

    if (!item) {
      console.error("Ticket not found. Unable to generate the document.");
      return;
    }

    const content = `
    <div> <h1> Pdf here </h1></div>
        `;
    const blob = new Blob([content], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quality_data_${ticketNumber}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTicketClick = (ticketNumber, productMaterial) => {
    if (productMaterial === "Coal") {
      const item = data.find((item) => item.ticketNo === ticketNumber);
      if (item) {
        const { moisture, vm, ash, fc, ...queryParams } = item;
        const queryString = new URLSearchParams(queryParams).toString();
        navigate("/QualityInboundCoalDetails?" + queryString);
      }
    } else if (productMaterial === "Iron Ore") {
      const item = data.find((item) => item.ticketNo === ticketNumber);
      if (item) {
        const queryString = new URLSearchParams(item).toString();
        navigate("/QualityInboundIronOreDetails?" + queryString);
      }
    } else if (productMaterial === "Sponge Iron") {
      const item = data.find((item) => item.ticketNo === ticketNumber);
      if (item) {
        const queryString = new URLSearchParams(item).toString();
        navigate("/QualityOutboundSpongeIronDetails?" + queryString);
      }
    }
  };

  const pageCount = Math.ceil(data.length / itemsPerPage) || 1;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <SideBar3>
      <div style={{ fontFamily: "Arial", color: "#333", "--table-border-radius": "30px" }}>
        <div className="container-fluid mt-0">
          <div className="mb-3 text-center">
            <h2 style={{ fontFamily: "Arial", marginBottom: "0px !important" }}>
              Quality Dashboard
            </h2>
            <input
              type="date"
              id="date"
              name="date"
              className="form-control form-control-sm"
              style={{ width: "auto" }}
              value={currentDate}
              disabled // Disable user input
            />
          </div>

          <div className=" table-responsive" style={{ borderRadius: "10px" }}>
            <div >
              <table className=" ant-table table table-striped"
              >

                <thead className="ant-table-thead" >
                  <tr className="ant-table-row">
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Ticket No.</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Date</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Vehicle No.</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>In</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Out</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Transporter Name</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Product/Material</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Product/Material Type</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Supplier/Customer</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Supplier/Customer Address</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6", borderRight: "1px solid white" }}>Transaction Type</th>
                    <th className="ant-table-cell" style={{ whiteSpace: "nowrap", color: "white", backgroundColor: "#0077b6" }}>Download</th>
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
                            style={{background: "#88CCFA",}}
                          >
                            {item.ticketNo}
                          </Button>


                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item.date}
                        </td>
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
                          {item.in}
                        </td>
                        <td
                          className="ant-table-cell"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item.out}
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
                        <td className="ant-table-cell">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleDownload(item.ticketNo)}
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
    color: '#0077B6',
    borderColor: '#0077B6',
    marginRight: '2px',
  }}
  onClick={() => setCurrentPage(Math.max(0, currentPage - 5))}
  disabled={currentPage === 0}
>
  &lt;&lt;
</button>
<button
  className="btn btn-outline-primary btn-sm me-2"
  style={{
    color: '#0077B6',
    borderColor: '#0077B6',
    marginRight: '2px',
  }}
  onClick={() => setCurrentPage(currentPage - 1)}
  disabled={currentPage === 0}
>
  &lt;
</button>
{Array.from(Array(Math.min(pageCount, 3)), (_, index) => (
  <button
    key={index}
    className={`btn btn-outline-primary btn-sm me-2 ${currentPage === index ? 'active' : ''}`}
    style={{
      color: currentPage === index ? '#fff' : '#0077B6',
      backgroundColor: currentPage === index ? '#0077B6' : 'transparent',
      borderColor: '#0077B6',
      marginRight: '2px',
    }}
    onClick={() => setCurrentPage(index)}
  >
    {index + 1}
  </button>
))}
{currentPage + 3 < pageCount && <span>...</span>}
<button
  className={`btn btn-outline-primary btn-sm me-2 ${currentPage === pageCount - 1 ? 'active' : ''}`}
  style={{
    color: currentPage === pageCount - 1 ? '#fff' : '#0077B6',
    backgroundColor: currentPage === pageCount - 1 ? '#0077B6' : 'transparent',
    borderColor: '#0077B6',
    marginRight: '2px',
  }}
  onClick={() => setCurrentPage(pageCount - 1)}
>
  {pageCount}
</button>
<button
  className="btn btn-outline-primary btn-sm me-2"
  style={{
    color: '#0077B6',
    borderColor: '#0077B6',
    marginRight: '2px',
  }}
  onClick={() => setCurrentPage(currentPage + 1)}
  disabled={currentPage === pageCount - 1}
>
  &gt;
</button>
<button
  className="btn btn-outline-primary btn-sm"
  style={{
    color: '#0077B6',
    borderColor: '#0077B6',
    marginRight: '2px',
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