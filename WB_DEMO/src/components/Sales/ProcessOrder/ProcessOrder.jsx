import { useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from 'react-router-dom';
import "./ProcessOrder.css";
import SideBar6 from "../../SideBar/Sidebar6";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProcessOrder() {
  const location = useLocation();
  const { purchaseOrderNo, productName } = location.state || {};

  const [formPurchaseOrderNo, setFormPurchaseOrderNo] = useState(purchaseOrderNo || '');
  const [formProductName, setFormProductName] = useState(productName || '');
  const [productType, setProductType] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [transporterName, setTransporterName] = useState("");
  const [purchaseProcessDate, setPurchaseProcessDate] = useState("");
  const [error, setError] = useState("");

  const handleCancel = () => {
    setFormPurchaseOrderNo(purchaseOrderNo || '');
    setFormProductName(productName || '');
    setProductType("");
    setVehicleNo("");
    setTransporterName("");
    setPurchaseProcessDate("");
    setError("");
  };

  const handleSave = () => {
    if (
      !formPurchaseOrderNo ||
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
      purchaseOrderNo: formPurchaseOrderNo,
      productName: formProductName,
      productType,
      vehicleNo,
      transporterName,
      purchaseProcessDate,
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
        handleCancel();
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
          <div className="sales-process-card-container">
            <div
              className="card-body p-4"
              style={{ backgroundColor: "rgb(243,244,247)" }}
            >
              <form>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label htmlFor="purchaseOrderNo" className="form-label">
                      Purchase Order No{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="purchaseOrderNo"
                      placeholder="Enter Purchase Order No"
                      value={formPurchaseOrderNo}
                      onChange={(e) => setFormPurchaseOrderNo(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
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
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
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
                  <div className="col-md-6">
                    <label htmlFor="vehicleNo" className="form-label">
                      Vehicle No{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="vehicleNo"
                      placeholder="Enter Vehicle No"
                      value={vehicleNo}
                      onChange={(e) => setVehicleNo(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label htmlFor="transporterName" className="form-label">
                      Transporter Name{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="transporterName"
                      placeholder="Enter Transporter Name"
                      value={transporterName}
                      onChange={(e) => setTransporterName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="purchaseProcessDate" className="form-label">
                      Purchase Process Date{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="purchaseProcessDate"
                      value={purchaseProcessDate}
                      onChange={(e) => setPurchaseProcessDate(e.target.value)}
                      required
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
                      fontWeight: "600",
                    }}
                    onClick={handleCancel}
                  >
                    <FontAwesomeIcon icon={faTimes} className="me-1" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success-1 btn-hover"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      fontWeight: "600",
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