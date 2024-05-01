// VehicleEntryDetails.jsx
import { useState, useEffect, useRef } from "react";
import { Chart, ArcElement } from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../../../../Header/Header";
import SideBar2 from "../../../../SideBar/SideBar2";
import camView from "../../assets/weighbridgeCam.webp";
import "./VehicleEntryDetails.css";
import ScannerImg from "../../assets/ScannerImg.png";
import Camera_Icon from "../../assets/Camera_Icon.png";
import Swal from "sweetalert2";
 
function VehicleEntryDetails() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const homeMainContentRef = useRef(null);
  const [suppliers, setSuppliers] = useState([]);
  // const [suppliersAddress, setSuppliersAddress] = useState();
  const [transporter, setTransporter] = useState([]);
  const [materials, setMaterials] = useState([]);
 
 
 
 
 
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
 
  // Get API for Supplier
  useEffect(() => {
    const fetchSupplierList = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/supplier/get/list",
          {
            method: "GET",
            credentials: "include"
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Assuming data is an array of suppliers, update state or handle data accordingly
        console.log(data); // Log the data to see its structure
        setSuppliers(data);
      } catch (error) {
        console.error("Error fetching supplier list:", error);
      }
    };
 
    fetchSupplierList();
  }, []);
 
  // onChangeSupplier
  const handleSupplierChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
 
    // alert(e.target.value);
 
    fetch(`http://localhost:8080/api/v1/supplier/get/${e.target.value}`)
      .then((response) => response.text())
      .then((data) => {
 
        console.log(data);
        setFormData((prevData) => ({
          ...prevData,
          supplierAddress: data
        }));
      })
      .catch((error) => {
        console.error("Error fetching supplier Address:", error);
      });
  };
 
  // Get Api for Transporter:
 
  // useEffect(() => {
  //   const fetchTransporterList = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:8080/api/v1/transporter",
  //         {
  //           method: "GET",
  //           credentials: "include"
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       // Assuming data is an array of transporter, update state or handle data accordingly
  //       console.log(data); // Log the data to see its structure
  //       setTransporter(data);
  //     } catch (error) {
  //       console.error("Error fetching Transporter list:", error);
  //     }
  //   };
 
  //   fetchTransporterList();
  // }, []);
 
  // Get API for MAterial:
 
  useEffect(() => {
    const fetchMaterialList = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/materials/names",
          {
            method: "GET",
            credentials: "include"
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Assuming data is an array of Materials, update state or handle data accordingly
        console.log(data); // Log the data to see its structure
        setMaterials(data);
      } catch (error) {
        console.error("Error fetching Materials list:", error);
      }
    };
 
    fetchMaterialList();
  }, []);
 
  // Get API Vehicle No.
 
  const handleVehicleNoKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      // Call API with the entered vehicle number
      fetch(`http://localhost:8080/api/v1/vehicles/vehicle/${formData.vehicleNo}`)
        .then((response) => response.json())
        .then((data) => {
 
          // Set transporter state with the data from the API response
          setTransporter(data.transporter);
          // Update other form data fields with the received data
          setFormData((prevData) => ({
            ...prevData,
            vehicleNo: data.vehicleNo,
            noOfWheels: data.vehicleWheelsNo,
            vehicleType: data.vehicleType,
            rcFitnessUpto: data.vehicleFitnessUpTo
          }));
        })
        .catch((error) => {
          console.error("Error fetching supplier Address:", error);
        });
    }
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
    poNo: "",
    tpNo: "",
    challanNo: "",
    vehicleNo: "",
    vehicleType: "",
    noOfWheels: "",
    supplier: "",
    supplierAddress: "",
    transporter: "",
    material: "",
    driverDLNo: "",
    driverName: "",
    tpNetWeight: "",
    rcFitnessUpto: "",
    department: "",
    eWayBillNo: "",
  });
 
  // const departmentOptions = ["Department 1", "Department 2", "Department 3"];
  // const materialtOptions = ["iron", "lumps", "coal"];
  // const supplier = ["MCL", "Hitesh Sol."];
  // const supplier = ["", " "];
 
  // const transporterOptions = ["Swift Transport Solutions","Mahanrani Inc."];
  // const transporterOptions = ["", ""];
 
 
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all mandatory fields.",
      });
      return;
    }
 
    const gateData = {
      // userId,
      supplier: formData.supplier,
      transporter: formData.transporter,
      material: formData.material,
      vehicle: formData.vehicleNo,
      dlNo: formData.driverDLNo,
      driverName: formData.driverName,
      supplyConsignmentWeight: formData.tpNetWeight,
      poNo: formData.poNo,
      tpNo: formData.tpNo,
      challanNo: formData.challanNo,
      ewayBillNo: formData.eWayBillNo
    };
 
    // Create JSON payload
    const payload = JSON.stringify(gateData);
    console.log("payload", payload);
    // Fetch API
    fetch("http://localhost:8080/api/v1/gate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
 
      },
      body: payload,
      credentials: "include"
    })
      .then((response) => response.json())
      .then((data) => {
        // Show success message
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Data saved Successfully!",
        });
 
        // Reset form data after 3 seconds and navigate to VehicleEntry page
        setTimeout(() => {
          setFormData({
            poNo: "",
            tpNo: "",
            challanNo: "",
            vehicleNo: "",
            vehicleType: "",
            noOfWheels: "",
            supplier: "",
            supplierAddress: "",
            transporter: "",
            material: "",
            driverDLNo: "",
            driverName: "",
            tpNetWeight: "",
            rcFitnessUpto: "",
            department: "",
            eWayBillNo: "",
          });
          navigate("/VehicleEntry");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
 
  const handleClear = () => {
    setFormData({
      poNo: "",
      tpNo: "",
      challanNo: "",
      vehicleNo: "",
      vehicleType: "",
      noOfWheels: "",
      supplier: "",
      supplierAddress: "",
      transporter: "",
      material: "",
      driverDLNo: "",
      driverName: "",
      tpNetWeight: "",
      rcFitnessUpto: "",
      department: "",
      eWayBillNo: "",
    });
  };
 
  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <SideBar2
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div
        className="VehicleEntryDetailsMainContent"
        style={{ marginTop: "100px", marginRight: "140px" }}
      >
        <h2 className="text-center mb-4">Vehicle Entry Inbound Details</h2>
        <div className="row">
          {/* Input fields */}
          {/* PO No */}
          <div className="col-md-3 mb-3">
            <label htmlFor="poNo" className="form-label ">
              PO No:<span style={{ color: "red", fontWeight: "bold" }}>*</span>
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
    TP No:<span style={{ color: "red", fontWeight: "bold" }}>*</span>
  </label>
  <div className="input-group" style={{ position: "relative" }}>
    <input
      type="text"
      id="tpNo"
      name="tpNo"
      value={formData.tpNo}
      onChange={handleChange}
      required
      className="form-control"
    />
    <button
      className="btn btn-outline-primary"
      style={{ position: "absolute", right: "0", top: "0px", margin: "auto", zIndex: 1, height: "calc(100% - 15px)" }}
      onClick={() => alert("Scan TP No")}
    >
      <img
        src={ScannerImg}
        alt="Scanner"
        style={{ width: "25px", height: "25px" }}
      />
    </button>
  </div>
</div>



 
          {/* Challan No */}
          <div className="col-md-3 mb-3">
            <label htmlFor="challanNo" className="form-label ">
              Challan No:
              <span style={{ color: "red", fontWeight: "bold" }}>*</span>
            </label>
            <input
              type="text"
              id="challanNo"
              name="challanNo"
              value={formData.challanNo}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          {/* Vehicle No */}
          <div className="col-md-3 mb-3 position-relative">
  <label htmlFor="vehicleNo" className="form-label ">
    Vehicle No:
    <span style={{ color: "red", fontWeight: "bold" }}>*</span>
  </label>
  <div className="input-group" style={{ position: "relative" }}>
    <input
      type="text"
      id="vehicleNo"
      name="vehicleNo"
      value={formData.vehicleNo}
      onChange={handleChange}
      required
      className="form-control"
      onKeyDown={handleVehicleNoKeyPress}
    />
    {/* Replace "Scan" button with FaCamera icon */}
    <button
      className="btn btn-outline-primary"
      style={{ position: "absolute", right: "0", top: "0px", margin: "auto", zIndex: 1, height: "calc(100% - 15px)" }}
      onClick={() => alert("Scan Vehicle No")}
    >
      {/* Use the imported scanner image */}
      <img
        src={ScannerImg}
        alt="Scanner"
        style={{ width: "25px", height: "25px" }}
      />
    </button>
  </div>
</div>




          <div className="col-md-6">
            {/* Input fields */}
            <h4>Fill up the user details:</h4>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="vehicleType" className="form-label">
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
                <label htmlFor="noOfWheels" className="form-label">
                  No of Wheels:
                </label>
                <input
                  type="text"
                  id="noOfWheels"
                  name="noOfWheels"
                  value={formData.noOfWheels}
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
                  onChange={handleSupplierChange}
                  className="form-select"
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map((s, index) => (
                    <option key={index} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
 
              <div className="col-md-6">
                <label htmlFor="supplierContactNo" className="form-label ">
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
                  {/* Populate the dropdown options from the transporter state */}
                  {transporter.map((t, index) => (
                    <option key={index} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
 
              {/* Product dropdown */}
              <div className="col-md-6">
                <label htmlFor="material" className="form-label ">
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
                  {materials.map((m, index) => (
                    <option key={index} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Driver DL No */}
            <div className="row mb-3">
  <div className="col-md-6">
    <label htmlFor="driverDLNo" className="form-label ">
      Driver DL No:
      <span style={{ color: "red", fontWeight: "bold" }}>*</span>
    </label>
    <div className="input-group" style={{ position: "relative" }}>
      <input
        type="text"
        id="driverDLNo"
        name="driverDLNo"
        value={formData.driverDLNo}
        onChange={handleChange}
        required
        className="form-control"
      />
      <button
        className="btn btn-outline-primary"
        style={{ position: "absolute", right: "0", top: "0px", margin: "auto", zIndex: 1, height: "calc(100% - 15px)" }}
        onClick={() => alert("Scan Driver DL No")}
      >
        {/* Use the imported scanner image */}
        <img
          src={ScannerImg}
          alt="Scanner"
          style={{ width: "25px", height: "25px" }}
        />
      </button>
    </div>
  </div>

 
              <div className="col-md-6">
                <label htmlFor="driverName" className="form-label ">
                  Driver Name:
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
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
                <label htmlFor="tpNetWeight" className="form-label ">
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
                <label htmlFor="rcFitnessUpto" className="form-label ">
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
              {/* <div className="col-md-6">
                <label htmlFor="department" className="form-label ">
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
              </div> */}
              {/* E-way Bill No */}
              <div className="col-md-6">
  <label htmlFor="eWayBillNo" className="form-label ">
    E-way Bill No:
  </label>
  <div className="input-group" style={{ position: "relative" }}>
    <input
      type="text"
      id="eWayBillNo"
      name="eWayBillNo"
      value={formData.eWayBillNo}
      onChange={handleChange}
      className="form-control"
    />
    <button
      className="btn btn-outline-primary"
      style={{ position: "absolute", right: "0", top: "0px", margin: "auto", zIndex: 1, height: "calc(100% - 15px)" }}
      onClick={() => alert("Scan E-WayBill No")}
    >
      {/* Use the imported scanner image */}
      <img
        src={ScannerImg}
        alt="Scanner"
        style={{ width: "25px", height: "25px" }}
      />
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
                  <td
                    colSpan="2"
                    rowSpan="2"
                    style={{
                      position: "relative",
                      width: "180px",
                      height: "180px",
                    }}
                  >
                    <span style={{ marginRight: "5px" }}>Front-View</span>
                    <button
                      className="btn btn-primary"
                      style={{ position: "absolute", bottom: 0, right: 0 }}
                    >
                      <img
                        src={Camera_Icon}
                        alt="Captured"
                        style={{ width: "25px", height: "25px" }}
                      />
                    </button>
                  </td>
                  <td
                    colSpan="2"
                    rowSpan="2"
                    style={{
                      position: "relative",
                      width: "180px",
                      height: "180px",
                    }}
                  >
                    <span style={{ marginRight: "5px" }}>Back-View</span>
                    <button
                      className="btn btn-primary"
                      style={{ position: "absolute", bottom: 0, right: 0 }}
                    >
                      <img
                        src={Camera_Icon}
                        alt="Captured"
                        style={{ width: "25px", height: "25px" }}
                      />
                    </button>
                  </td>
                </tr>
                <tr></tr>
                <tr>
                  <td
                    colSpan="2"
                    rowSpan="2"
                    style={{
                      position: "relative",
                      width: "180px",
                      height: "180px",
                    }}
                  >
                    <span style={{ marginRight: "5px" }}>Top-View</span>
                    <button
                      className="btn btn-primary"
                      style={{ position: "absolute", bottom: 0, right: 0 }}
                    >
                      <img
                        src={Camera_Icon}
                        alt="Captured"
                        style={{ width: "25px", height: "25px" }}
                      />
                    </button>
                  </td>
                  <td
                    colSpan="2"
                    rowSpan="2"
                    style={{
                      position: "relative",
                      width: "180px",
                      height: "180px",
                    }}
                  >
                    <span style={{ marginRight: "5px" }}>Side-View</span>
                    <button
                      className="btn btn-primary"
                      style={{ position: "absolute", bottom: 0, right: 0 }}
                    >
                      <img
                        src={Camera_Icon}
                        alt="Captured"
                        style={{ width: "25px", height: "25px" }}
                      />
                    </button>
                  </td>
                </tr>
                <tr></tr>
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
}
 
export default VehicleEntryDetails;