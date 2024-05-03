//QualityInboundCoalDetails.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTrashAlt,
  faPrint,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import SideBar3 from "../../../../SideBar/SideBar3";
import Header from "../../../../Header/Header";
import "./QualityInboundCoalDetails.css";
import { useMediaQuery } from "react-responsive";
import { Chart, ArcElement } from "chart.js/auto";

const QualityInboundCoalDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ticketNumber = searchParams.get("ticketNumber");

  const [formData, setFormData] = useState({
    date: "2024-04-29",
    inTime: "11:16",
    outTime: "12:20",
    vehicleNumber: "OD35F-3948",
    transporter: "JEEN TRADE & EXPORTS",
    transactionType: "Inbound",
    ticketNo: ticketNumber || "1",
    tpNo: "I22405984/75",
    poNo: "",
    challanNo: "1310002441-5300029809",
    supplier: "MCL Bhubaneswari",
    supplierAddress: "Talcher",
    material: "Coal",
    materialType: "ROM -100MM",
    moisture: '', 
  vm: '', 
  ash: '', 
  fc: '', 
});

  const handleSave = () => {
    const data = {
      date: formData.date,
      inTime: formData.inTime,
      outTime: formData.outTime,
      vehicleNumber: formData.vehicleNumber,
      transporter: formData.transporter,
      transactionType: formData.transactionType,
      "Ticket No.": formData.ticketNo,
      "TP No/Invoice No": formData.tpNo,
      "Po No": formData.poNo,
      "Challan No": formData.challanNo,
      "Supplier/customer": formData.supplier,
      "Supplier/customer Address": formData.supplierAddress,
      "Product/Material": formData.material,
      "Product/Material Type": formData.materialType,
      "Moisture %": formData["Moisture %"],
      "Vm %": formData["Vm %"],
      "Ash %": formData["Ash %"],
      "Fc %": formData["Fc %"],
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

  const renderFieldWithBox = (fieldName, fieldValue, onChange, readOnly = false) => (
    <div className="field-container">
      <label htmlFor={fieldName} className="form-label">
        {fieldName}:
      </label>
      <input
        type="text"
        name={fieldName}
        autoComplete="off"
        value={fieldValue} // Change this line
        onChange={onChange} // Change this line
        required
        className="form-control"
        readOnly={
          fieldName !== "Moisture %" &&
          fieldName !== "Vm %" &&
          fieldName !== "Ash %" &&
          fieldName !== "Fc %"
        }
      />
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
          className={`quality-inbound-coal-detail-check-main-content ${
            isSidebarExpanded ? "expanded" : ""
          }`}>
          <div className="container-fluid trans-form-main-div overflow-hidden">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="quality-inbound-header">Quality Check Inbound Coal Details</h3>
              <div>
                <button className="btn button-transition mx-2" onClick={handleSave}>
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button className="btn button-transition mx-2">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button className="btn button-transition mx-2">
                  <FontAwesomeIcon icon={faPrint} />
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-12 mb-4">
                  <div className="quality-inbound-upper-card p-0">
                    <div className="row mx-0 mb-6">
                      <div className="col-lg-3 mb-3 mb-lg-0 px-4 py-3">
                        {renderFieldWithBox("Ticket No", formData.ticketNo, handleInputChange, true)}
                        {renderFieldWithBox("Date", formData.date, handleInputChange, true)}
                        {renderFieldWithBox("Vehicle Number", formData.vehicleNumber, handleInputChange, true)}
                      </div>
                      <div className="col-lg-3 mb-3 mb-lg-0 px-4 py-3">
                        {renderFieldWithBox("Transporter", formData.transporter, handleInputChange, true)}
                        {renderFieldWithBox("Material", formData.material, handleInputChange, true)}
                        {renderFieldWithBox("Material Type", formData.materialType, handleInputChange, true)}
                      </div>
                      <div className="col-lg-3 mb-3 mb-lg-0 px-4 py-3">
                        {renderFieldWithBox("Tp No", formData.tpNo, handleInputChange, true)}
                        {renderFieldWithBox("Po No", formData.poNo, handleInputChange, true)}
                        {renderFieldWithBox("Challan No", formData.challanNo, handleInputChange, true)}
                      </div>
                      <div className="col-lg-3 px-4 py-3">
                        {renderFieldWithBox("Supplier", formData.supplier, handleInputChange, true)}
                        {renderFieldWithBox("Supplier Address", formData.supplierAddress, handleInputChange, true)}
                        {renderFieldWithBox("Transaction Type", formData.transactionType, handleInputChange, true)}
                      </div>
                    </div>
                  </div>
              </div>

              <div className="col-12">
                  <div className="quality-inbound-lower-card  p-0">
                    <div className="row mx-0">
                    <div className="col-lg-3 mb-3 mb-lg-0 px-4 py-3">
  {renderFieldWithBox("Moisture %", formData["Moisture %"], handleInputChange)}
</div>
<div className="col-lg-3 mb-3 mb-lg-0 px-4 py-3">
  {renderFieldWithBox("Vm %", formData["Vm %"], handleInputChange)}
</div>
<div className="col-lg-3 mb-3 mb-lg-0 px-4 py-3">
  {renderFieldWithBox("Ash %", formData["Ash %"], handleInputChange)}
</div>
<div className="col-lg-3 px-4 py-3">
  {renderFieldWithBox("Fc %", formData["Fc %"], handleInputChange)}
</div>

                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityInboundCoalDetails;