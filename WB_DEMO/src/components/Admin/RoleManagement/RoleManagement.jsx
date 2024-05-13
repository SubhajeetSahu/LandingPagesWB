import { useState } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../../SideBar/SideBar";
import './RoleManagement.css';

function RoleManagement() {
  const [roleName, setRoleName] = useState("");
  const [error, setError] = useState("");

  const handleCancel = () => {
    setRoleName("");
  };

  const handleSave = () => {
    if (roleName.trim() === "") {
      Swal.fire({
        title: "Please enter a role name.",
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
      return;
    }

    const roleData = {
      roleName,
    };

    fetch("http://localhost:8080/api/v1/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roleData),
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
          title: "Role created successfully.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
        setRoleName("");
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
      <div className="role-management">
        <div className="role-management-main-content">
          <h2 className="text-center">Role Management</h2>
          <div className="role-container d-flex justify-content-center">
            <div
              className="card-body p-4"
              style={{ backgroundColor: "rgb(243,244,247)", maxWidth: "600px" }}
            >
              <form>
                <div className="row mb-3 justify-content-center">
                  <div className="col-md-8">
                    <label htmlFor="roleName" className="form-label">
                      Role Name{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="roleName"
                      placeholder="Enter Role Name"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    type="button"
                    className="btn btn-danger me-4 btn-hover"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid #cccccc",
                      fontWeight: "600",
                      width: "100px",
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
                      border: "1px solid #cccccc",
                      width: "100px",
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
    </SideBar>
  );
}

export default RoleManagement;
