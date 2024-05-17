import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faEraser,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import SideBar3 from "../../../../SideBar/SideBar3";
import { useMediaQuery } from "react-responsive";
import { Chart, ArcElement } from "chart.js/auto";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const QualityInboundCoalDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    date: null,
    inTime: null,
    outTime: null,
    vehicleNo: null,
    transporterName: null,
    transactionType: null,
    ticketNo: null,
    tpNo: null,
    poNo: null,
    challanNo: null,
    supplierOrCustomerName: null,
    supplierOrCustomerAddress: null,
    materialName: null,
    materialType: null,
  });

  const [parameters, setparameters] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlData = {
      date: urlParams.get("date"),
      inTime: urlParams.get("inTime"),
      outTime: urlParams.get("outTime"),
      vehicleNo: urlParams.get("vehicleNo"),
      transporterName: urlParams.get("transporterName"),
      transactionType: urlParams.get("transactionType"),
      ticketNo: urlParams.get("ticketNo"),
      tpNo: urlParams.get("tpNo"),
      poNo: urlParams.get("poNo"),
      challanNo: urlParams.get("challanNo"),
      supplierOrCustomerName: urlParams.get("supplierOrCustomerName"),
      supplierOrCustomerAddress: urlParams.get("supplierOrCustomerAddress"),
      materialName: urlParams.get("materialName"),
      materialType: urlParams.get("materialType"),
    };

    setFormData(urlData);

    const fetchparameters = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/materials/${urlData.materialName}/parameters`
        );
        const data = await response.json();
        if (data.length > 0 && data[0].parameters) {
          const ranges = data[0].parameters.reduce((acc, parameter) => {
            acc[parameter.parameterName] = {
              rangeFrom: parameter.rangeFrom,
              rangeTo: parameter.rangeTo,
            };
            return acc;
          }, {});
          setparameters(ranges);
        }
      } catch (error) {
        console.error("Error fetching parameter ranges:", error);
      }
    };

    if (urlData.materialName && urlData.materialType) {
      fetchparameters();
    }
  }, []);

  const handleSave = async () => {
    const data = {
      ticketNo: formData.ticketNo,
      date: formData.date,
      vehicleNo: formData.vehicleNo,
      transporterName: formData.transporterName,
      transactionType: formData.transactionType,
      tpNo: formData.tpNo,
      poNo: formData.poNo,
      challanNo: formData.challanNo,
      supplierOrCustomerName: formData.supplierOrCustomerName,
      supplierOrCustomerAddress: formData.supplierOrCustomerAddress,
      materialName: formData.materialName,
      materialType: formData.materialType,
      moisture: formData.moisture || 0,
      vm: formData.vm || 0,
      ash: formData.ash || 0,
      fc: formData.fc || 0,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/qualities/${formData.ticketNo}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include"
        }
      );

      if (response.ok) {
        console.log("Data saved successfully");
        const queryString = new URLSearchParams(data).toString();
        navigate(`/QualityCheck?${queryString}`);
      } else {
        console.error("Error saving data:", response.status);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const currentDateTime = new Date().toLocaleString();

  const [material, setMaterial] = useState("Select");

  useEffect(() => {
    Chart.register(ArcElement);
  }, []);

  const handleMaterialChange = (event) => {
    setMaterial(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  
  useEffect(() => {
    // Any side effect code can be placed here
    // console.log("Updated state:", formData);
  }, [formData]);

  const generateFieldNameWithRange = (parameterName) => {
    const parameter = parameters[parameterName];
    if (!parameter) return `${parameterName}`;
    const { rangeFrom, rangeTo } = parameter;
    return `${parameterName} % (${rangeFrom}-${rangeTo})`;
  };


  const handleKeyPress = (event) => {
    // Allow only numeric characters and certain special characters like dot (.) and minus (-)
    const allowedCharacters = /[0-9.-]/;
    if (!allowedCharacters.test(event.key)) {
      event.preventDefault();
    }
  };
  
  const renderFieldWithBox = (fieldName, fieldValue, propertyName, onChange, isReadOnly = false, isRequired = false) => {
    const inputStyle = isReadOnly ? { borderColor: '#ced4da', backgroundColor: 'rgb(239, 239, 239)' } : {};
    const asteriskStyle = isRequired ? { color: 'red' } : {};
  
    return (
      <div className="col-md-3 mb-3">
        <label htmlFor={propertyName} className="form-label">
          {fieldName}:
          {isRequired && <span style={asteriskStyle}>*</span>}
        </label>
        <input
          type="text"
          name={propertyName}
          autoComplete="off"
          value={fieldValue === null ? "" : fieldValue}
          onChange={onChange}
          onKeyPress={handleKeyPress} // Attach onKeyPress event handler
          required={isRequired}
          readOnly={isReadOnly}
          style={inputStyle}
          className="form-control"
          id={propertyName}
        />
      </div>
    );
  };
  

  const handleClear = () => {
    setFormData({
      ...formData,
      moisture: "",
      vm: "",
      ash: "",
      fc: "",
    });
  };
  
  




  return (
    <SideBar3>
      <div className="d-flex">
        <div className="flex-grow-1">
          <h2 className="text-center p-2" style={{ fontFamily: "Arial", fontSize: "clamp(12px, 4vw, 30px)" }}>Ticket Insights & Quality Inputs</h2>
          <div className="main-content mt-0 ms-md-2">
            <div className="container-fluid trans-form-main-div overflow-hidden">
              <div className="d-flex justify-content-between align-items-center mb-2 ml-6">
                <div></div> {/* This empty div will push the icons to the right */}
                <div>
                  <FontAwesomeIcon icon={faSave} className="btn-icon mx-3" onClick={handleSave} style={{ fontSize: '1.5em', color: '#008060' }} />
                  <FontAwesomeIcon icon={faEraser} className="btn-icon mx-3" onClick={handleClear} style={{ fontSize: '1.5em', color: "#d63031" }} />
                  <FontAwesomeIcon icon={faPrint} className="btn-icon mx-3" style={{ fontSize: '1.5em', color: '#3e8ee6' }} />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card mb-3 p-3 border shadow-lg">
                    <div className="card-body">
                      <div className="row">
                        {renderFieldWithBox("TicketNo", formData.ticketNo, "ticketNo", handleInputChange, true)}
                        {renderFieldWithBox("Date", formData.date, "date", handleInputChange, true)}
                        {renderFieldWithBox("Vehicle Number", formData.vehicleNo, "vehicleNo", handleInputChange, true)}
                        {renderFieldWithBox("Transporter", formData.transporterName, "transporterName", handleInputChange, true)}
                        {renderFieldWithBox("Tp No", formData.tpNo, "tpNo", handleInputChange, true)}
                        {renderFieldWithBox("Po No", formData.poNo, "poNo", handleInputChange, true)}
                        {renderFieldWithBox("Challan No", formData.challanNo, "challanNo", handleInputChange, true)}
                        {renderFieldWithBox("Material", formData.materialName, "materialName", handleInputChange, true)}
                        {renderFieldWithBox("Material Type", formData.materialType, "materialType", handleInputChange, true)}
                        {renderFieldWithBox("Supplier", formData.supplierOrCustomerName, "supplierOrCustomerName", handleInputChange, true)}
                        {renderFieldWithBox("Supplier Address", formData.supplierOrCustomerAddress, "supplierOrCustomerAddress", handleInputChange, true)}
                        {renderFieldWithBox("Transaction Type", formData.transactionType, "transactionType", handleInputChange, true)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card mb-3 p-3 border shadow-lg">
                    <div className="card-body">
                      <div className="row">
                        {renderFieldWithBox(generateFieldNameWithRange("Moisture"), formData.moisture, "Moisture", handleInputChange, false, true)}
                        {renderFieldWithBox(generateFieldNameWithRange("Vm"), formData.vm, "Vm", handleInputChange, false, true)}
                        {renderFieldWithBox(generateFieldNameWithRange("Ash"), formData.ash, "Ash", handleInputChange, false, true)}
                        {renderFieldWithBox(generateFieldNameWithRange("Fc"), formData.fc, "Fc", handleInputChange, false, true)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBar3>
  );
};
export default QualityInboundCoalDetails;