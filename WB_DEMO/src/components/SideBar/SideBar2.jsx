import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons"; // Import the icon
import {
  faTruck,
  faUsers,
  faPowerOff,
  faPrint,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./SideBar.css";
 
const SideBar2 = ({ isSidebarExpanded, toggleSidebar }) => {
  const handleSidebarItemClick = () => {
    if (!isSidebarExpanded) {
      toggleSidebar();
    }
  };
 
  return (
    <div className={`home-sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
      <Link
        to="/VehicleEntry"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        {/* Icon icon <FontAwesome={faTruck} className="sidebar-icon mt-1" /> */}
        <FontAwesomeIcon icon={faTachometerAlt} className="sidebar-icon mt-1" /> {/* Add this line */}
        <span className="sidebar-item-text text-center mt-1">
          {/* Vehicle Entry */}
          Dashboard
        </span>
      </Link>
      <Link
        to="/VehicleEntryDetails"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faTruck} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">
          Inbound
        </span>
      </Link>
      <Link
        to=""
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        {/* <FontAwesomeIcon icon={faTruck} className="sidebar-icon mt-1" /> */}
        <FontAwesomeIcon icon={faTruck} className="sidebar-icon mt-1 flip-horizontal" /> {/* Add this line */}
        <span className="sidebar-item-text text-center mt-1">
          Outbound
        </span>
      </Link>
      <Link
        to="/Report"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faUsers} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">Reports</span>
      </Link>
      <Link
        to="/Print"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faPrint} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">Print</span>
      </Link>
      <Link
        to="/Camera"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faCamera} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">Camera</span>
      </Link>
      <Link to="/" className="sidebar-item" onClick={handleSidebarItemClick}>
        <FontAwesomeIcon icon={faPowerOff} className="sidebar-icon mt-1" />
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
 
export default SideBar2;