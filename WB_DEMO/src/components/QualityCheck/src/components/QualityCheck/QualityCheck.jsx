//QualityCheck.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../../Header/Header";
import SideBar3 from "../../../../SideBar/SideBar3";
import "./QualityCheck.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileWord } from '@fortawesome/free-solid-svg-icons';

function QualityCheck() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const homeMainContentRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

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

  const [data, setData] = useState([
      {
        "Ticket No.": 1,
        Date: "2024-04-30",
        "Vehicle No.": "OD35F-3948",
        In: "11:16",
        Out: "12:20",
        "Transporter Name": "JEEN TRADE AND EXPORTS PRIVATE LTD",
        "Product/Material": "Coal",
        "Product/Material Type": "ROM -100MM",
        "TP No/Invoice No": "I22405984/75",
        "Po No": " ",
        "Challan No": "1310002441-5300030809",
        "Supplier/customer": "MCL Bhubaneswari",
        "Supplier/customer Address": "Talcher",
        "Transaction Type": "Inbound",
      },
      {
        "Ticket No.": 2,
        Date: "2024-04-30",
        "Vehicle No.": "HR38Z1951",
        In: "16:30",
        Out: "21:45",
        "Transporter Name": "MAA SHERAWALI TRANSPORT",
        "Product/Material": "Sponge Iron",
        "Product/Material Type": "LUMPS",
        "TP No/Invoice No": "VPL/23-24/S1304",
        "Po No": "97/3",
        "Challan No": " ",
        "Supplier/customer": "SAMRIDHI TRADES",
        "Supplier/customer Address": "MUZAFFARNAGAR",
        "Transaction Type": "Outbound",
      },
      {
        "Ticket No.": 3,
        Date: "2024-04-30",
        "Vehicle No.": "MH30Z1841",
        In: "15:45",
        Out: "20:18",
        "Transporter Name": "MAA SHERAWALI TRANSPORT",
        "Product/Material": "Iron Ore",
        "Product/Material Type": "Hematite",
        "TP No/Invoice No": "HSI/27-30/S12362",
        "Po No": " ",
        "Challan No": "1280003114-9600063102",
        "Supplier/customer": "JAGA TRADES",
        "Supplier/customer Address": "MAHANADI",
        "Transaction Type": "Inbound",
      },
    ]);

    const handleDateChange = (event) => {
      setSelectedDate(event.target.value);
      setCurrentPage(0);
    };
  
    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
  
    useEffect(() => {
      setSelectedDate(getCurrentDate());
    }, []);
  
    const filteredData = selectedDate
      ? data.filter((item) => item.Date === selectedDate)
      : data;

  const handleDownload = (ticketNumber) => {
    const item = data.find((item) => item["Ticket No."] === ticketNumber);
  
    if (!item) {
      console.error("Ticket not found. Unable to generate the document.");
      return;
    }
  
    const {
      Date: date,
      "Vehicle No.": vehicleNo,
      "Product/Material": productMaterial,
      "Product/Material Type": productMaterialType,
      "Supplier/customer": supplierCustomer,
      "Supplier/customer Address": supplierCustomerAddress,
      "TP No/Invoice No": tpInvoiceNo,
      "Po No": poNo,
      "Challan No": challanNo,
      "Transaction Type": transactionType,
    } = item;
  
    const content = `
    <div style="font-family: Calibri; font-weight: bold; text-align: center;">
    <p style="margin: 0;">Vikram Private Limited</p>
    <p style="margin: 0;">Bad Tumkela, Rajamunda</p>
    <p style="margin: 0;">Sundargarh- 770040</p>
    <p style="margin: 0;">GSTIN- 21AABCV4695C1ZI</p>
  </div>
  <p style="text-align:center;">*************************************************************</p>
  <div style="margin-left: 550px; text-align: justify;">
    <p style="font-family: Calibri; font-weight: bold; text-decoration: underline;">${productMaterial} Test Report</p>
    <div></div>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Dtd: -</span> <span style="font-weight: lighter;">${date}</span></p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Supplier/customer:</span> <span style="font-weight: lighter;">${supplierCustomer}</span></p>
    <p style="font-family: Calibri; font-weight: lighter;">${supplierCustomerAddress}</p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Vehicle No: -</span> <span style="font-weight: lighter;">${vehicleNo}</span></p>
    <p style="font-family: Calibri; font-weight: normal;">Name of Product : ${productMaterial} (<strong>${productMaterialType}</strong>)</p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Ticket No.:</span> <span style="font-weight: lighter;">${ticketNumber}</span></p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Date:</span> <span style="font-weight: lighter;">${date}</span></p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Vehicle No.:</span> <span style="font-weight: lighter;">${vehicleNo}</span></p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">In:</span> <span style="font-weight: lighter;">${item.In}</span></p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Out:</span> <span style="font-weight: lighter;">${item.Out}</span></p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Transporter Name:</span> <span style="font-weight: lighter;">${item["Transporter Name"]}</span></p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Product/Material:</span> <span style="font-weight: lighter;">${productMaterial}</span></p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Product/Material Type:</span> <span style="font-weight: lighter;">${productMaterialType}</span></p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">TP No/Invoice No:</span> <span style="font-weight: lighter;">${tpInvoiceNo}</span></p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Po No:</span> <span style="font-weight: lighter;">${poNo}</span></p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Challan No:</span> <span style="font-weight: lighter;">${challanNo}</span></p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Supplier/customer:</span> <span style="font-weight: lighter;">${supplierCustomer}</span></p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Supplier/customer Address:</span> <span style="font-weight: lighter;">${supplierCustomerAddress}</span></p>
    <p style="font-family: Calibri;"><span style="font-weight: normal;">Transaction Type:</span> <span style="font-weight: lighter;">${transactionType}</span></p>
    <br>
    <p style="font-family: Calibri; font-weight: bold;">Chief Chemist</p>
    <p style="font-family: Calibri; font-weight: bold;">For Vikram Private Limited</p>
    <p style="font-family: Calibri; font-weight: bold;">Authorised Signatory</p>
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
      navigate(`/QualityInboundCoalDetails?ticketNumber=${ticketNumber}`);
    } else if (productMaterial === "Iron Ore") {
      navigate(`/QualityInboundIronOreDetails?ticketNumber=${ticketNumber}`);
    } else if (productMaterial === "Sponge Iron") {
      navigate(`/QualityOutboundSpongeIronDetails?ticketNumber=${ticketNumber}`);
    }
  };

  const pageCount = Math.ceil(filteredData.length / itemsPerPage) || 1;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  
  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />

      <SideBar3
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div className="quality-check-main-content">
        <div className="quality-check-date d-flex">
          <input
            type="date"
            id="date"
            name="date"
            className="form-control w-auto"
            value={selectedDate}
            onChange={handleDateChange}
            max={getCurrentDate()}
            size="10"
          />
          <h2 className="quality-check-header">Quality Dashboard</h2>
        </div>

        <div className="quality-check-table-container " >
          <div className="quality-check-table table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl mt-3">
            <table className="table table-bordered table-striped">
              <thead className="quality-check-table-header">
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
        onClick={() => handleTicketClick(item["Ticket No."], item["Product/Material"])}
      >
        {item["Ticket No."]}
      </a>
    </td>
    <td>{item.Date}</td>
    <td>{item["Vehicle No."]}</td>
    <td>{item.In}</td>
    <td>{item.Out}</td>
    <td>{item["Transporter Name"]}</td>
    <td>{item["Product/Material"]}</td>
    <td>{item["Product/Material Type"]}</td>
    <td>{item["TP No/Invoice No"]}</td>
    <td>{item["Po No"]}</td>
    <td>{item["Challan No"]}</td>
    <td>{item["Supplier/customer"]}</td>
    <td>{item["Supplier/customer Address"]}</td>
    <td>{item["Transaction Type"]}</td>
    <td>
      <button
        className="btn btn-success download-btn"
        onClick={() => handleDownload(item["Ticket No."])}
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
        <div className="quality-check-pagination-container">
            <span className="pagination-text">Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage, data.length)} of {data.length} entries</span>
              <div className="pagination-buttons">
                  <button onClick={() => setCurrentPage(Math.max(0, currentPage - 5))}>&lt;&lt;</button>
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
                    <button onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 5))}>&gt;&gt;</button>
                  </div>
                                </div>

      </div>
    </div>
  );
}

export default QualityCheck;
