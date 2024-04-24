import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashAlt, faPrint, faTimes } from "@fortawesome/free-solid-svg-icons";
import SideBar3 from "../../../../SideBar/SideBar3";
import Header from "../../../../Header/Header";
import "./QualityDetailsEntry.css";
import { useMediaQuery } from "react-responsive";
import { useLocation } from 'react-router-dom';
import { Chart, ArcElement } from "chart.js/auto";

const QualityInboundDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { receiveInboundData } = location.state || {};
  const [formData, setFormData] = useState({
    date: "",
    inTime: "",
    customer: "",
    vehicleNumber: "",
    transporter: "",
    department: "",
    ticketNo: "",
    tpNoPoNo: "",
    material: "",
    moisture: "",
    vm: "",
    ash: "",
    fc: "",
    size: "",
    fe: "",
    loi: ""
  });

  const closeForm = () => {
    navigate("/QualityCheck");
  };

  const handleSave = () => {
    const data = {
      date: formData.date,
      inTime: formData.inTime,
      customer: formData.customer,
      vehicleNumber: formData.vehicleNumber,
      transporter: formData.transporter,
      department: formData.department,
      ticketNo: formData.ticketNo,
      tpNoPoNo: formData.tpNoPoNo,
      material: formData.material,
      moisture: formData.moisture,
      vm: formData.vm,
      ash: formData.ash,
      fc: formData.fc,
      size: formData.size,
      fe: formData.fe,
      loi: formData.loi
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
    <div className="d-flex flex-column mb-3">
      <label htmlFor={fieldName} className="form-label text1 mb-1">
        {fieldName}:
      </label>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          name={fieldName}
          autoComplete="off"
          value={fieldValue}
          onChange={onChange}
          required
          className="form-control"
        />
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
                <h3 style={{ marginTop: "20px" }}>Quality Check Inbound Details</h3>
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
                {renderFieldWithBox("In Time", currentDateTime, () => {})} 
                {renderFieldWithBox("Out Time", currentDateTime, () => {})}
                {renderFieldWithBox("Transporter", formData.transporter, handleInputChange)}
              </div>
              <div className="col-lg-4 div2 container-fluid">
                {renderFieldWithBox("Material", formData.material, handleInputChange)}
                {renderFieldWithBox("Material Type", formData.material, handleInputChange)}
                {renderFieldWithBox("Transaction Type", formData.material, handleInputChange)}
                {renderFieldWithBox("Tp No", formData.tpNoPoNo, handleInputChange)}
                {renderFieldWithBox("Po No", formData.tpNoPoNo, handleInputChange)}
                {renderFieldWithBox("Challan No", formData.tpNoPoNo, handleInputChange)}
              </div>
              <div className="col-lg-4 div2 container-fluid">
                {renderFieldWithBox("Supplier", formData.tpNoPoNo, handleInputChange)}
                {renderFieldWithBox("Supplier Address", formData.tpNoPoNo, handleInputChange)}
                {renderFieldWithBox("Moisture %", formData.moisture, handleInputChange)}
                {renderFieldWithBox("Vm %", formData.vm, handleInputChange)}
                {renderFieldWithBox("Ash %", formData.ash, handleInputChange)}
                {renderFieldWithBox("Fc %", formData.fc, handleInputChange)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityInboundDetails;
