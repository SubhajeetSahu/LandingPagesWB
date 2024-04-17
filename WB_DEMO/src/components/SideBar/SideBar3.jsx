import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faFileAlt, faPrint, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./SideBar.css";
 
const SideBar3 = ({ isSidebarExpanded, toggleSidebar }) => {
  const handleSidebarItemClick = () => {
    if (!isSidebarExpanded) {
      toggleSidebar();
    }
  };
 
  return (
    <div className={`home-sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
      <Link
        to="/QualityCheck"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faStar} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">
        Quality Check
        </span>
      </Link>
      <Link
        to="/QReport"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">Reports</span>
      </Link>
      <Link
        to="/QPrint"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faPrint} className="sidebar-icon mt-1" />
        <span className="sidebar-item-text text-center mt-1">Print</span>
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
 
export default SideBar3