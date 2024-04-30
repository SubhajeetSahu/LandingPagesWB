import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faTruck,
  faUsers,
  faAngleDown,
  faPowerOff,
  faBuilding,
  faMapMarkerAlt,
  faHome,
  faTruckMoving,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./SideBar.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isSidebarExpanded, toggleSidebar }) => {
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);

  const handleUserManagementClick = () => {
    if (!isSidebarExpanded) {
      toggleSidebar();
    }
    setIsUserManagementOpen(!isUserManagementOpen);
  };

  const handleSidebarItemClick = () => {
    if (!isSidebarExpanded) {
      toggleSidebar();
    }
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to sign out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, sign out",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear session storage
        sessionStorage.clear();

        // Clear browser history and redirect
        window.location.href = "/";

        // Additional history manipulation to prevent users from navigating back
        if (window.history && window.history.pushState) {
          // Use replaceState to clear the existing history
          window.history.replaceState(null, null, "/");

          // Add a dummy entry to the history to replace current entry
          window.history.pushState(null, null, "/");

          // Prevent users from navigating back to the previous state
          window.onpopstate = function (event) {
            window.history.go(1);
          };
        }
      }
    });
  };

  return (
    <div className={`home-sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
      <Link
        to="/home1"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faHome} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">Home</span>
      </Link>

      <div
        className="sidebar-item dropdown"
        onClick={handleUserManagementClick}
      >
        <div
          className="d-flex align-items-center"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ cursor: "pointer" }}
        >
          <FontAwesomeIcon icon={faUserFriends} className="sidebar-icon" />
          <span className="sidebar-item-text text-center m-1">
            User Management
          </span>
          <FontAwesomeIcon
            icon={faAngleDown}
            className={`sidebar-icon ms-auto ${
              isSidebarExpanded ? "" : "d-none"
            }`}
            style={{ fontSize: "0.8rem" }}
          />
        </div>
        <ul
          className={`dropdown-menu dropdown-menu-dark ${
            isUserManagementOpen ? "show" : ""
          }`}
        >
          <li onClick={handleSidebarItemClick}>
            <Link to="/create-user" className="dropdown-item">
              Create User
            </Link>
          </li>
          <li onClick={handleSidebarItemClick}>
            <Link to="/manage-user" className="dropdown-item">
              Maintain User
            </Link>
          </li>
        </ul>
      </div>

      {/* Company Management */}
      <Link
        to="/company-management"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon
          icon={faBuilding}
          className="sidebar-icon mt-1"
          style={{ marginLeft: "2px" }}
        />
        <span className="sidebar-item-text text-center mt-1">
          Company Management
        </span>
      </Link>

      {/* Site Management */}
      <Link
        to="/site-management"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          className="sidebar-icon mt-1"
          style={{ marginLeft: "2px" }}
        />
        <span className="sidebar-item-text text-center mt-1">
          Site Management
        </span>
      </Link>

      <Link
        to="/transporter"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faTruckMoving} className="sidebar-icon mt-1" />
        <span
          className="sidebar-item-text text-center mt-1"
          style={{ marginLeft: "5px" }}
        >
          Transport Management
        </span>
      </Link>

      <Link
        to="/vehicle"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faTruck} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">
          Vehicle Management
        </span>
      </Link>
      {/* <div
        to="/vehicle-entry"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faUsers} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">
          Supplier Master
        </span>
      </div> */}
      <div className="sidebar-item" onClick={handleSignOut}>
        <FontAwesomeIcon icon={faPowerOff} className="sidebar-icon mt-1" />
        <span
          className="sidebar-item-text text-center mt-1"
          style={{ marginLeft: "8px" }}
        >
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
