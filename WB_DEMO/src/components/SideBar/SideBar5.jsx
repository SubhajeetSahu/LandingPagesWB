import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillAlt, faPrint, faUsersCog, faPowerOff, faTruck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./SideBar.css";
 
// eslint-disable-next-line react/prop-types
const SideBar5 = ({ isSidebarExpanded, toggleSidebar }) => {
  const handleSidebarItemClick = () => {
    if (!isSidebarExpanded) {
      toggleSidebar();
    }
  };
 
  return (
    <div className={`home-sidebar ${isSidebarExpanded ? "expanded" : ""}`}>
<Link to="/OperatorTransaction" className="sidebar-item" onClick={handleSidebarItemClick}>
<FontAwesomeIcon icon={faMoneyBillAlt} className="sidebar-icon mt-1" />
<span className="sidebar-item-text text-center mt-1">Transactions</span>
</Link>
<Link to="/OperatorTransactionFromInbound" className="sidebar-item" onClick={handleSidebarItemClick}>
<FontAwesomeIcon icon={faTruck} className="sidebar-icon mt-1" />
<span className="sidebar-item-text text-center mt-1">Inbound</span>
</Link>
<Link to="/OperatorTransactionFromOutbound" className="sidebar-item" onClick={handleSidebarItemClick}>
<FontAwesomeIcon icon={faTruck} className="sidebar-icon mt-1" flip="horizontal"/>
<span className="sidebar-item-text text-center mt-1">Outbound</span>
</Link>
<Link to="/print" className="sidebar-item" onClick={handleSidebarItemClick}>
<FontAwesomeIcon icon={faPrint} className="sidebar-icon mt-1" />
<span className="sidebar-item-text text-center mt-1">Print</span>
</Link>
<Link to="/OperatorReport" className="sidebar-item" onClick={handleSidebarItemClick}>
<FontAwesomeIcon icon={faUsersCog} className="sidebar-icon mt-1" />
<span className="sidebar-item-text text-center mt-1">Reports</span>
</Link>
<Link to="/" className="sidebar-item" onClick={handleSidebarItemClick}>
<FontAwesomeIcon icon={faPowerOff} className="sidebar-icon mt-1" />
<span className="sidebar-item-text text-center mt-1" style={{ marginLeft: "20px" }}>
          Log Out
</span>
</Link>
</div>
  );
};
 
export default SideBar5;