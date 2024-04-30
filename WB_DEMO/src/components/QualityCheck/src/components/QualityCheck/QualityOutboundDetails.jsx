import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashAlt, faPrint, faTimes } from "@fortawesome/free-solid-svg-icons";
import SideBar3 from "../../../../SideBar/SideBar3";
import Header from "../../../../Admin/Header/Header";
import "./QualityOutboundDetails.css";
import { useMediaQuery } from "react-responsive";
import { useLocation } from 'react-router-dom';
import { Chart, ArcElement } from "chart.js/auto";

const QualityOutboundDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { receiveOutboundData } = location.state || {};
  const [formData, setFormData] = useState({
    date: "2024-04-29",
    inTime: "16:29",
    outTime: "21:45",
    customer: "SAMRIDHI TRADES",
    customerAddress: "MUZAFFARNAGAR",
    vehicleNumber: "HR38Z1951",
    transporter: "MAA SHERAWALI TRANSPORT",
    transactionType: "Outbound",
    ticketNo: "2",
    documentNo: "VPL/23-24/S1294",
    poNo: "97/3",
    product: "SPONGE IRON",
    productType: "LUMPS",
    size: "03mm~18mm",
    fem: "80.24",
    fet: "92.69",
    mtz: "87.13",
    carbon: "0.10",
    sulphur: "0.030",
    nonMag: "0.69",
  });

  const closeForm = () => {
    navigate("/QualityCheck");
  };

  const handleSave = () => {
    const data = {
      date: formData.date,
      inTime: formData.inTime,
      vehicleNumber: formData.vehicleNumber,
      transporter: formData.transporter,
      department: formData.department,
      ticketNo: formData.ticketNo,
      invoiceNo: formData.invoiceNo,
      poNo: formData.poNo,
      product: formData.product,
      productType: formData.productType,
      transactionType: formData.transactionType,
      customer: formData.customer,
      customerAddress: formData.customerAddress,
      size: formData.size,
      fem: formData.fem,
      fet: formData.fet,
      mtz: formData.mtz,
      carbon: formData.carbon,
      sulphur: formData.sulphur,
      nonMag: formData.nonMag,
    };

    const queryString = new URLSearchParams(data).toString();

    navigate(`/QualityCheck?${queryString}`);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const currentDateTime = new Date().toLocaleString();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [material, setMaterial] = useState("Select");

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    Chart.register(ArcElement);
  }, []);

  const handleMaterialChange = (event) => {
    setMaterial(event.target.value);
  };

  const renderFieldWithBox = (fieldName, fieldValue, onChange) => (
    <div className="field-container">
      <div className="d-flex flex-row mb-3 align-items-center">
        <label htmlFor={fieldName} className="form-label text-muted me-2 fw-normal">
          {fieldName}:
        </label>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            name={fieldName}
            autoComplete="off"
            value={fieldValue}
            onChange={onChange}
            required
            className="form-control"
            readOnly
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        <Header toggleSidebar={toggleSidebar} />
        <SideBar3
          isSidebarExpanded={isSidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
        <div
          className={`quality-detail-check-main-content ${
            isMobile ? "mobile" : isTablet ? "tablet" : "desktop"
          }`}
          style={{ marginLeft: "220px" }}
        >
          <div className="container-fluid trans-form-main-div overflow-hidden">
            <div className="close" onClick={closeForm}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="d-flex flex-column align-items-center mb-4">
              <div className="text-center mb-4">
                <h3 style={{marginRight: "130px" , marginTop: "60px" }}>Quality Check Outbound Details</h3>
              </div>
              <div className="d-flex" style={{ justifyContent: 'flex-end', width: '100%' }}>
                <button className="btn button-transition mx-3" onClick={handleSave}>
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button className="btn button-transition mx-3">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button className="btn button-transition mx-3">
                  <FontAwesomeIcon icon={faPrint} />
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 div2 container-fluid">
                {renderFieldWithBox("Ticket No", formData.ticketNo, handleInputChange)}
                {renderFieldWithBox("Date", formData.date, handleInputChange)}
                {renderFieldWithBox("Vehicle Number", formData.vehicleNumber, handleInputChange)}
                {renderFieldWithBox("In Time",formData.inTime )}
                {renderFieldWithBox("Out Time",formData.outTime )}
                {renderFieldWithBox("Transporter", formData.transporter, handleInputChange)}
                {renderFieldWithBox("Transaction Type", formData.transactionType, handleInputChange)}
              </div>
              <div className="col-lg-4 div2 container-fluid">
                {renderFieldWithBox("Product", formData.product, handleInputChange)}
                {renderFieldWithBox("Product Type", formData.product, handleInputChange)}
                {renderFieldWithBox("Invoice No", formData.invoiceNo, handleInputChange)}
                {renderFieldWithBox("Po No", formData.poNo, handleInputChange)}
                {renderFieldWithBox("Challan No", formData.tpNoPoNo, handleInputChange)}
                {renderFieldWithBox("Customer", formData.customer, handleInputChange)}
                {renderFieldWithBox("Customer Address", formData.customerAddress, handleInputChange)}
              </div>
              <div className="col-lg-4 div2 container-fluid">
                {renderFieldWithBox("Size %", formData.size, handleInputChange)}
                {renderFieldWithBox("%Fe(m)", formData.fem, handleInputChange)}
                {renderFieldWithBox("%Fe(t)", formData.fet, handleInputChange)}
                {renderFieldWithBox("%Mtz", formData.mtz, handleInputChange)}
                {renderFieldWithBox("Carbon", formData.carbon, handleInputChange)}
                {renderFieldWithBox("Sulpher", formData.sulphur, handleInputChange)}
                {renderFieldWithBox("NonMag", formData.nonMag, handleInputChange)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityOutboundDetails;