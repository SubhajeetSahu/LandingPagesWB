import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faFileAlt, faPrint, faSignOut } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const [activeItem, setActiveItem] = useState(null);

  // Function to toggle the active state of sidebar items
  const toggleActiveItem = (item) => {
    setActiveItem(item === activeItem ? null : item);
  };

  return (
    <div className="home-sidebar d-flex flex-column text-center" >
      <Link to="/QualityCheck" className={`sidebar-item ${activeItem === 'QualityCheck' ? 'active' : ''}`} onClick={() => toggleActiveItem('QualityCheck')}>
        <FontAwesomeIcon icon={faStar} className="sidebar-icon" />
        <span className="sidebar-item-text">Quality Check</span>
      </Link>
      <Link to="/Print" className={`sidebar-item ${activeItem === 'Print' ? 'active' : ''}`} onClick={() => toggleActiveItem('Print')}>
        <FontAwesomeIcon icon={faPrint} className="sidebar-icon" />
        <span className="sidebar-item-text">Print</span>
      </Link>
      <Link to="/Report" className={`sidebar-item ${activeItem === 'Report' ? 'active' : ''}`} onClick={() => toggleActiveItem('Report')}>
        <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" />
        <span className="sidebar-item-text">Report</span>
      </Link>
      <Link to="/" className={`sidebar-item ${activeItem === 'Logout' ? 'active' : ''}`} onClick={() => toggleActiveItem('Logout')}>
        <FontAwesomeIcon icon={faSignOut} className="sidebar-icon" />
        <span className="sidebar-item-text">Logout</span>
      </Link>
    </div>
  );
}

export default Sidebar;
