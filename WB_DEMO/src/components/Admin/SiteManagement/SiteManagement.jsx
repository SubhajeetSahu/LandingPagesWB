import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import SideBar from "../../SideBar/SideBar";
import "./SiteManagement.css";

function SiteManagement() {
  const [companyName, setCompanyName] = useState("");
  const [siteName, setSiteName] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");

  const handleCancel = () => {
    setCompanyName("");
    setSiteName("");
    setSiteAddress("");
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/company")
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error("Error fetching companies:", error));
  }, []);

  const handleSave = () => {
    if (
      companyName.trim() === "" ||
      siteName.trim() === "" ||
      siteAddress.trim() === ""
    ) {
      Swal.fire({
        title: "Please fill in all fields.",
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
      return;
    }

    const siteData = {
      companyName,
      siteName,
      siteAddress,
    };

    fetch("http://localhost:8080/api/v1/sites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(siteData),
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
        setSiteName("");
        setSiteAddress("");
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
      <div className="site-management">
        <div className="site-management-main-content">
          <h2 className="text-center">Site Management</h2>
          <div className="create-user-container d-flex justify-content-center">
            <div
              className="card-body p-4"
              style={{ backgroundColor: "rgb(243,244,247)", maxWidth: "600px" }}
            >
              <form>
                <div className="row mb-3 justify-content-center">
                  <div className="col-md-8">
                    <label htmlFor="companyName" className="form-label">
                      Company Name{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <select
                      className="form-select"
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    >
                      <option value="">Select a company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.companyName}>
                          {company.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row mb-3 justify-content-center">
                  <div className="col-md-8">
                    <label htmlFor="siteName" className="form-label">
                      Site Name{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="siteName"
                      placeholder="Enter Site Name"
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3 justify-content-center">
                  <div className="col-md-8">
                    <label htmlFor="siteAddress" className="form-label">
                      Site Address{" "}
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="siteAddress"
                      placeholder="Enter Site Address"
                      value={siteAddress}
                      onChange={(e) => setSiteAddress(e.target.value)}
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
                      border: "1px solid #cccccc",
                      width: "100px",

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

export default SiteManagement;
