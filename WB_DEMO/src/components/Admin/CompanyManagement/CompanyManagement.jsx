import Sidebar from "../../SideBar/SideBar";
import Header from "../../Header/Header";
import { useState } from "react";
import Swal from "sweetalert2";

function CompanyManagement() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyContactNo, setcompanyContactNo] = useState("");
  const [companyAddress, setcompanyAddress] = useState("");
  const [error, setError] = useState("");

  const handleCancel = () => {
    setCompanyName("");
    setCompanyEmail("");
    setcompanyContactNo("");
    setcompanyAddress("");
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleSave = () => {
    if (companyName.trim() === "") {
      Swal.fire({
        title: "Please enter a company name.",
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
      return;
    }

    const companyData = {
      companyName,
      companyEmail,
      companyContactNo,
      companyAddress,
    };

    fetch("http://localhost:8080/api/v1/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(companyData),
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
        setCompanyName("");
        setCompanyEmail("");
        setcompanyContactNo("");
        setcompanyAddress("");
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
    <div className="company-management">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`create-main-content ${isSidebarExpanded ? "expanded" : ""}`}
      >
        <h2 className="text-center">Company Management</h2>
        <div className="create-user-container d-flex justify-content-center">
          <div
            className="card-body mt-3"
            style={{ backgroundColor: "rgb(243,244,247)", maxWidth: "600px" }}
          >
            <form>
              <div className="row mb-3 justify-content-center">
                <div className="col-md-8">
                  <label htmlFor="companyName" className="form-label">
                    Company Name{" "}
                    <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyName"
                    placeholder="Enter Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3 justify-content-center">
                <div className="col-md-8">
                  <label htmlFor="companyEmail" className="form-label">
                    Company Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="companyEmail"
                    placeholder="Enter Company Email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3 justify-content-center">
                <div className="col-md-8">
                  <label htmlFor="companyContactNo" className="form-label">
                    Contact Number
                  </label>
                  <span style={{ color: "red", fontWeight: "bold" }}>*</span>
                  <input
                    type="tel"
                    className="form-control"
                    id="companyContactNo"
                    placeholder="Enter Contact Number"
                    value={companyContactNo}
                    onChange={(e) => setcompanyContactNo(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3 justify-content-center">
                <div className="col-md-8">
                  <label htmlFor="companyAddress" className="form-label">
                    Headquarters
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyAddress"
                    placeholder="Enter Company Headquarters"
                    value={companyAddress}
                    onChange={(e) => setcompanyAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-center mt-3">
                <button
                  type="button"
                  className="btn btn-danger me-4 btn-hover"
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    fontWeight: "bold",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success-1 btn-hover"
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    fontWeight: "bold",
                    transition: "transform 0.3s ease-in-out",
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
  );
}

export default CompanyManagement;
