
import { useState, useEffect, useRef } from "react";
import { Chart, ArcElement } from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import Header from "../../../../Header/Header";
import SideBar2 from "../../../../SideBar/SideBar2";
// import camView from "../../assets/weighbridgeCam.webp";
import "./VehicleEntryDetails.css";
import scanner from "../../assets/scanner.png";
import Camera_Icon from "../../assets/Camera_Icon.png";
// import frontView from "../../assets/frontView.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import Select from "react-select";

function VehicleEntryDetails() {
  // const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const homeMainContentRef = useRef(null);
  const [suppliers, setSuppliers] = useState([]);
  const [suppliersAddressLine1, setSuppliersAddressLine1] = useState();
  const [transporter, setTransporter] = useState();
  const [materials, setMaterials] = useState([]);
  // const [transactionType, setTransactionType] = useState();
  const [materialType, setMaterialType] = useState([]);








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

    fetch(`http://localhost:8080/api/v1/supplier/get/${e.target.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Check if data is an array and has at least one element
        if (Array.isArray(data) && data.length > 0) {
          // Set the first element of the array as the supplier address
          setFormData((prevData) => ({
            ...prevData,
            supplierAddressLine1: data[0]
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching supplier Address:", error);
      });
  };



  // Get API for Material:

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

  // Get API for Material Type:
  const fetchMaterialType = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    //   try {
    //     const response = await fetch(
    //       `http://localhost:8080/api/v1/materials/${e.target.value}/types`,
    //       {
    //         method: "GET",
    //         credentials: "include"
    //       }
    //     );
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const data = await response.json();
    //     // Assuming data is an array of Materials, update state or handle data accordingly
    //     console.log(data); // Log the data to see its structure
    //     setMaterialType(data);
    //   } catch (error) {
    //     console.error("Error fetching Material Type:", error);
    //   }
    // };
    fetch(`http://localhost:8080/api/v1/materials/${e.target.value}/types`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Assuming data is an array of materialType names
        setMaterialType(data); // Update the state with the fetched material types
      })
      .catch((error) => {
        console.error("Error fetching material types:", error);
      });
  };


  // Get API Vehicle No.

  // const handleVehicleNoKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault(); // Prevent form submission
  //     // Call API with the entered vehicle number
  //     fetch(`http://localhost:8080/api/v1/vehicles/vehicle/${formData.vehicleNo}`)
  //       .then((response) => response.json())
  //       .then((data) => {

  //         // Set transporter state with the data from the API response
  //         setTransporter(data.transporter);
  //         // Update other form data fields with the received data
  //         setFormData((prevData) => ({
  //           ...prevData,
  //           vehicleNo: data.vehicleNo,
  //           noOfWheels: data.vehicleWheelsNo,
  //           vehicleType: data.vehicleType,
  //           transporter: data.transporter,
  //           rcFitnessUpto: data.vehicleFitnessUpTo
  //         }));
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching supplier Address:", error);
  //       });
  //   }
  // };

  const handleVehicleNoBlur = async () => {
    try {
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
            transporter: data.transporter,
            rcFitnessUpto: data.vehicleFitnessUpTo
          }));
        })
        .catch((error) => {
          console.error("Error fetching supplier Address:", error);
        });
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
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
    supplierAddressLine1: "",
    transporter: "",
    material: "",
    materialType: "",
    driverDLNo: "",
    driverName: "",
    tpNetWeight: "",
    rcFitnessUpto: "",
    department: "",
    eWayBillNo: "",
    transactionType: "Inbound"
  });

  // const departmentOptions = ["Department 1", "Department 2", "Department 3"];
  // const materialType = ["iron", "Sand", "coal"];
  // const supplier = ["MCL", "Hitesh Sol."];
  // const supplier = ["", " "];

  // const transporterOptions = ["Swift Transport Solutions","Mahanrani Inc."];
  // const transporterOptions = ["", ""];
  // const transactionType = ["Inbound"];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Disable TP No if PO No is entered and vice versa
    if (name === "poNo") {
      setFormData((prevData) => ({
        ...prevData,
        tpNo: value ? "" : prevData.tpNo,
      }));
    } else if (name === "tpNo") {
      setFormData((prevData) => ({
        ...prevData,
        poNo: value ? "" : prevData.poNo,
      }));
    }
  };

  const handleSave = () => {
    if (
      (!formData.poNo && !formData.tpNo) ||
      !formData.vehicleNo ||
      !formData.driverDLNo ||
      !formData.driverName ||
      !formData.challanNo
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
      supplierAddressLine1: formData.supplierAddressLine1,
      transporter: transporter.toString(),
      material: formData.material,
      materialType: formData.materialType,
      vehicle: formData.vehicleNo,
      dlNo: formData.driverDLNo,
      driverName: formData.driverName,
      supplyConsignmentWeight: formData.tpNetWeight,
      poNo: formData.poNo,
      tpNo: formData.tpNo,
      challanNo: formData.challanNo,
      ewayBillNo: formData.eWayBillNo,
      // department: formData.department,
      transactionType: formData.transactionType
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
            susupplierAddressLine1: "",
            transporter: "",
            material: "",
            materialType: "",
            driverDLNo: "",
            driverName: "",
            tpNetWeight: "",
            rcFitnessUpto: "",
            // department: "",
            eWayBillNo: "",
            transactionType: "Inbound"
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
      supplierAddressLine1: "",
      transporter: "",
      material: "",
      materialType: "",
      driverDLNo: "",
      driverName: "",
      tpNetWeight: "",
      rcFitnessUpto: "",
      // department: "",
      eWayBillNo: "",
      transactionType: "Inbound "
    });
  };

  const handleCapturePicture = () => {
    // Make a request to the backend to capture the picture
    // Display a Swal modal indicating that the picture will be coming from the backend
    Swal.fire({
      icon: "info",
      title: "Picture will be coming from backend",
      text: "Please wait...",
      customClass: {
        popup: 'my-popup-class',
        title: 'my-title-class',
        content: 'my-content-class'
      }
    });
  };


  return (
    <SideBar2>
      <div>
        {/* <Header toggleSidebar={toggleSidebar} />
      <SideBar2
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      /> */}
        <div className="VehicleEntryDetailsMainContent"  >
          <h2 className="text-center mb-4">Vehicle Entry Inbound Details</h2>
          {/* Challan Date */}
          <div className="row move-left">
            <div className="col-md-3 mb-3">
              <label htmlFor="challanDate" className="user-form-label">
                Challan Date:
              </label>
              <input
                type="date"
                id="challanDate"
                name="challanDate"
                value={formData.challanDate}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            {/* Challan No */}
            <div className="col-md-3 mb-3">
              <label htmlFor="challanNo" className="user-form-label ">
                Challan No:
                {/* <span style={{ color: "red", fontWeight: "bold" }}>*</span> */}
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
            {/* PO No */}
            <div className="col-md-3 mb-3">
              <label htmlFor="poNo" className="user-form-label ">
                PO No:
                {/* <span style={{ color: "red", fontWeight: "bold" }}>*</span> */}
              </label>
              <input
                type="text"
                id="poNo"
                name="poNo"
                value={formData.poNo}
                onChange={handleChange}
                required
                className="form-control"
                disabled={!!formData.tpNo} // Disable if tpNo has a value
              />
            </div>
            <div className="col-md-3 mb-3 position-relative">
              <label htmlFor="tpNo" className="user-form-label ">
                TP No:
                {/* <span style={{ color: "red", fontWeight: "bold" }}>*</span> */}
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="tpNo"
                  name="tpNo"
                  value={formData.tpNo}
                  onChange={handleChange}
                  required
                  className="form-control tpscanner"
                  disabled={!!formData.poNo} // Disable if poNo has a value
                />
                <button
                  className="scanner_button1"
                  style={{ marginLeft: "2px" }} // Adjust the margin-left to create space between the input box and the button
                  onClick={() => alert("Scan TP No")}
                  disabled={!!formData.poNo}
                >
                  {/* Use the imported scanner image */}
                  <img
                    src={scanner}
                    alt="Scanner"
                  // style={{ width: "25px", height: "25px" }}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="row move-left">

            {/* Vehicle No */}
            <div className="col-md-3 mb-3 position-relative">
              <label htmlFor="vehicleNo" className="user-form-label ">
                Vehicle No:
                <span style={{ color: "red", fontWeight: "bold" }}>*</span>
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="vehicleNo"
                  name="vehicleNo"
                  value={formData.vehicleNo}
                  onChange={handleChange}
                  required
                  className="form-control tpscanner"
                  // onKeyDown={handleVehicleNoKeyPress}
                  onBlur={handleVehicleNoBlur}
                />
                {/* <Select
                  options={vehicleNo}
                  value={formData.vehicleNo}
                  onChange={setVehicleNo}
                  id="vehicleNo"
                  placeholder="Select Vehicle No"
                  isSearchable
                  required
                /> */}

                {/* Replace "Scan" button with FaCamera icon */}
                <button
                  className="scanner_button2"
                  style={{ marginLeft: "2px" }} // Adjust the margin-left to create space between the input box and the button
                  onClick={() => alert("Scan Vehicle No")}
                >
                  {/* Use the imported scanner image */}
                  <img
                    src={scanner}
                    alt="Scanner"
                  // style={{ width: "25px", height: "25px" }}
                  />
                </button>
              </div>
            </div>
            {/* Material */}
            <div className="col-md-3 mb-3 position-relative">
              <label htmlFor="material" className="user-form-label">
                Material:
              </label>
              <select
                id="material"
                name="material"
                value={formData.material}
                onChange={fetchMaterialType}
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
            {/* Material Type */}
            <div className="col-md-3 mb-3 position-relative">
              <label htmlFor="materialType" className="user-form-label">
                Material Type:
              </label>
              <select
                id="materialType"
                name="materialType"
                value={formData.materialType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select material Type</option>
                {materialType.map((materialType, index) => (
                  <option key={index} value={materialType}>
                    {materialType}
                  </option>
                ))}
              </select>
            </div>
            {/* E-way Bill No */}
            <div className="col-md-3 mb-3 position-relative ">
              <label htmlFor="eWayBillNo" className="user-form-label">
                E-way Bill No:
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="eWayBillNo"
                  name="eWayBillNo"
                  value={formData.eWayBillNo}
                  onChange={handleChange}
                  // required
                  className="form-control tpscanner"
                />
                {/* Replace "Scan" button with FaCamera icon */}
                <button

                  className="scanner_button4"
                  style={{ marginLeft: "2px" }}
                  onClick={() => alert("Scan E-WayBill No")}
                >
                  {/* Use the imported scanner image */}
                  <img
                    src={scanner}
                    alt="Scanner"
                  // style={{ width: "25px", height: "25px" }}
                  />
                </button>
              </div>
            </div>
          </div>
          {/* <div className="row move-left">
            <h4 className="userdetail">Fill up the user details:</h4>
          </div> */}
          <div className="row move-left">
            <div className="col-md-6 ">
              {/* Input fields */}
              {/* <h4 className="userdetail">Fill up the user details:</h4> */}
              <div className="row mb-3 move-left  ">
                <div className="col-md-6 inputbox-padding">
                  <label htmlFor="vehicleType" className="user-form-label">
                    Vehicle Type:
                  </label>
                  <input
                    type="text"
                    id="vehicleType"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="form-control"
                    disabled={!formData.vehicleNo}
                    style={{ backgroundColor: '#efefef', color: '#818181' }}
                  />
                </div>
                <div className="col-md-6 position-relative inputbox1-padding">
                  <label htmlFor="noOfWheels" className="user-form-label">
                    No of Wheels:
                  </label>
                  <input
                    type="text"
                    id="noOfWheels"
                    name="noOfWheels"
                    value={formData.noOfWheels}
                    onChange={handleChange}
                    className="form-control"
                    disabled={!formData.vehicleNo}
                    style={{ backgroundColor: '#efefef', color: '#818181' }}
                  />
                </div>
              </div>
              <div className="row mb-3 move-left">
                {/* Transporter */}
                <div className="col-md-6 inputbox-padding">
                  <label htmlFor="transporter" className="user-form-label ">
                    Transporter:
                  </label>
                  <input
                    type="text"
                    id="transporter"
                    name="transporter"
                    value={formData.transporter}
                    onChange={handleChange}
                    className="form-control"
                    // placeholder="Enter Transporter"
                    disabled={!formData.vehicleNo}
                    style={{ backgroundColor: '#efefef', color: '#818181' }}
                  />
                </div>
                {/* Rc fitness upto */}
                <div className="col-md-6 position-relative inputbox1-padding">
                  <label htmlFor="rcFitnessUpto" className="user-form-label">
                    RC Fitness Upto:
                    {/* <span style={{ color: "red", fontWeight: "bold" }}>*</span> */}
                  </label>
                  <input
                    type="text"
                    id="rcFitnessUpto"
                    name="rcFitnessUpto"
                    value={formData.rcFitnessUpto}
                    onChange={handleChange}
                    // required
                    className="form-control"
                    disabled={!formData.vehicleNo}
                    style={{ backgroundColor: '#efefef', color: '#818181' }}
                  />
                </div>

              </div>
              <div className="row mb-3 move-left">
                {/* Supplier dropdown */}
                <div className="col-md-6 inputbox-padding">
                  <label htmlFor="supplier" className="user-form-label ">
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
                <div className="col-md-6 position-relative inputbox1-padding">
                  <label htmlFor="supplierContactNo" className="user-form-label">
                    Supplier's Address:
                  </label>
                  <input
                    type="text"
                    id="supplierAddressLine1"
                    name="supplierAddressLine1"
                    value={formData.supplierAddressLine1}
                    onChange={handleChange}
                    className="form-control"
                    disabled={!formData.supplier}
                    style={{ backgroundColor: '#efefef', color: '#818181' }}
                  />
                </div>


              </div>
              <div className="row mb-3 move-left">
                <div className="col-md-6 inputbox-padding">
                  <label htmlFor="driverDLNo" className="user-form-label ">
                    Driver DL No:
                    <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      id="driverDLNo"
                      name="driverDLNo"
                      value={formData.driverDLNo}
                      onChange={handleChange}
                      required
                      className="form-control tpscanner"
                    />
                    <button
                      className="scanner_button3"
                      style={{ marginLeft: "2px" }} // Adjust the margin-left to create space between the input box and the button
                      onClick={() => alert("Scan Driver DL No")}
                    >
                      {/* Use the imported scanner image */}
                      <img
                        src={scanner}
                        alt="Scanner"
                      // style={{ width: "25px", height: "25px" }}
                      />
                    </button>
                  </div>
                </div>

                <div className="col-md-6 position-relative inputbox1-padding">
                  <label htmlFor="driverName" className="user-form-label">
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
              <div className="row mb-3 move-left">
                {/* TP Net weight */}
                <div className="col-md-6 inputbox-padding">
                  <label htmlFor="tpNetWeight" className="user-form-label">
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
                {/* Department dropdown */}
                {/* <div className="col-md-6 position-relative inputbox1-padding">
                  <label htmlFor="department" className="user-form-label">
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
              </div>
            </div>

            <div className="col-md-6 ">
              {/* Camera view */}
              <table className=" camview1 table">
                <tbody>
                  <tr>
                    <td
                    // colSpan="1"
                    // rowSpan="1"
                    // style={{
                    //   position: "relative",
                    //   width: "80px",
                    //   height: "180px",
                    //   border: "1px solid"
                    // }}

                    >
                      <div className="camview1">
                        <span style={{ marginRight: "5px" }}>Front-View</span>
                        <button
                          className="table-btn"
                          style={{ position: "absolute", bottom: 0, right: 0, border: "0px" }}
                          onClick={handleCapturePicture}
                        >
                          <img
                            src={Camera_Icon}
                            alt="Captured"
                            style={{ width: "45px", height: "36px" }}
                          />
                        </button>
                      </div>
                    </td>
                    <td
                    // colSpan="1"
                    // rowSpan="1"
                    // style={{
                    //   position: "relative",
                    //   width: "80px",
                    //   height: "180px",
                    //   border: "1px solid"
                    // }}
                    >
                      <div className="camview1">
                        <span style={{ marginRight: "5px" }}>Back-View</span>
                        <button
                          // className="btn btn-primary"
                          className="table-btn"
                          style={{ position: "absolute", bottom: 0, right: 0, border: "0px" }}
                          onClick={handleCapturePicture}
                        >
                          <img
                            src={Camera_Icon}
                            alt="Captured"
                            style={{ width: "45px", height: "36px" }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td
                    // colSpan="1"
                    // rowSpan="1"
                    // style={{
                    //   position: "relative",
                    //   width: "80px",
                    //   height: "180px",
                    //   border: "1px solid"
                    // }}
                    >
                      <div className="camview1">
                        <span style={{ marginRight: "5px" }}>Top-View</span>
                        <button
                          // className="btn btn-primary"
                          className="table-btn"
                          style={{ position: "absolute", bottom: 0, right: 0, border: "0px" }}
                          onClick={handleCapturePicture}
                        >
                          <img
                            src={Camera_Icon}
                            alt="Captured"
                            style={{ width: "45px", height: "36px" }}
                          />
                        </button>
                      </div>
                    </td>
                    <td
                    // colSpan="2"
                    // rowSpan="2"
                    // style={{
                    //   position: "relative",
                    //   width: "80px",
                    //   height: "180px",
                    //   border: "1px solid"
                    // }}
                    >
                      <div className="camview1">
                        <span style={{ marginRight: "5px" }}>Side-View</span>
                        <button
                          className="table-btn"
                          style={{ position: "absolute", bottom: 0, right: 0, border: "0px", }}
                          onClick={handleCapturePicture}
                        >
                          <img
                            src={Camera_Icon}
                            alt="Captured"
                            style={{ width: "45px", height: "36px" }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr></tr>
                </tbody>
              </table>

              <div style={{ height: 20 }}></div> {/* spacer div */}
              {/* Save and Clear buttons */}
              <div className="row justify-content-end mt-6 mb-2">
                <div className="col-md-6 col-sm-12 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-danger me-4 btn-hover"
                    style={{
                      backgroundColor: "white",
                      color: "#d63031",
                      border: "1px solid #cccccc",
                      width: "100px",
                    }}
                    onClick={handleClear}
                  // className="myclear-btn btn-secondary me-md-2 me-sm-1 my-btn-clear"
                  >
                    <FontAwesomeIcon icon={faEraser} className="me-1" /> Clear
                  </button>
                  <button
                    type="button"
                    className="btn btn-success-1 btn-hover"
                    style={{
                      backgroundColor: "white",
                      color: "#008060 ",
                      width: "100px",
                      border: "1px solid #cccccc",
                    }}
                    onClick={handleSave}
                  // onClick={handleSave} className="mysave-btn btn-success me-md-2 me-sm-1 my-btn-save"
                  >
                    <FontAwesomeIcon icon={faSave} className="me-1" /> Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBar2>

  );
}

export default VehicleEntryDetails;
