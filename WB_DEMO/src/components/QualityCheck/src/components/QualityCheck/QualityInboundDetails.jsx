import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chart, ArcElement } from "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashAlt, faPrint, faTimes } from "@fortawesome/free-solid-svg-icons";
import SideBar3 from "../../../../SideBar/SideBar3";
import Header from "../../../../Header/Header";
import "./QualityDetailsEntry.css";
import { useMediaQuery } from "react-responsive";
import { useLocation } from 'react-router-dom';

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
    material: "Select",
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

  const handleTicketClick = (ticketNumber, index) => {
    const transactionType = data[index]["Transaction Type"];
    if (transactionType === "Inbound") {
      navigate(`/QualityInboundDetails?ticketNumber=${ticketNumber}`, { state: { receiveInboundData } });
    } else if (transactionType === "Outbound") {
      navigate(`/QualityOutboundDetails?ticketNumber=${ticketNumber}`);
    }
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
          className={`quality-detail-check-main-content ${
            isMobile ? "mobile" : isTablet ? "tablet" : "desktop"
          }`}
        >
          <div className="container-fluid trans-form-main-div overflow-hidden">
            <div className="close" onClick={closeForm}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className="d-flex flex-column align-items-center mb-4">
              <div className="text-center mb-4" >
                <h3 >Quality Check Inbound Details</h3>
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
              <div className="col-lg-4" style={{ marginLeft: "50px" }}>
                <div className="d-flex mb-3">
                  <label htmlFor="date" className="form-label text1 me-2">
                    Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    autoComplete="off"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="d-flex mb-3">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    In Time:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value={currentDateTime}
                    required
                    className="form-control"
                  />
                </div>
                <div className="d-flex mb-3">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Customer:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value="Vikram Pvt. Ltd."
                    required
                    className="form-control"
                  />
                </div>
                <div className="d-flex mb-1">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Vehicle Number:
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    value="OD-02-AJ-1160"
                    required
                    className="form-control"
                  />
                </div>
                <div className="d-flex mb-1">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Transporter:
                  </label>
                  <input
                    type="text"
                    name="transporter"
                    autoComplete="off"
                    value={formData.transporter}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="d-flex mb-1">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Department:
                  </label>
                  <input
                    type="text"
                    name="department"
                    autoComplete="off"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-lg-4 div2 container-fluid">
                <div className="d-flex mb-3">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Ticket No:
                  </label>
                  <input
                    type="text"
                    name="ticketNo"
                    autoComplete="off"
                    value={formData.ticketNo}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="d-flex mb-3">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Tp No/Po No:
                  </label>
                  <input
                    type="text"
                    name="tpNoPoNo"
                    autoComplete="off"
                    value={formData.tpNoPoNo}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="d-flex mb-3">
                  <label htmlFor="userId" className="form-label text1 me-2">
                    Material:
                  </label>
                  <select
                    className="form-control"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                  >
                    <option value="Select">Select</option>
                    <option value="Iron">Iron</option>
                    <option value="Coal">Coal</option>
                  </select>
                </div>
                {formData.material === "Coal" && (
                  <>
                    <div className="d-flex mb-3">
                      <label htmlFor="userId" className="form-label text1 me-2">
                        Moisture %:
                      </label>
                      <input
                        type="text"
                        name="moisture"
                        autoComplete="off"
                        value={formData.moisture}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="d-flex mb-3">
                      <label htmlFor="userId" className="form-label text1 me-2">
                        Vm %:
                      </label>
                      <input
                        type="text"
                        name="vm"
                        autoComplete="off"
                        value={formData.vm}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="d-flex mb-3">
                      <label htmlFor="userId" className="form-label text1 me-2">
                        Ash %:
                      </label>
                      <input
                        type="text"
                        name="ash"
                        autoComplete="off"
                        value={formData.ash}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="d-flex mb-3">
                      <label htmlFor="userId" className="form-label text1 me-2">
                        Fc %:
                      </label>
                      <input
                        type="text"
                        name="fc"
                        autoComplete="off"
                        value={formData.fc}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                      />
                    </div>
                  </>
                )}
                {formData.material === "Iron" && (
                  <>
                    <div className="d-flex mb-3">
                      <label htmlFor="userId" className="form-label text1 me-2">
                        Size :
                      </label>
                      <input
                        type="text"
                        name="size"
                        autoComplete="off"
                        value={formData.size}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="d-flex mb-3">
                      <label htmlFor="userId" className="form-label text1 me-2">
                        Fe(t) % :
                      </label>
                      <input
                        type="text"
                        name="fe"
                        autoComplete="off"
                        value={formData.fe}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="d-flex mb-3">
                      <label htmlFor="userId" className="form-label text1 me-2">
                        Loi % :
                      </label>
                      <input
                        type="text"
                        name="loi"
                        autoComplete="off"
                        value={formData.loi}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                      />
                    </div>
                  </>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityInboundDetails;
