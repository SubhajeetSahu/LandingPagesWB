import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import "./ProcessOrder.css";
import SideBar6 from "../../SideBar/Sidebar6";
import { faSave, faEraser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProcessOrder() {
  const location = useLocation();
  const { saleOrderNo, productName } = location.state || {};
  const [formsaleOrderNo, setFormsaleOrderNo] = useState(saleOrderNo || "");
  const [formProductName, setFormProductName] = useState(productName || "");
  const [productType, setProductType] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [transporterName, setTransporterName] = useState("");
  const [purchaseProcessDate, setPurchaseProcessDate] = useState("");
  const [consignmentWeight, setConsignmentWeight] = useState("");
  const [error, setError] = useState("");
  const [vehicleNumbers, setVehicleNumbers] = useState([]);
  const [transporters, setTransporters] = useState([]);

  useEffect(() => {
    // Fetch vehicle numbers
    fetch("http://localhost:8080/api/v1/vehicles")
      .then((response) => response.json())
      .then((data) => {
        const numbers = data.map((vehicle) => ({
          value: vehicle.vehicleNo,
          label: vehicle.vehicleNo
        }));
        setVehicleNumbers(numbers);
      })
      .catch((error) => console.error("Error fetching vehicle numbers:", error));
  }, []);

  useEffect(() => {
    if (vehicleNo) {
      // Fetch transporter details when a vehicle number is selected
      fetch(`http://localhost:8080/api/v1/vehicles/${vehicleNo.value}`)
        .then((response) => response.json())
        .then((data) => {
          setTransporters(data.transporter);
        })
        .catch((error) =>
          console.error("Error fetching transporter details:", error)
        );
    }
  }, [vehicleNo]);

  const handleClear = () => {
    setFormsaleOrderNo("");
    setFormProductName("");
    setProductType("");
    setVehicleNo("");
    setTransporterName("");
    setPurchaseProcessDate("");
    setConsignmentWeight("");
    setError("");
  };

  const handleSave = () => {
    if (
      !formsaleOrderNo ||
      !vehicleNo ||
      !transporterName ||
      !purchaseProcessDate
    ) {
      Swal.fire({
        title: "Please fill in all the required fields.",
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
      return;
    }

    const salesProcessData = {
      saleOrderNo: formsaleOrderNo,
      productName: formProductName,
      productType,
      vehicleNo: vehicleNo.value,
      transporterName,
      purchaseProcessDate,
      consignmentWeight,
    };

    fetch("http://localhost:8080/api/v1/salesProcess/salesProcess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salesProcessData),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }
      })
      .then((data) => {
        console.log("Response from the API:", data);
        Swal.fire({
          title: "Sales process added successfully",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
        handleClear();
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.message);
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
      });
  };

  return (
    <SideBar6>
      <div className="sales-process-management">
        <div className="sales-process-main-content">
          <h2 className="text-center">Sales Process Management</h2>
          <div className="sales-process-card-container container-fluid">
            <div
              className="card-body p-4"
              style={{ backgroundColor: "rgb(243,244,247)" }}
            >
              <form>
                <div className="row mb-2">
                  <div className="col-md-4">
                    <label htmlFor="purchaseOrderNo" className="form-label">
                      Sales Order No{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="purchaseOrderNo"
                      placeholder="Enter Purchase Order No"
                      value={formsaleOrderNo}
                      onChange={(e) => setFormsaleOrderNo(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="productName" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      placeholder="Enter Product Name"
                      value={formProductName}
                      onChange={(e) => setFormProductName(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="productType" className="form-label">
                      Product Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productType"
                      placeholder="Enter Product Type"
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label htmlFor="vehicleNo" className="form-label">
                      Vehicle No{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <Select
                      options={vehicleNumbers}
                      value={vehicleNo}
                      onChange={setVehicleNo}
                      id="vehicleNo"
                      placeholder="Select Vehicle No"
                      isSearchable
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="transporterName"
                      className="form-label"
                    >
                      Transporter Name{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <button className="btn btn-sm border" style={{borderRadius: "5px", marginLeft: "5px", backgroundColor: "lightblue"}}>
                    <a href="/SalesTransporter" style={{display: "block", textDecoration: "none", color:"black"}}>Add Transporter</a>
                    </button>
                    <select
                      className="form-select"
                      id="transporterName"
                      value={transporterName}
                      onChange={(e) => setTransporterName(e.target.value)}
                      required
                    >
                      <option value="">Select Transporter Name</option>
                      {transporters.map((transporter, index) => (
                        <option key={index} value={transporter}>
                          {transporter}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-6">
                    <label
                      htmlFor="purchaseProcessDate"
                      className="form-label"
                    >
                      Purchase Process Date{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="purchaseProcessDate"
                      value={purchaseProcessDate}
                      onChange={(e) =>
                        setPurchaseProcessDate(e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="consignmentWeight"
                      className="form-label"
                    >
                      Consignment Weight
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="consignmentWeight"
                      placeholder="Enter Consignment Weight"
                      value={consignmentWeight}
                      onChange={(e) => {
                        const newValue = Math.max(
                          0,
                          parseFloat(e.target.value, 10)
                        );
                        setConsignmentWeight(newValue);
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <button
                    type="button"
                    className="btn btn-danger me-4 btn-hover"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid #cccccc",
                      width: "100px",
                    }}
                    onClick={handleClear}
                  >
                    <FontAwesomeIcon icon={faEraser} className="me-1" />
                    Clear
                  </button>
                  <button
                    type="button"
                    className="btn btn-success-1 btn-hover"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      width: "100px",
                      border: "1px solid #cccccc",
                    }}
                    onClick={handleSave}
                  >
                    <FontAwesomeIcon icon={faSave} className="me-1" />
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SideBar6>
  );
}

export default ProcessOrder;
