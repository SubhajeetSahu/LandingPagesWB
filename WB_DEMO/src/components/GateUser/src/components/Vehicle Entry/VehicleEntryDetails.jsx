//VehicleEntryDetails.jsx
import { useState, useEffect, useRef } from "react";
import { Chart, ArcElement } from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../../../../Header/Header";
import SideBar2 from "../../../../SideBar/SideBar2";
import camView from "../../assets/weighbridgeCam.webp";
import './VehicleEntryDetails.css';
import { FaCamera } from "react-icons/fa";
import "./VehicleEntryDetails.css";
 
function VehicleEntryDetails() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const homeMainContentRef = useRef(null);
 
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
 
  useEffect(() => {
    Chart.register(ArcElement);
 
    const resizeObserver = new ResizeObserver(() => {
      if (
        homeMainContentRef.current &&
        chartRef.current?.chartInstance &&
        chartRef2.current?.chartInstance
      ) {
        chartRef.current.chartInstance.resize();
        chartRef2.current.chartInstance.resize();
      }
    });
 
    if (homeMainContentRef.current) {
      resizeObserver.observe(homeMainContentRef.current);
    }
 
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
 
  const [formData, setFormData] = useState({
    date: "",
    inTime: "",
    poNo: "",
    challanNo: "",
    customer: "",
    supplier: "",
    supplierAddress: "",
    supplierContactNo: "",
    vehicleNo: "",
    transporter: "",
    driverDLNo: "",
    driverName: "",
    department: "",
    product: "",
    eWayBillNo: "",
    tpNo: "",
    vehicleType: "",
    tpNetWeight: "", // New field: TP Net Weight
    rcFitnessUpto: "", // New field: RC Fitness Upto
  });
  const departmentOptions = ["Department 1", "Department 2", "Department 3"];
  const materialtOptions = ["Material 1", "Material 2", "Material 3"];
  const supplier = ["Supplier 1", "Supplier 2", "Supplier 3"];
  const transporterOptions = ["Transporter 1", "Transporter 2", "Transporter 3"];
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
 
    if (name === "poNo" || name === "challanNo") {
      setFormData((prevData) => ({
        ...prevData,
        [name === "poNo" ? "challanNo" : "poNo"]: value
          ? ""
          : prevData[name === "poNo" ? "challanNo" : "poNo"],
      }));
    }
  };
 
  const handleSave = () => {
    if (
      !formData.vehicleNo ||
      !formData.driverName ||
      !formData.poNo ||
      !formData.eWayBillNo
    ) {
      alert("Please fill out all mandatory fields.");
      return;
    }
    // Show success message
    alert("Data saved Successfully!");
 
    // Reset form data after 3 seconds and navigate to VehicleEntry page
    setTimeout(() => {
      setFormData({
        date: "",
        inTime: "",
        poNo: "",
        challanNo: "",
        customer: "",
        supplier: "",
        supplierAddress: "",
        supplierContactNo: "",
        vehicleNo: "",
        transporter: "",
        driverDLNo: "",
        driverName: "",
        department: "",
        product: "",
        eWayBillNo: "",
        tpNo: "",
        vehicleType: "",
        tpNetWeight: "", // New field: TP Net Weight
        rcFitnessUpto: "", // New field: RC Fitness Upto
      });
 
      // Navigate to VehicleEntry page
      navigate("/VehicleEntry");
    }, 3000);
  };
 
  const handleClear = () => {
    setFormData({
      date: "",
      inTime: "",
      poNo: "",
      challanNo: "",
      customer: "",
      supplier: "",
      supplierAddress: "",
      supplierContactNo: "",
      vehicleNo: "",
      NoOfWheels: "",
      transporter: "",
      driverDLNo: "",
      driverName: "",
      department: "",
      material: "",
      eWayBillNo: "",
      tpNo: "",
      vehicleType: "",
      tpNetWeight: "", // Clearing the new field: TP Net Weight
      rcFitnessUpto: "", // Clearing the new field: RC Fitness Upto
    });
  };
 
  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <SideBar2
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div className="VehicleEntryDetailsMainContent" style={{ marginTop: "100px", marginRight: "140px" }}>
        <h2 className="text-center mb-4">Vehicle Entry Inbound Details</h2>
        <div className="row">
          {/* Input fields */}
          {/* PO No */}
          <div className="col-md-3 mb-3">
            <label htmlFor="poNo" className="form-label ">
              PO No:<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="poNo"
              name="poNo"
              value={formData.poNo}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          {/* TP No */}
          <div className="col-md-3 mb-3 position-relative">
            <label htmlFor="tpNo" className="form-label ">
              TP No:<span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                type="text"
                id="tpNo"
                name="tpNo"
                value={formData.tpNo}
                onChange={handleChange}
                required
                className="form-control"
              />
              {/* Replace "Scan" button with FaCamera icon */}
              <button
                className="btn btn-outline-primary"
                style={{
                  position: "absolute",
                  right: "1px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={() => alert("Scan TP No")}
              >
                <FaCamera />
              </button>
            </div>
          </div>
 
          {/* Challan No */}
          <div className="col-md-3 mb-3">
            <label htmlFor="challanNo" className="form-label ">
              Challan No:<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="challanNo"
              name="challanNo"
              value={formData.challanNo}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {/* Vehicle No */}
          <div className="col-md-3 mb-3 position-relative">
            <label htmlFor="vehicleNo" className="form-label ">
              Vehicle No:<span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                type="text"
                id="vehicleNo"
                name="vehicleNo"
                value={formData.vehicleNo}
                onChange={handleChange}
                className="form-control"
              />
              {/* Replace "Scan" button with FaCamera icon */}
              <button
                className="btn btn-outline-primary"
                style={{
                  position: "absolute",
                  right: "1px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={() => alert("Scan Vehicle No")}
              >
                <FaCamera />
              </button>
            </div>
          </div>
          <div className="col-md-6">
            {/* Input fields */}
            <h4>Fill up the user details:</h4>
            <div className="row mb-3">
              <div className="col-md-6">
                <label
                  htmlFor="vehicleType"
                  className="form-label"
                >
                  Vehicle Type:
                </label>
                <input
                  type="text"
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="NoOfWheels"
                  className="form-label"
                >
                  No of Wheels:
                </label>
                <input
                  type="text"
                  id="NoOfWheels"
                  name="NoOfWheels"
                  value={formData.NoOfWheels}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mb-3">
              {/* Supplier dropdown */}
              <div className="col-md-6">
                <label htmlFor="supplier" className="form-label ">
                  Supplier:
                </label>
                <select
                  id="supplier"
                  name="supplier"
                  value={formData.supplier}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Supplier</option>
                  {supplier.map((supplier, index) => (
                    <option key={index} value={supplier}>
                      {supplier}
                    </option>
                  ))}
                </select>
              </div>
 
              <div className="col-md-6">
                <label
                  htmlFor="supplierContactNo"
                  className="form-label "
                >
                  Supplier's Address:
                </label>
                <input
                  type="text"
                  id="supplierAddress"
                  name="supplierAddress"
                  value={formData.supplierAddress}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mb-3">
              {/* Transporter */}
              <div className="col-md-6 mb-3">
                <label htmlFor="transporter" className="form-label ">
                  Transporter:
                </label>
                <select
                  id="transporter"
                  name="transporter"
                  value={formData.transporter}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Transporter</option>
                  {transporterOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {/* Product dropdown */}
              <div className="col-md-6">
                <label
                  htmlFor="material"
                  className="form-label "
                >
                  Material:
                </label>
                <select
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select material</option>
                  {materialtOptions.map((material, index) => (
                    <option key={index} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label
                  htmlFor="driverDLNo"
                  className="form-label "
                >
                  Driver DL No:<span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    id="driverDLNo"
                    name="driverDLNo"
                    value={formData.driverDLNo}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                  {/* Replace "Scan" button with FaCamera icon */}
                  <button
                    className="btn btn-outline-primary"
                    style={{
                      position: "absolute",
                      right: "1px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    onClick={() => alert("Scan Driver DL No")}
                  >
                    <FaCamera />
                  </button>
                </div>
              </div>
 
              <div className="col-md-6">
                <label
                  htmlFor="driverName"
                  className="form-label "
                >
                  Driver Name:<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="driverName"
                  name="driverName"
                  value={formData.driverName}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label
                  htmlFor="tpNetWeight"
                  className="form-label "
                >
                  TP Net Weight:
                </label>
                <input
                  type="text"
                  id="tpNetWeight"
                  name="tpNetWeight"
                  value={formData.tpNetWeight}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="rcFitnessUpto"
                  className="form-label "
                >
                  RC Fitness Upto:
                </label>
                <input
                  type="text"
                  id="rcFitnessUpto"
                  name="rcFitnessUpto"
                  value={formData.rcFitnessUpto}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            {/* Department dropdown */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label
                  htmlFor="department"
                  className="form-label "
                >
                  Department:
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Department</option>
                  {departmentOptions.map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="eWayBillNo"
                  className="form-label "
                >
                  E-way Bill No:
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    id="eWayBillNo"
                    name="eWayBillNo"
                    value={formData.eWayBillNo}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                  {/* Replace "Scan" button with FaCamera icon */}
                  <button
                    className="btn btn-outline-primary"
                    style={{
                      position: "absolute",
                      right: "1px",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    onClick={() => alert("Scan E-WayBill No")}
                  >
                    <FaCamera />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {/* Camera view */}
            <table className="text-center camview table table-bordered table-striped">
              <tbody>
                <tr>
                  <td colSpan="5" className="cam-heading">
                    <b>Camera</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" rowSpan="2">
                    <img src={camView} alt="CamView" width={150} height={150} />
                    <br />
                    <button className="btn btn-primary mt-2">Capture</button>
                  </td>
                  <td colSpan="2" rowSpan="2">
                    <img src={camView} alt="CamView" width={150} height={150} />
                    <br />
                    <button className="btn btn-primary mt-2">Captrue</button>
                  </td>
                  {/* <td><img src={camView} alt="CamView" width={100} height={75} /></td> */}
                </tr>
                <tr>
                  {/* <td><img src={camView} alt="CamView" width={100} height={75} /></td> */}
                </tr>
                <tr>
                  <td colSpan="2" rowSpan="2">
                    <img src={camView} alt="CamView" width={150} height={150} />
                    <br />
                    <button className="btn btn-primary mt-2">Capture</button>
                  </td>
                  <td colSpan="2" rowSpan="2">
                    <img src={camView} alt="CamView" width={150} height={150} />
                    <br />
                    <button className="btn btn-primary mt-2">Capture</button>
                  </td>
                  {/* <td><img src={camView} alt="CamView" width={100} height={75} /></td> */}
                </tr>
                <tr>
                  {/* <td><img src={camView} alt="CamView" width={100} height={75} /></td> */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row justify-content-center mt-6 mb-2">
          <div className="col-md-6 text-center">
            <button onClick={handleSave} className="btn btn-success me-4">
              Save
            </button>
            <button onClick={handleClear} className="btn btn-secondary">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default VehicleEntryDetails;
 