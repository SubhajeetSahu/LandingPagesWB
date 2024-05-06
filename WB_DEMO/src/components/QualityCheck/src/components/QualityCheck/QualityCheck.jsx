// QualityCheck.jsx
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
      date: "2024-05-06",
      inTime: "11:16",
      outTime: "12:20",
      vehicleNumber: "OD35F-3948",
      transporter: "JEEN TRADE AND EXPORTS PRIVATE LTD",
      "Ticket No.": "1",
      "TP No/Invoice No": "I22405984/75",
      "Po No": "",
      "Challan No": "1310002441-5300029809",
      "Supplier/customer": "MCL Bhubaneswari",
      "Supplier/customer Address": "Talcher",
      "Product/Material": "Coal",
      "Product/Material Type": "ROM -100MM",
      "Transaction Type": "Inbound",
      "Moisture %": "",
      "Vm %": "",
      "Ash %": "",
      "Fc %": "",
    },
    // Add more dummy data objects here if needed
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

    // Get the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);

    // Extract the relevant data from the query parameters
    const urlData = {
      date: urlParams.get("date"),
      inTime: urlParams.get("inTime"),
      outTime: urlParams.get("outTime"),
      vehicleNumber: urlParams.get("vehicleNumber"),
      transporter: urlParams.get("transporter"),
      "Ticket No.": urlParams.get("Ticket No."),
      "TP No/Invoice No": urlParams.get("TP No/Invoice No"),
      "Po No": urlParams.get("Po No"),
      "Challan No": urlParams.get("Challan No"),
      "Supplier/customer": urlParams.get("Supplier/customer"),
      "Supplier/customer Address": urlParams.get("Supplier/customer Address"),
      "Product/Material": urlParams.get("Product/Material"),
      "Product/Material Type": urlParams.get("Product/Material Type"),
      "Transaction Type": urlParams.get("transactionType"),
      "Moisture %": urlParams.get("Moisture %"),
      "Vm %": urlParams.get("Vm %"),
      "Ash %": urlParams.get("Ash %"),
      "Fc %": urlParams.get("Fc %"),
    };

    // Update the existing data item with the same "Ticket No." as the URL data
    const existingDataIndex = data.findIndex(
      (item) => item["Ticket No."] === urlData["Ticket No."]
    );
    if (existingDataIndex !== -1) {
      const updatedData = [...data];
      updatedData[existingDataIndex] = urlData;
      setData(updatedData);
    } else {
      // If no existing data item found, add the URL data as a new item
      setData([...data, urlData]);
    }
  }, []);

  const filteredData = selectedDate
    ? data.filter((item) => item.date === selectedDate)
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
      date,
      vehicleNumber,
      transporter,
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
    <div style="font-family: Calibri; text-align: center;">
    <p style="margin: 0; font-weight: bold; font-size: 16pt;">Vikram Private Limited</p>
    <p style="margin: 0; font-size: 11pt;">Bad Tumkela, Rajamunda</p>
    <p style="margin: 0; font-size: 11pt;">Sundargarh- 770050</p>
    <p style="margin: 0; font-size: 11pt;">GSTIN- 21AABCV4695C1ZI</p>
  </div>
  
  <p style="text-align: center; margin-top: 10px; margin-bottom: 10px; font-size: 14pt;">***********************************************************************</p>
  
  <div style="text-align: left;">
    <p style="font-family: Calibri; font-weight: bold; text-decoration: underline; margin-bottom: 5px;">${material} Test Report</p>
    <p style="font-family: Calibri; margin: 0;">
      <span style="font-weight: normal;">Dtd: -</span>
      <span style="font-weight: lighter;">${date}</span>
    </p>
    <p style="font-family: Calibri; margin: 0;">
      <span style="font-weight: normal;">Supplier/customer:</span>
      <span style="font-weight: lighter;">${supplier}</span>
    </p>
    <p style="font-family: Calibri; font-weight: lighter; margin: 0;">${supplierAddress}</p>
    <p style="font-family: Calibri; margin: 0;">
      <span style="font-weight: normal;">Vehicle No: -</span>
      <span style="font-weight: lighter;">${vehicleNumber}</span>
    </p>
    <p style="font-family: Calibri; font-weight: normal; margin: 0;">Name of Product : ${material} (<strong>${materialType}</strong>)</p>
    <p style="font-family: Calibri; margin: 0;">
      <span style="font-weight: normal;">Ticket No.:</span>
      <span style="font-weight: lighter;">${ticketNumber}</span>
    </p>
    <p style="font-family: Calibri; margin: 0;">
      <span style="font-weight: normal;">Transporter:</span>
      <span style="font-weight: lighter;">${transporter}</span>
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
      <span style="font-weight: lighter;">${supplier}</span>
    </p>
    <p style="font-family: Calibri; margin: 0;">
      <span style="font-weight: normal;">Supplier/customer Address:</span>
      <span style="font-weight: lighter;">${supplierAddress}</span>
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
      const item = data.find((item) => item["Ticket No."] === ticketNumber);
      if (item) {
        const { "Moisture %": moisture, "Vm %": vm, "Ash %": ash, "Fc %": fc, ...queryParams } = item;
        const queryString = new URLSearchParams(queryParams).toString();
        navigate(`/QualityInboundCoalDetails?${queryString}`);
      }
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
            <div className="qc-quality-check-date d-flex justify-content-between align-items-center">
          <input
            type="date"
            id="date"
            name="date"
            className="form-control w-auto"
            value={selectedDate}
            onChange={handleDateChange}
            max={getCurrentDate()}
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
                          <td>{item.date}</td>
                          <td>{item.vehicleNumber}</td>
                          <td>{item.inTime}</td>
                          <td>{item.outTime}</td>
                          <td>{item.transporter}</td>
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
           </button>         </div>
       </div>
     </div>
   </div>
 );
}

export default QualityCheck;