import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "./CreateUser.css";
import Sidebar from "../../SideBar/SideBar";
import Header from "../Header/Header";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function CreateUser() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState([]);
  const [emailId, setemailId] = useState("");
  const [contactNo, setcontactNo] = useState("");
  const [company, setcompany] = useState("");
  const [site, setsite] = useState("");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/company/get/list")
      .then((response) => response.json())
      .then((data) => {
        console.log("Company List:", data);
        setCompanies(data);
      })
      .catch((error) => {
        console.error("Error fetching company list:", error);
      });
  }, []);

  const handleCompanyChange = (e) => {
    setcompany(e.target.value);

    fetch(`http://localhost:8080/api/v1/sites/company/${e.target.value}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Site List:", data);
        const formattedSites = data.map((site) => ({
          site: `${site.siteName},${site.siteAddress}`,
        }));
        setSites(formattedSites);
      })
      .catch((error) => {
        console.error("Error fetching site list:", error);
      });
  };

  const handleCancel = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setRole([]);
    setemailId("");
    setcontactNo("");
    setcompany("");
    setsite("");
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleSave = () => {
    if (
      !/^[a-zA-Z]*$/.test(firstName) ||
      !/^[a-zA-Z]*$/.test(middleName) ||
      !/^[a-zA-Z]*$/.test(lastName)
    ) {
      setErrors({
        firstName: /^[a-zA-Z]*$/.test(firstName) ? "" : "Invalid first name",
        middleName: /^[a-zA-Z]*$/.test(middleName) ? "" : "Invalid middle name",
        lastName: /^[a-zA-Z]*$/.test(lastName) ? "" : "Invalid last name",
      });
      return;
    }

    setErrors({
      firstName: "",
      middleName: "",
      lastName: "",
    });

    if (
      role.length === 0 ||
      company.trim() === "" ||
      site.trim() === "" ||
      contactNo.trim() === "" ||
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      emailId.trim() === ""
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

    const userData = {
      firstName,
      middleName,
      lastName,
      site,
      company,
      emailId,
      contactNo,
      role,
    };

    setIsLoading(true);

    console.log("Payload sent to the API:", userData);

    fetch("http://localhost:8080/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.text(); // Assume the success response is text
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
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRoleChange = (selectedRole) => {
    if (role.includes(selectedRole)) {
      setRole(role.filter((r) => r !== selectedRole));
    } else {
      setRole([...role, selectedRole]);
    }
  };

  const handleSelectAllRoles = () => {
    if (role.length === 5) {
      setRole([]);
    } else {
      setRole([
        "GATE_USER",
        "WEIGHBRIDGE_OPERATOR",
        "QUALITY_USER",
        "MANAGEMENT",
      ]);
    }
  };

  return (
    <div className="create-user">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`create-main-content ${isSidebarExpanded ? "expanded" : ""}`}
      >
        {isLoading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <h2 className="text-center">Create User</h2>
            <div className="create-user-container">
              <div className="card create-user-form mt-3">
                <div
                  className="card-body"
                  style={{ backgroundColor: "rgb(243,244,247)" }}
                >
                  <form>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder="Enter First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          pattern="[A-Za-z]+"
                        />
                        {errors.firstName && (
                          <p className="text-danger">{errors.firstName}</p>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="middleName" className="form-label">
                          Middle Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="middleName"
                          placeholder="Enter Middle Name"
                          value={middleName}
                          onChange={(e) => setMiddleName(e.target.value)}
                        />
                        {errors.middleName && (
                          <p className="text-danger">{errors.middleName}</p>
                        )}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                        {errors.lastName && (
                          <p className="text-danger">{errors.lastName}</p>
                        )}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="emailId" className="form-label">
                          Email Id
                        </label>
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          *
                        </span>
                        <input
                          type="emailId"
                          className="form-control"
                          id="emailId"
                          placeholder="Enter email address"
                          value={emailId}
                          onChange={(e) => setemailId(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="contactNo" className="form-label">
                          Mobile Number
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>
                        <PhoneInput
                          country={"in"}
                          value={contactNo}
                          onChange={(phone) => setcontactNo(phone)}
                          inputStyle={{ width: "100%" }}
                          inputProps={{
                            name: "contactNo",
                            required: true,
                          }}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="company" className="form-label">
                          Company Name
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>
                        <select
                          className="form-select"
                          id="company"
                          value={company}
                          onChange={handleCompanyChange}
                          required
                        >
                          <option value="">Select Company Name</option>
                          {companies.map((c, index) => (
                            <option key={index} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="site" className="form-label">
                          Site Name
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>
                        <select
                          className="form-select"
                          id="site"
                          value={site}
                          onChange={(e) => setsite(e.target.value)}
                          required
                        >
                          <option value="">Select Site Name</option>
                          {sites.map((s, index) => (
                            <option key={index} value={s.site}>
                              {s.site}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="role" className="form-label">
                          Role
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            *
                          </span>
                        </label>
                        <div className="d-flex gap-2">
                          <div className="d-flex flex-wrap gap-2">
                            {role.map((r, index) => (
                              <div
                                key={index}
                                className="d-flex align-items-center bg-secondary text-white px-2 py-1 rounded"
                              >
                                <span className="me-2">{r}</span>
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  className="cursor-pointer"
                                  onClick={() => handleRoleChange(r)}
                                />
                              </div>
                            ))}
                            <button
                              className="btn btn-secondary dropdown-toggle"
                              type="button"
                              id="dropdownRole"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Select Roles
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownRole"
                            >
                              <li>
                                <label className="dropdown-item">
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      handleRoleChange("GATE_USER")
                                    }
                                    checked={role.includes("GATE_USER")}
                                  />
                                  Gate User
                                </label>
                              </li>
                              <li>
                                <label className="dropdown-item">
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      handleRoleChange("WEIGHBRIDGE_OPERATOR")
                                    }
                                    checked={role.includes(
                                      "WEIGHBRIDGE_OPERATOR"
                                    )}
                                  />
                                  Weighbridge Operator
                                </label>
                              </li>
                              <li>
                                <label className="dropdown-item">
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      handleRoleChange("QUALITY_USER")
                                    }
                                    checked={role.includes("QUALITY_USER")}
                                  />
                                  Quality User
                                </label>
                              </li>
                              <li>
                                <label className="dropdown-item">
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      handleRoleChange("MANAGEMENT")
                                    }
                                    checked={role.includes("MANAGEMENT")}
                                  />
                                  Management
                                </label>
                              </li>
                              <li>
                                <hr className="dropdown-divider" />
                              </li>
                              <li>
                                <label className="dropdown-item">
                                  <input
                                    type="checkbox"
                                    onChange={handleSelectAllRoles}
                                    checked={role.length === 4}
                                  />
                                  Select All Roles
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
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
          </>
        )}
      </div>
    </div>
  );
}

export default CreateUser;
