import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Vehicle.css";
import SideBar from "../../SideBar/SideBar";

function Vehicle() {
  const [vehicleNo, setVehicleNo] = useState("");
  const [transporter, setTransporter] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleManufacturer, setVehicleManufacturer] = useState("");
  const [vehicleWheelsNo, setvehicleWheelsNo] = useState("");
  const [vehicleFitnessUpTo, setvehicleFitnessUpTo] = useState("");
  const [vehicleLoadCapacity, setVehicleLoadCapacity] = useState("");
  const [transporters, setTransporters] = useState([]);
  const [error, setError] = useState("");

  const handleCancel = () => {
    setVehicleNo("");
    setTransporter("");
    setVehicleType("");
    setVehicleManufacturer("");
    setvehicleWheelsNo("");
    setvehicleFitnessUpTo("");
    setVehicleLoadCapacity("");
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/transporter")
      .then((response) => response.json())
      .then((data) => setTransporters(data))
      .catch((error) => console.error("Error fetching transporters:", error));
  }, []);

  const handleSave = () => {
    if (
      vehicleNo.trim() === "" ||
      transporter.trim() === "" ||
      vehicleFitnessUpTo.trim() === "" ||
      vehicleLoadCapacity.trim() === ""
    ) {
      Swal.fire({
        title: "Please fill in all required fields.",
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
      return;
    }

    const vehicleData = {
      vehicleNo,
      transporter,
      vehicleType,
      vehicleManufacturer,
      vehicleWheelsNo,
      vehicleFitnessUpTo,
      vehicleLoadCapacity,
    };

    fetch(`http://localhost:8080/api/v1/vehicles/${transporter}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleData),
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
          title: data,
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
    <SideBar>
      <div className="vehicle-register">
        <div className="vehicle-content">
          <h2 className="text-center">Vehicle Registration</h2>
          <div className="create-user-container">
            <div
              className="card-body"
              style={{ backgroundColor: "rgb(243,244,247)" }}
            >
              <form>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label htmlFor="vehicleNo" className="form-label">
                      Vehicle Number{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="vehicleNo"
                      placeholder="Enter Vehicle Number"
                      value={vehicleNo}
                      onChange={(e) => setVehicleNo(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="transporter" className="form-label">
                      Transporter{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <select
                      className="form-select"
                      id="transporter"
                      value={transporter}
                      onChange={(e) => setTransporter(e.target.value)}
                      required
                    >
                      <option value="">Select Transporter</option>
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
                    <label htmlFor="vehicleType" className="form-label">
                      Vehicle Type{" "}
                      {/* <span style={{ color: "red", fontWeight: "bold" }}>*</span> */}
                    </label>
                    <select
                      className="form-select"
                      id="vehicleType"
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      // required
                    >
                      <option value="">Select Vehicle Type</option>
                      <option value="mini-truck">Mini Truck</option>
                      <option value="large-truck">Large Truck</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="vehicleManufacturer" className="form-label">
                      Vehicle Manufacturer
                    </label>
                    <select
                      className="form-select"
                      id="vehicleManufacturer"
                      value={vehicleManufacturer}
                      onChange={(e) => setVehicleManufacturer(e.target.value)}
                    >
                      <option value="">Select Manufacturer</option>
                      <option value="Tata Motors">Tata Motors</option>
                      <option value="Ashok Leyland Limited">
                        Ashok Leyland Limited
                      </option>
                      <option value="VE Commercial Vehicles Limited">
                        VE Commercial Vehicles Limited
                      </option>
                      <option value="Mahindra & Mahindra Limited">
                        Mahindra & Mahindra Limited
                      </option>
                      <option value="Piaggio India">Piaggio India</option>
                      <option value="Scania Commercial Vehicle India Pvt Ltd">
                        Scania Commercial Vehicle India Pvt Ltd
                      </option>
                      <option value="Force Motors">Force Motors</option>
                      <option value="Bharat Benz">Bharat Benz</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <label htmlFor="vehicleLoadCapacity" className="form-label">
                      Vehicle Load Capacity{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="vehicleLoadCapacity"
                      placeholder="Enter Vehicle Load Capacity"
                      value={vehicleLoadCapacity}
                      onChange={(e) => setVehicleLoadCapacity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="vehicleFitnessUpTo" className="form-label">
                      Fitness Upto{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="vehicleFitnessUpTo"
                      value={vehicleFitnessUpTo}
                      onChange={(e) => setvehicleFitnessUpTo(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="vehicleWheelsNo" className="form-label">
                      Wheels{" "}
                      {/* <span style={{ color: "red", fontWeight: "bold" }}>*</span> */}
                    </label>
                    <select
                      className="form-select vehicle-select"
                      id="vehicleWheelsNo"
                      value={vehicleWheelsNo}
                      onChange={(e) => setvehicleWheelsNo(e.target.value)}
                    >
                      <option value="">0</option>
                      <option value="6">6</option>
                      <option value="8">8</option>
                      <option value="10">10</option>
                      <option value="12">12</option>
                      <option value="14">14</option>
                      <option value="16">16</option>
                      <option value="18">18</option>
                      <option value="20">20</option>
                      <option value="22">22</option>
                    </select>
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
                      // transition: "transform 0.3s ease-in-out",
                    }}
                    onClick={handleCancel}
                  >
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
                      // transition: "transform 0.3s ease-in-out",
                    }}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
}

export default Vehicle;
