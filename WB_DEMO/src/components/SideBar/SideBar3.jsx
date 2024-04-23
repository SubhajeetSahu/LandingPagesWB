import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFileAlt, faPrint, faPowerOff,faChartLine, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
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
      <Link to="/QualityCheck" className="sidebar-item" onClick={handleSidebarItemClick}>
  <FontAwesomeIcon icon={faChartLine} className="sidebar-icon" />
  <span className="sidebar-item-text">Quality Dashboard</span>
</Link>

<Link to="/QualityInboundDashboard" className="sidebar-item" onClick={handleSidebarItemClick}>
  <FontAwesomeIcon icon={faSignInAlt} className="sidebar-icon" />
  <span className="sidebar-item-text">Quality Inbound</span>
</Link>

<Link to="/QualityOutboundDashboard" className="sidebar-item" onClick={handleSidebarItemClick}>
  <FontAwesomeIcon icon={faSignOutAlt} className="sidebar-icon" />
  <span className="sidebar-item-text">Quality Outbound</span>
</Link>

      <Link
        to="/QReport"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon  " />
        <span className="sidebar-item-text">Reports</span>
      </Link>
      <Link
        to="/QPrint"
        className="sidebar-item"
        onClick={handleSidebarItemClick}
      >
        <FontAwesomeIcon icon={faPrint} className="sidebar-icon  " />
        <span className="sidebar-item-text">Print</span>
      </Link>
      <Link to="/" className="sidebar-item" onClick={handleSidebarItemClick}>
        <FontAwesomeIcon icon={faPowerOff} className="sidebar-icon  " />
        <span className="sidebar-item-text">Logout</span>
      </Link>
    </div>
  );
};

export default SideBar3;
