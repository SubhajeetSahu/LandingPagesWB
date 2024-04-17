import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faTruck,
  faPrint,
  faVideo,
  faFileAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../Pages/header"; 
import Sidebar from "../../Pages/Sidebar"; 

const VehicleEntryDetails = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        date: "",
        inTime: "",
        poNo: "",
        challanNo: "",
        customer: "",
        supplier: "",
        vehicleNo: "",
        transporter: "",
        driverDLNo: "",
        driverName: "",
        department: "",
        product: "",
        eWayBillNo: "",
        tpNo: "", // Added tpNo field
        vehicleType: "", // Added vehicleType field
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear the other input field if either poNo or challanNo is filled
        if (name === "poNo" || name === "challanNo") {
            setFormData((prevData) => ({
                ...prevData,
                [name === "poNo" ? "challanNo" : "poNo"]: value ? "" : prevData[name === "poNo" ? "challanNo" : "poNo"],
            }));
        }
    };

    const handleSave = () => {
        if (!formData.vehicleNo || !formData.driverName || !formData.poNo || !formData.eWayBillNo) {
            alert("Please fill out all mandatory fields.");
            return;
        }

        navigate("/addTicket", { state: formData });
    };

    const handleClear = () => {
        setFormData({
            date: "",
            inTime: "",
            poNo: "",
            challanNo: "",
            customer: "",
            supplier: "",
            vehicleNo: "",
            transporter: "",
            driverDLNo: "",
            driverName: "",
            department: "",
            product: "",
            eWayBillNo: "",
            tpNo: "", // Reset tpNo field
            vehicleType: "", // Reset vehicleType field
        });
    };

    return (
        <div>
            <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000, // Ensure the header is above other content
    //   backgroundColor: "#333" // Example background color
    }} className="home-header d-flex justify-content-center">
      <h3 className="home-header-title text-4xl text-center text-uppercase text-white mt-3 d-flex justify-content-center align-items-center flex-wrap">
        Vehicle Entry Details
      </h3>
    </div>
            <Sidebar />
            <div className="main-content" style={{ marginLeft: "150px" }}>
        <div className="container-fluid">
          <div className="container" style={{ marginTop: "90px" }}>
            <div className="row justify-content-center">
                {/* Input fields */}
                {/* PO No */}
                <div className="col-md-3 mb-3">
                    <label htmlFor="poNo" className="form-label font-weight-bold">
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
                    <label htmlFor="tpNo" className="form-label font-weight-bold">
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
                        <button
                            className="btn btn-outline-primary"
                            style={{ position: 'absolute', right: '1px', top: '50%', transform: 'translateY(-50%)' }}
                            onClick={() => alert("Scan TP No")}
                        >
                            Scan
                        </button>
                    </div>
                </div>

                {/* Challan No */}
                <div className="col-md-3 mb-3">
                    <label htmlFor="challanNo" className="form-label font-weight-bold">
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
                    <label htmlFor="vehicleNo" className="form-label font-weight-bold">
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
                        <button
                            className="btn btn-outline-primary"
                            style={{ position: 'absolute', right: '1px', top: '50%', transform: 'translateY(-50%)' }}
                            onClick={() => alert("Scan Vehicle No")}
                        >
                            Scan
                        </button>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Fill up the user details:</h4>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="supplier" className="form-label font-weight-bold">
                                Supplier:
                            </label>
                            <input
                                type="text"
                                id="supplier"
                                name="supplier"
                                value={formData.supplier}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="vehicleType" className="form-label font-weight-bold">
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
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="transporter" className="form-label font-weight-bold">
                                Transporter:
                            </label>
                            <input
                                type="text"
                                id="transporter"
                                name="transporter"
                                value={formData.transporter}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="product" className="form-label font-weight-bold">
                                Product:
                            </label>
                            <input
                                type="text"
                                id="product"
                                name="product"
                                value={formData.product}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col-md-6">
    <label htmlFor="driverDLNo" className="form-label font-weight-bold">
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
        <button
            className="btn btn-outline-primary"
            style={{ marginLeft: '5px' }} // Adjust the margin-left to create space between the input box and the button
            onClick={() => alert("Scan Driver DL No")}
        >
            Scan
        </button>
    </div>
</div>

                        <div className="col-md-6">
                            <label htmlFor="driverName" className="form-label font-weight-bold">
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
                            <label htmlFor="department" className="form-label font-weight-bold">
                                Department:
                            </label>
                            <input
                                type="text"
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6">
    <label htmlFor="eWayBillNo" className="form-label font-weight-bold">
        E-way Bill No:<span className="text-danger">*</span>
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
        <button
            className="btn btn-outline-primary"
            style={{ marginLeft: '5px' }} // Adjust the margin-left to create space between the input box and the button
            onClick={() => alert("Scan EWay Bill No")}
        >
            Scan
        </button>
    </div>
</div>

                    </div>
                </div>
                <div className="col-md-6 mt-4">
    <h4>Camera Views:</h4>
    <div className="row">
        {/* Front View */}
        <div className="col-md-6">
            <label htmlFor="frontView" className="form-label font-weight-bold">
                Front View:
            </label>
            <div>Front Camera Placeholder</div>
        </div>
        {/* Side View */}
        <div className="col-md-6">
            <label htmlFor="sideView" className="form-label font-weight-bold">
                Side View:
            </label>
            <div>Side Camera Placeholder</div>
        </div>
    </div>
    <div className="row mt-3">
        {/* Top View */}
        <div className="col-md-6">
            <label htmlFor="topView" className="form-label font-weight-bold">
                Top View:
            </label>
            <div>Top Camera Placeholder</div>
        </div>
        {/* Back View */}
        <div className="col-md-6">
            <label htmlFor="backView" className="form-label font-weight-bold">
                Back View:
            </label>
            <div>Back Camera Placeholder</div>
        </div>
    </div>
</div>
</div>
            
            <div className="row justify-content-center mt-4">
                <div className="col-md-6 text-center">
                    <button onClick={handleSave} className="btn btn-success me-2">Save</button>
                    <button onClick={handleClear} className="btn btn-secondary">Clear</button>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
    );
};

export default VehicleEntryDetails;