import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "./UpdateUser.css";
import Sidebar from "../SideBar/SideBar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";

function UpdateUser() {
  const location = useLocation();
  const user = location.state;
  const [userId, setuserId] = useState(user.userId);
  const [firstName, setFirstName] = useState(user.firstName);
  const [middleName, setMiddleName] = useState(user.middleName);
  const [lastName, setLastName] = useState(user.lastName);
  const [role, setRole] = useState(user.role);
  const [emailId, setemailId] = useState(user.emailId);
  const [contactNo, setcontactNo] = useState(user.contactNo);
  const [company, setcompany] = useState(user.company);
  const [site, setsite] = useState(user.site);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [status, setStatus] = useState(user.status);
  const [companies, setCompanies] = useState([]);
  const [sites, setSites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch company list
    fetch("http://localhost:8080/api/v1/company/get/list")
      .then((response) => response.json())
      .then((data) => {
        console.log("Company List:", data);
        setCompanies(data);
      })
      .catch((error) => {
        console.error("Error fetching company list:", error);
      });

    // Fetch initial site list for the user's company
    fetchSiteList(user.company);
  }, [user.company]);

  const fetchSiteList = (selectedCompany) => {
    fetch(`http://localhost:8080/api/v1/sites/company/${selectedCompany}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Site List:", data);
        const formattedSites = data.map((site) => ({
          site: `${site.siteName},${site.siteAddress}`,
          siteId: site.siteId,
        }));
        setSites(formattedSites);
      })
      .catch((error) => {
        console.error("Error fetching site list:", error);
      });
  };

  const handleCompanyChange = (e) => {
    setcompany(e.target.value);
    fetchSiteList(e.target.value);
  };

  const handleCancel = () => {
    navigate("/manage-user");
  };

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleSave = () => {
    const userData = {
      userId,
      site,
      company,
      emailId,
      contactNo,
      role,
      firstName,
      middleName,
      lastName,
    };

    fetch(`http://localhost:8080/api/v1/users/updateUser/${user.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          // Check if the response is JSON or text
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            // If the response is JSON, parse it as JSON
            return response.json();
          } else {
            // If the response is text, return the text
            return response.text();
          }
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        // Determine the title for the SweetAlert modal
        const title =
          typeof data === "string" ? data : "User Updated Successfully!";

        navigate("/manage-user");
        Swal.fire({
          title: title,
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        // Optionally, show an error message to the user
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
        "ADMIN",
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
        <h2 className="text-center">Update User</h2>
        <div className="create-user-container">
          <div className="card create-user-form">
            <div
              className="card-body"
              style={{ backgroundColor: "rgb(243,244,247)" }}
            >
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="userId" className="form-label">
                      User ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="userId"
                      placeholder="Enter User ID"
                      value={userId}
                      onChange={(e) => setuserId(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="ACTIVE">ACTIVE</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
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
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="emailId" className="form-label">
                      Email Id
                    </label>
                    <input
                      type="emailId"
                      className="form-control"
                      id="emailId"
                      placeholder="Enter email address"
                      value={emailId}
                      onChange={(e) => setemailId(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="role" className="form-label">
                      Role
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
                                onChange={() => handleRoleChange("ADMIN")}
                                checked={role.includes("ADMIN")}
                              />
                              Admin
                            </label>
                          </li>
                          <li>
                            <label className="dropdown-item">
                              <input
                                type="checkbox"
                                onChange={() => handleRoleChange("GATE_USER")}
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
                                checked={role.includes("WEIGHBRIDGE_OPERATOR")}
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
                                onChange={() => handleRoleChange("MANAGEMENT")}
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
                                checked={role.length === 5}
                              />
                              Select All Roles
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor=" contactNo" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id=" contactNo"
                      placeholder="Enter Mobile Number"
                      value={contactNo}
                      onChange={(e) => setcontactNo(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="company" className="form-label">
                      Company Name
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
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="site" className="form-label">
                      Site Name
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
                        <option key={index} value={s.siteId}>
                          {s.site}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
              <div className="d-flex justify-content-center mt-5">
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
                  className="btn btn-success btn-hover"
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    fontWeight: "bold",
                    transition: "transform 0.3s ease-in-out",
                  }}
                  onClick={handleSave}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
