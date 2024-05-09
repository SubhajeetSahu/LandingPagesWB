// QualityCheck.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SideBar3 from "../../../../SideBar/SideBar3";
import "./QualityCheck.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileWord } from "@fortawesome/free-solid-svg-icons";

function QualityCheck() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const homeMainContentRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable body scroll
    return () => {
      document.body.style.overflow = ""; // Re-enable body scroll
    };
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (homeMainContentRef.current) {
        // Adjust resizing logic if needed
      }
    });

    if (homeMainContentRef.current) {
      resizeObserver.observe(homeMainContentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
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
      const response = await fetch(`http://localhost:8080/api/v1/qualities/getAllTransaction`, {
        credentials: 'include' // Include credentials with the request
      });
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
            materialOrProduct: item.materialOrProduct,
            materialTypeOrProductType: item.materialTypeOrProductType,
            tpNo: item.tpNo,
            poNo: item.poNo,
            challanNo: item.challanNo,
            supplierOrCustomerName: item.supplierOrCustomerName,
            supplierOrCustomerAddress: item.supplierOrCustomerAddress,
            transactionType: item.transactionType
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
              materialOrProduct: data.materialOrProduct,
              materialTypeOrProductType: data.materialTypeOrProductType,
              tpNo: data.tpNo,
              poNo: data.poNo,
              challanNo: data.challanNo,
              supplierOrCustomerName: data.supplierOrCustomerName,
              supplierOrCustomerAddress: data.supplierOrCustomerAddress,
              transactionType: data.transactionType
            },
          ];
          setData(formattedData);
        }
      } else {
        console.error('Error fetching data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


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
      materialOrProduct,
      materialTypeOrProductType,
      transactionType,
      "Moisture %": moisture,
      "Vm %": vm,
      "Ash %": ash,
      "Fc %": fc,
    } = item;

    const content = `
      <div style="font-family: Calibri; text-align: center;">
        <p style="margin: 0; font-weight: bold; font-size: 16pt;">Vikram Private Limited</p>
        <p style="margin: 0; font-size: 11pt;">Bad Tumkela, Rajamunda</p>
        <p style="margin: 0; font-size: 11pt;">Sundargarh- 770050</p>
        <p style="margin: 0; font-size: 11pt;">GSTIN- 21AABCV4695C1ZI</p>
      </div>
 
      <p style="text-align: center; margin-top: 10px; margin-bottom: 10px; font-size: 14pt;">***********************************************************************</p>
 
      <div style="text-align: left;">
        <p style="font-family: Calibri; font-weight: bold; text-decoration: underline; margin-bottom: 5px;">${materialOrProduct} Test Report</p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">Dtd: -</span>
          <span style="font-weight: lighter;">${date}</span>
        </p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">Supplier/customer:</span>
          <span style="font-weight: lighter;">${supplierOrCustomerName}</span>
        </p>
        <p style="font-family: Calibri; font-weight: lighter; margin: 0;">${supplierOrCustomerAddress}</p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">Vehicle No: -</span>
          <span style="font-weight: lighter;">${vehicleNo}</span>
        </p>
        <p style="font-family: Calibri; font-weight: normal; margin: 0;">Name of Product : ${materialOrProduct} (<strong>${materialTypeOrProductType}</strong>)</p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">Ticket No.:</span>
          <span style="font-weight: lighter;">${ticketNo}</span>
        </p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">Transporter:</span>
          <span style="font-weight: lighter;">${transporterName}</span>
        </p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">TP No/Invoice No:</span>
          <span style="font-weight: lighter;">${tpNo}</span>
        </p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">Po No:</span>
          <span style="font-weight: lighter;">${poNo}</span>
        </p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">Challan No:</span>
          <span style="font-weight: lighter;">${challanNo}</span>
        </p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">Supplier/customer:</span>
          <span style="font-weight: lighter;">${supplierOrCustomerName}</span>
        </p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">Supplier/customer Address:</span>
          <span style="font-weight: lighter;">${supplierOrCustomerAddress}</span>
        </p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">Transaction Type:</span>
          <span style="font-weight: lighter;">${transactionType}</span>
        </p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">Moisture %:</span>
          <span style="font-weight: lighter;">${moisture}</span>
        </p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">Vm %:</span>
          <span style="font-weight: lighter;">${vm}</span>
        </p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">Ash %:</span>
          <span style="font-weight: lighter;">${ash}</span>
        </p>
        <p style="font-family: Calibri; margin: 0;">
          <span style="font-weight: normal;">Fc %:</span>
          <span style="font-weight: lighter;">${fc}</span>
        </p>
        <br>
      </div>
      <div style="text-align: left;">
        <p style="font-family: Calibri; font-weight: bold; margin: 40px 0 0 0;">Chief Chemist</p>
        <p style="font-family: Calibri; font-weight: bold; margin: 0;">For Vikram Private Limited</p>
        <br/><br/><br/><br/><br/>
        <p style="font-family: Calibri; font-weight: bold; margin: 0;">Authorised Signatory</p>
      </div>
    `;

    const blob = new Blob([content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
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
        navigate(`/QualityInboundCoalDetails?${queryString}`);
      }
    } else if (productMaterial === "Iron Ore") {
      const item = data.find((item) => item.ticketNo === ticketNumber);
      if (item) {
        const queryString = new URLSearchParams(item).toString();
        navigate(`/QualityInboundIronOreDetails?${queryString}`);
      }
    } else if (productMaterial === "Sponge Iron") {
      navigate(`/QualityOutboundSpongeIronDetails?ticketNumber=${ticketNumber}`);
    }
  };

  const pageCount = Math.ceil(data.length / itemsPerPage) || 1;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <SideBar3
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div className="qc-quality-check-main-content">
        <div className="qc-quality-check-date d-flex justify-content-between align-items-center">
          <input
            type="date"
            id="date"
            name="date"
            className="form-control w-auto"
          />
          <h2 className="qc-quality-check-header">Quality Dashboard</h2>
        </div>

        <div className="qc-quality-check-table-container">
          <div className="qc-quality-check-table table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl mt-3">
            <table className="table table-bordered table-striped">
              <thead className="qc-quality-check-table-header">
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
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <a
                        href="#"
                        onClick={() => handleTicketClick(item.ticketNo, item.materialOrProduct)}
                      >
                        {item.ticketNo}
                      </a>
                    </td>
                    <td>{item.date}</td>
                    <td>{item.vehicleNo}</td>
                    <td>{item.in}</td>
                    <td>{item.out}</td>
                    <td>{item.transporterName}</td>
                    <td>{item.materialOrProduct}</td>
                    <td>{item.materialTypeOrProductType}</td>
                    <td>{item.tpNo}</td>
                    <td>{item.poNo}</td>
                    <td>{item.challanNo}</td>
                    <td>{item.supplierOrCustomerName}</td>
                    <td>{item.supplierOrCustomerAddress}</td>
                    <td>{item.transactionType}</td>
                    <td>
                      <button
                        className="qc-quality-btn qc-download-btn"
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
        </div>
        {/* Pagination */}
        <div className="qc-quality-check-pagination-container">
          <span className="qc-pagination-text">
            Showing {currentPage * itemsPerPage + 1} to{" "}
            {Math.min((currentPage + 1) * itemsPerPage, data.length)} of{" "}
            {data.length} entries
          </span>
          <div className="qc-pagination-buttons">
            <button onClick={() => setCurrentPage(Math.max(0, currentPage - 5))}>
              &lt;&lt;
            </button>
            <button onClick={() => setCurrentPage(currentPage - 1)}>&lt;</button>
            {[...Array(pageCount)].map((_, index) => (
              <button
                key={index}
                className={currentPage === index ? "active" : ""}
                onClick={() => setCurrentPage(index)}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(currentPage + 1)}>&gt;</button>
            <button onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 5))}>
              &gt;&gt;
            </button>         </div>
        </div>
      </div>
    </div>
  );
}

export default QualityCheck;