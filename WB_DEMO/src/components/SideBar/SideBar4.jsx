import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileAlt,
    faVideo,
    faMapMarked,
    faExchangeAlt,
    faTruck,
    faSignOut,
  } from "@fortawesome/free-solid-svg-icons";import { Link } from "react-router-dom";
import "./SideBar.css";
 
const SideBar4 = ({ isSidebarExpanded, toggleSidebar }) => {
  const handleSidebarItemClick = () => {
    if (!isSidebarExpanded) {
      toggleSidebar();
    }
  };
 
  return (
    <div className={`home-sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
      <Link
        to="/vehicle-entry"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faTruck} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">
        Vehicle Entered
        </span>
      </Link>
      <Link
        to="/ManagementLocation"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faMapMarked} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">Live Location</span>
      </Link>
      <Link
        to="/ManagementTransaction"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faExchangeAlt} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">Live Transaction</span>
      </Link>
      <Link
        to="/ManagementCamera"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faVideo} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">Camera</span>
      </Link>
      <Link
        to="/ManagementReport"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">Reports</span>
      </Link>
      <Link to="/" className="sidebar-item" onClick={handleSidebarItemClick}>
        <FontAwesomeIcon icon={faSignOut} className="sidebar-icon mt-1" />
        <span
          className="sidebar-item-text text-center mt-1"
          style={{ marginLeft: "20px" }}
        >
          Logout
        </span>
      </Link>
    </div>
  );
};
 
export default SideBar4