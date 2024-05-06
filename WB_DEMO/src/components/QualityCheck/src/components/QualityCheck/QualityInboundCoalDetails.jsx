// QualityInboundCoalDetails.jsx
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

  const [formData, setFormData] = useState({
    date: "",
    inTime: "",
    outTime: "",
    vehicleNumber: "",
    transporter: "",
    transactionType: "",
    ticketNo: "",
    tpNo: "",
    poNo: "",
    challanNo: "",
    supplier: "",
    supplierAddress: "",
    material: "",
    materialType: "",
    moisture: "",
    vm: "",
    ash: "",
    fc: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlData = {
      date: urlParams.get("date"),
      inTime: urlParams.get("inTime"),
      outTime: urlParams.get("outTime"),
      vehicleNumber: urlParams.get("vehicleNumber"),
      transporter: urlParams.get("transporter"),
      transactionType: urlParams.get("Transaction Type"),
      ticketNo: urlParams.get("Ticket No."),
      tpNo: urlParams.get("TP No/Invoice No"),
      poNo: urlParams.get("Po No"),
      challanNo: urlParams.get("Challan No"),
      supplier: urlParams.get("Supplier/customer"),
      supplierAddress: urlParams.get("Supplier/customer Address"),
      material: urlParams.get("Product/Material"),
      materialType: urlParams.get("Product/Material Type"),
      moisture: "",
      vm: "",
      ash: "",
      fc: "",
    };

    setFormData(urlData);
  }, []);

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
      "Moisture %": formData.moisture,
      "Vm %": formData.vm,
      "Ash %": formData.ash,
      "Fc %": formData.fc,
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

  const renderFieldWithBox = (fieldName, fieldValue, onChange) => {
  const fieldNameCamelCase = fieldName
    .replace(/[\s%]/g, '')
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .trim()
    .replace(/ /g, '');

  return (
    <div className="field-container">
      <label htmlFor={fieldNameCamelCase} className="form-label">
        {fieldName}:
      </label>
      <input
        type="text"
        name={fieldNameCamelCase}
        autoComplete="off"
        value={fieldValue || ''}
        onChange={onChange}
        required
        className="form-control"
      />
    </div>
  );
};

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
                       {renderFieldWithBox("Ticket No", formData.ticketNo, handleInputChange)}
                       {renderFieldWithBox("Date", formData.date, handleInputChange)}
                       {renderFieldWithBox("Vehicle Number", formData.vehicleNumber, handleInputChange)}
                     </div>
                     <div className="col-lg-3 mb-3 mb-lg-0 px-4 py-3">
                       {renderFieldWithBox("Transporter", formData.transporter, handleInputChange)}
                       {renderFieldWithBox("Material", formData.material, handleInputChange)}
                       {renderFieldWithBox("Material Type", formData.materialType, handleInputChange)}
                     </div>
                     <div className="col-lg-3 mb-3 mb-lg-0 px-4 py-3">
                       {renderFieldWithBox("Tp No", formData.tpNo, handleInputChange)}
                       {renderFieldWithBox("Po No", formData.poNo, handleInputChange)}
					   {renderFieldWithBox("Challan No", formData.challanNo, handleInputChange)}
</div>
<div className="col-lg-3 px-4 py-3">
{renderFieldWithBox("Supplier", formData.supplier, handleInputChange)}
{renderFieldWithBox("Supplier Address", formData.supplierAddress, handleInputChange)}
{renderFieldWithBox("Transaction Type", formData.transactionType, handleInputChange)}
</div>
</div>
</div>
</div>
<div className="col-12">
             <div className="quality-inbound-lower-card  p-0">
               <div className="row mx-0">
                 <div className="col-lg-3 mb-3 mb-lg-0 px-4 py-3">
                   {renderFieldWithBox("Moisture %", formData.moisture, handleInputChange)}
                 </div>
                 <div className="col-lg-3 mb-3 mb-lg-0 px-4 py-3">
                   {renderFieldWithBox("Vm %", formData.vm, handleInputChange)}
                 </div>
                 <div className="col-lg-3 mb-3 mb-lg-0 px-4 py-3">
                   {renderFieldWithBox("Ash %", formData.ash, handleInputChange)}
                 </div>
                 <div className="col-lg-3 px-4 py-3">
                   {renderFieldWithBox("Fc %", formData.fc, handleInputChange)}
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