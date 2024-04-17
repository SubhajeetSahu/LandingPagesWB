import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faTruck,
  faUsers,
  faAngleDown,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./SideBar.css";

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

  return (
    <div className={`home-sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
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
          <span
            className="sidebar-item-text text-center m-1"
            style={{ marginLeft: "5px" }}
          >
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
      <div
        to="/vehicle-entry"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faTruck} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">
          Vehicle Master
        </span>
      </div>
      <div
        to="/vehicle-entry"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faUsers} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">
          Supplier Master
        </span>
      </div>
      <Link to="/" className="sidebar-item" onClick={handleSidebarItemClick}>
        <FontAwesomeIcon icon={faPowerOff} className="sidebar-icon mt-1" />
        <span
          className="sidebar-item-text text-center mt-1"
          style={{ marginLeft: "20px" }}
        >
          Sign Out
        </span>
      </Link>
    </div>
  );
};

export default Sidebar;
