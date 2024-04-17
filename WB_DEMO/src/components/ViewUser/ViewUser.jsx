import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserFriends,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./ViewUser.css";

function ViewUser() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [users, setUsers] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("your_api_endpoint_here");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="ViewUser">
      <div className="report-header d-flex justify-content-between align-items-center">
        <FontAwesomeIcon
          icon={faBars}
          className="daily_report_icon mt-2 me-3 sidebar-toggle-btn"
          onClick={toggleSidebar}
        />
        <h2 className="report-header-title text-center mt-3 d-flex align-content-center">
          VIEW USERS
        </h2>
        <FontAwesomeIcon
          icon={faHome}
          className="daily_report_icon mt-2 me-2"
        />
      </div>

      <div className={`home-sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
        <div className="sidebar-item dropdown">
          <Link
            to="/"
            className="d-flex align-items-center"
            id="usersDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ textDecoration: "none" }}
          >
            <FontAwesomeIcon icon={faUserFriends} className="sidebar-icon" />
            <span className="sidebar-item-text">Users</span>
          </Link>
          <ul
            className="dropdown-menu dropdown-menu-dark"
            aria-labelledby="usersDropdown"
          >
            <li>
              <Link className="dropdown-item" to="/">
                Create User
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/manage-user">
                Manage User
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/view-users">
                View Users
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`create-main-content ${isSidebarExpanded ? "expanded" : ""}`}
      >
        <div className="create-user-container">
          <div className="table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl mt-3">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Middle Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Email id</th>
                  <th scope="col">Contact No</th>
                  <th scope="col">Company</th>
                  <th scope="col">CompanySite</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.middleName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.role}</td>
                    <td>{user.emailId}</td>
                    <td>{user.contactNo}</td>
                    <td>{user.company}</td>
                    <td>{user.companySite}</td>
                    <td>{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
