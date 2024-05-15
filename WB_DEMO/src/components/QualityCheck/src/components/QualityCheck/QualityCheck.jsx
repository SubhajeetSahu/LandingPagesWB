import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SideBar3 from "../../../../SideBar/SideBar3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileWord } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

function QualityCheck() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
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
    const formattedDate = today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);
  }, []);

  const handleDownload = (ticketNumber) => {
    const item = data.find((item) => item.ticketNo === ticketNumber);

    if (!item) {
      console.error("Ticket not found. Unable to generate the document.");
      return;
    }

    const {
      ticketNo,
      date,
      vehicleNo,
      transporterName,
      tpNo,
      poNo,
      challanNo,
      supplierOrCustomerName,
      supplierOrCustomerAddress,
      materialName,
      materialType,
      transactionType,
      "Moisture %": moisture,
      "Vm %": vm,
      "Ash %": ash,
      "Fc %": fc,
    } = item;

    const content = `
    <h>Pdf file here </h>
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
        navigate('/QualityInboundCoalDetails?' + queryString);
      }
    } else if (productMaterial === "Iron Ore") {
      const item = data.find((item) => item.ticketNo === ticketNumber);
      if (item) {
        const queryString = new URLSearchParams(item).toString();
        navigate('/QualityInboundIronOreDetails?' + queryString);
      }
    } else if (productMaterial === "Sponge Iron") {
      const item = data.find((item) => item.ticketNo === ticketNumber);
      if (item) {
        const queryString = new URLSearchParams(item).toString();
        navigate('/QualityOutboundSpongeIronDetails?' + queryString);
      }
    }
  };

  const pageCount = Math.ceil(data.length / itemsPerPage) || 1;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <SideBar3 />
      <div className="container mt-0">
        <div className="mb-3 text-center">
          <h2 className="text-dark">Quality Dashboard</h2>
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

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Ticket No.</th>
                <th>Date</th>
                <th>Vehicle No.</th>
                <th>In</th>
                <th>Out</th>
                <th>Transporter Name</th>
                <th>Product/Material</th>
                <th>Product/Material Type</th>
                <th>TP No/Invoice No</th>
                <th>Po No</th>
                <th>Challan No</th>
                <th>Supplier/Customer</th>
                <th>Supplier/Customer Address</th>
                <th>Transaction Type</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {data
                .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                .map((item, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        href="#"
                        onClick={() => handleTicketClick(item.ticketNo, item.materialName)}
                        className="text-primary"
                      >
                        {item.ticketNo}
                      </a>
                    </td>
                    <td>{item.date}</td>
                    <td>{item.vehicleNo}</td>
                    <td>{item.in}</td>
                    <td>{item.out}</td>
                    <td>{item.transporterName}</td>
                    <td>{item.materialName}</td>
                    <td>{item.materialType}</td>
                    <td>{item.tpNo}</td>
                    <td>{item.poNo}</td>
                    <td>{item.challanNo}</td>
                    <td>{item.supplierOrCustomerName}</td>
                    <td>{item.supplierOrCustomerAddress}</td>
                    <td>{item.transactionType}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleDownload(item.ticketNo)}
                      >
                        <FontAwesomeIcon icon={faFileWord} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3 ml-2">
          <span>
            Showing {currentPage * itemsPerPage + 1} to{" "}
            {Math.min((currentPage + 1) * itemsPerPage, data.length)} of {data.length} entries
          </span>
          <div className="ml-auto">
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() => setCurrentPage(Math.max(0, currentPage - 5))}
              disabled={currentPage === 0}
            >
              &lt;&lt;
            </button>
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              &lt;
            </button>
            {[...Array(pageCount)].map((_, index) => (
              <button
                key={index}
                className={`btn btn-${currentPage === index ? "primary" : "outline-primary"} btn-sm me-2`}
                onClick={() => setCurrentPage(index)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="btn btn-outline-primary btn-sm me-2"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageCount - 1}
            >
              &gt;
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 5))}
              disabled={currentPage === pageCount - 1}
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default QualityCheck;