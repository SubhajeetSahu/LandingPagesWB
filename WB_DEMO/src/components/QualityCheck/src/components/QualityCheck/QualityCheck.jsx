//QualityCheck.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../../Header/Header";
import SideBar3 from "../../../../SideBar/SideBar3";
import "./QualityCheck.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileWord } from "@fortawesome/free-solid-svg-icons";

function QualityCheck() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [selectedDate, setSelectedDate] = useState("");
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

  const [data, setData] = useState([
    {
      "Ticket No.": 1,
      Date: "2024-05-03",
      "Vehicle No.": "OD35F-3948",
      In: "11:16",
      Out: "12:20",
      "Transporter Name": "JEEN TRADE AND EXPORTS PRIVATE LTD",
      "Product/Material": "Coal",
      "Product/Material Type": "ROM -100MM",
      "TP No/Invoice No": "I22405984/75",
      "Po No": " ",
      "Challan No": "1310003441-5030003809",
      "Supplier/customer": "MCL Bhubaneswari",
      "Supplier/customer Address": "Talcher",
      "Transaction Type": "Inbound",
    },
    // ... (rest of the data remains the same)
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

    const handleSave = () => {
      const queryString = new URLSearchParams({
        date: formData.date,
        inTime: formData.inTime,
        vehicleNumber: formData.vehicleNumber,
        transporter: formData.transporter,
        ticketNo: formData.ticketNo,
        tpNo: formData.tpNo,
        poNo: formData.poNo,
        challanNo: formData.challanNo,
        supplier: formData.supplier,
        supplierAddress: formData.supplierAddress,
        material: formData.material,
        materialType: formData.materialType,
        transactionType: formData.transactionType,
        moisture: formData.moisture,
        vm: formData.vm,
        ash: formData.ash,
        fc: formData.fc,
      }).toString();
    
      navigate(`/QualityCheck?${queryString}`);
    };

  

  // Get the query parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);

  // Extract the relevant data from the query parameters
  const urlData = {
    date: urlParams.get("date"),
    inTime: urlParams.get("inTime"),
    vehicleNumber: urlParams.get("vehicleNumber"),
    transporter: urlParams.get("transporter"),
    "Ticket No.": urlParams.get("ticketNo"),
    tpNo: urlParams.get("tpNo"),
    poNo: urlParams.get("poNo"),
    challanNo: urlParams.get("challanNo"),
    supplier: urlParams.get("supplier"),
    supplierAddress: urlParams.get("supplierAddress"),
    material: urlParams.get("material"),
    materialType: urlParams.get("materialType"),
    transactionType: urlParams.get("transactionType"),
    moisture: urlParams.get("moisture"),
  vm: urlParams.get("vm"),
  ash: urlParams.get("ash"),
  fc: urlParams.get("fc"),
};

  // Update the data state with the URL data
  setData([urlData, ...data]);
}, []);

  const filteredData = selectedDate
    ? data.filter((item) => item.Date === selectedDate)
    : data;

  const renderedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleDownload = (ticketNumber) => {
    const item = data.find((item) => item["Ticket No."] === ticketNumber);
  
    if (!item) {
      console.error("Ticket not found. Unable to generate the document.");
      return;
    }
  
    const {
      Date: date,
      "Vehicle No.": vehicleNumber,
      "Transporter Name": transporter,
      "TP No/Invoice No": tpNo,
      "Po No": poNo,
      "Challan No": challanNo,
      "Supplier/customer": supplier,
      "Supplier/customer Address": supplierAddress,
      "Product/Material": material,
      "Product/Material Type": materialType,
      "Transaction Type": transactionType,
      "Moisture %": moisture,
    "Vm %": vm,
    "Ash %": ash,
    "Fc %": fc,
  } = item;

  
    const content = `
      <div style="font-family: Calibri; font-weight: bold; text-align: center;">
      <p style="margin: 0;">Vikram Private Limited</p>
      <p style="margin: 0;">Bad Tumkela, Rajamunda</p>
      <p style="margin: 0;">Sundargarh- 770050</p>
      <p style="margin: 0;">GSTIN- 21AABCV4695C1ZI</p>
    </div>
    <p style="text-align:center;">*************************************************************</p>
    <div style="margin-left: 550px; text-align: justify;">
      <p style="font-family: Calibri; font-weight: bold; text-decoration: underline;">${material} Test Report</p>
      <div></div>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">Dtd: -</span> <span style="font-weight: lighter;">${date}</span></p>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">Supplier/customer:</span> <span style="font-weight: lighter;">${supplier}</span></p>
      <p style="font-family: Calibri; font-weight: lighter;">${supplierAddress}</p>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">Vehicle No: -</span> <span style="font-weight: lighter;">${vehicleNumber}</span></p>
      <p style="font-family: Calibri; font-weight: normal;">Name of Product : ${material} (<strong>${materialType}</strong>)</p>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">Ticket No.:</span> <span style="font-weight: lighter;">${ticketNumber}</span></p>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">Transporter:</span> <span style="font-weight: lighter;">${transporter}</span></p>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">TP No/Invoice No:</span> <span style="font-weight: lighter;">${tpNo}</span></p>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">Po No:</span> <span style="font-weight: lighter;">${poNo}</span></p>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">Challan No:</span> <span style="font-weight: lighter;">${challanNo}</span></p>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">Supplier/customer:</span> <span style="font-weight: lighter;">${supplier}</span></p>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">Supplier/customer Address:</span> <span style="font-weight: lighter;">${supplierAddress}</span></p>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">Transaction Type:</span> <span style="font-weight: lighter;">${transactionType}</span></p>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">Moisture %:</span> <span style="font-weight: lighter;">${moisture}</span></p>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">Vm %:</span> <span style="font-weight: lighter;">${vm}</span></p>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">Ash %:</span> <span style="font-weight: lighter;">${ash}</span></p>
      <p style="font-family: Calibri;"><span style="font-weight: normal;">Fc %:</span> <span style="font-weight: lighter;">${fc}</span></p>
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
  
  const pageCount = Math.ceil(data.length / itemsPerPage) || 1;
  
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
      <div className="qc-quality-check-main-content">
        <div className="qc-quality-check-date d-flex">
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
                {renderedData.map((item, index) => (
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
                        className="qc-quality-btn qc-download-btn"
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QualityCheck;