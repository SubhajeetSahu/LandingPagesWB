import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

function Header({ toggleSidebar }) {
  return (
    <div className="weighbridge-header d-flex justify-content-between align-items-center">
      <FontAwesomeIcon
        icon={faBars}
        className="weighbridge-sidebar-toggle-btn mt-2 me-3"
        onClick={toggleSidebar}
      />
      <h2 className="weighbridge-header-title text-center mt-3">
        WEIGHBRIDGE MANAGEMENT SYSTEM
      </h2>
      {/* <FontAwesomeIcon
        icon={faHome}
        className="weighbridge-home-toggle-btn mt-2 me-2"
      /> */}
    </div>
  );
}

export default Header;
