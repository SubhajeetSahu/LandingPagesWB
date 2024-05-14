import React, { useState } from "react";
import Swal from "sweetalert2";
import "./SalesOrder.css";
import SideBar6 from "../../SideBar/Sidebar6";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SalesOrder() {
  const [purchaseOrderedDate, setPurchaseOrderedDate] = useState("");
  const [saleOrderNo, setSaleOrderNo] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [productName, setProductName] = useState("");
  const [orderedQuantity, setOrderedQuantity] = useState("");
  const [brokerName, setBrokerName] = useState("");
  const [brokerAddress, setBrokerAddress] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handleCancel = () => {
    setPurchaseOrderedDate("");
    setSaleOrderNo("");
    setCustomerName("");
    setCustomerAddress("");
    setCustomerContact("");
    setCustomerEmail("");
    setProductName("");
    setOrderedQuantity("");
    setBrokerName("");
    setBrokerAddress("");
    setEmailError("");
    setPhoneError("");
  };

  const handleSave = () => {
    let emailIsValid = true;
    let phoneIsValid = true;

    if (
      !purchaseOrderedDate ||
      !customerName ||
      !customerAddress ||
      !customerEmail ||
      !productName ||
      !orderedQuantity
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (customerEmail !== "" && !emailRegex.test(customerEmail)) {
      setEmailError("Please enter a valid email address.");
      emailIsValid = false;
    } else {
      setEmailError("");
    }

    const phoneRegex = /^\d{10}$/;
    if (customerContact !== "" && !phoneRegex.test(customerContact)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      phoneIsValid = false;
    } else {
      setPhoneError("");
    }

    if (!emailIsValid || !phoneIsValid) {
      return;
    }

    const salesOrderData = {
      purchaseOrderedDate,
      saleOrderNo,
      customerName,
      customerAddress,
      customerContact,
      customerEmail,
      productName,
      orderedQuantity,
      brokerName,
      brokerAddress,
    };

    fetch("http://localhost:8080/api/v1/sales/add/salesdetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(salesOrderData),
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
          title: "Sales order added successfully",
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
      <div className="sales-order-management">
        <div className="sales-order-main-content">
          <h2 className="text-center">Sales Order Management</h2>
          <div className="sales-order-card-container">
            <div
              className="card-body p-4"
              style={{ backgroundColor: "rgb(243,244,247)" }}
            >
              <form>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label
                      htmlFor="purchaseOrderedDate"
                      className="form-label"
                    >
                      Purchase Ordered Date{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="purchaseOrderedDate"
                      value={purchaseOrderedDate}
                      onChange={(e) => setPurchaseOrderedDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="saleOrderNo" className="form-label">
                      Sale Order No
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="saleOrderNo"
                      placeholder="Enter Sale Order No"
                      value={saleOrderNo}
                      onChange={(e) => setSaleOrderNo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label htmlFor="customerName" className="form-label">
                      Customer Name{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerName"
                      placeholder="Enter Customer Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="customerEmail" className="form-label">
                      Customer Email{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${emailError ? "is-invalid" : ""
                        }`}
                      id="customerEmail"
                      placeholder="Enter Customer Email"
                      value={customerEmail}
                      required
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                    {emailError && (
                      <div className="invalid-feedback">{emailError}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label htmlFor="customerContact" className="form-label">
                      Customer Contact{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${phoneError ? "is-invalid" : ""
                        }`}
                      id="customerContact"
                      placeholder="Enter Customer Contact"
                      value={customerContact}
                      onChange={(e) => setCustomerContact(e.target.value)}
                      required
                      pattern="\d{10}"
                      title="Please enter 10 numbers"
                      maxLength="10"
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/\D/g, ""))
                      }
                    />
                    {phoneError && (
                      <div className="invalid-feedback">{phoneError}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="customerAddress" className="form-label">
                      Customer Address{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerAddress"
                      placeholder="Enter Customer Address"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label htmlFor="productName" className="form-label">
                      Product Name{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="productName"
                      placeholder="Enter Product Name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="orderedQuantity" className="form-label">
                      Ordered Quantity{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="orderedQuantity"
                      placeholder="Enter Ordered Quantity"
                      value={orderedQuantity}
                      required
                      onChange={(e) => setOrderedQuantity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label htmlFor="brokerName" className="form-label">
                      Broker Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="brokerName"
                      placeholder="Enter Broker Name"
                      value={brokerName}
                      onChange={(e) => setBrokerName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="brokerAddress" className="form-label">
                      Broker Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="brokerAddress"
                      placeholder="Enter Broker Address"
                      value={brokerAddress}
                      onChange={(e) => setBrokerAddress(e.target.value)}
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

export default SalesOrder;
