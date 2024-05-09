import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUsersSlash,
  faTruck,
  faUser,
  faUserTie,
  faUserFriends,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import "./HomePage1.css";
import SideBar from "../SideBar/SideBar";


function HomePage1() {
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [registeredTrucks, setRegisteredTrucks] = useState(0);
  const [allUsers, setAllUsers] = useState(0);
  const [transporters, setTransporters] = useState(0);
  const [suppliers, setSuppliers] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [companies, setCompanies] = useState(0);



 
  useEffect(() => {

    // Fetch all users
    fetch("http://localhost:8080/api/v1/home/all-users")
      .then((response) => response.json())
      .then((data) => setAllUsers(data))
      .catch((error) => console.error("Error fetching all users:", error));

    // Fetch active users
    fetch("http://localhost:8080/api/v1/home/active-users")
      .then((response) => response.json())
      .then((data) => setActiveUsers(data))
      .catch((error) => console.error("Error fetching active users:", error));

    // Fetch inactive users
    fetch("http://localhost:8080/api/v1/home/inactive-users")
      .then((response) => response.json())
      .then((data) => setInactiveUsers(data))
      .catch((error) => console.error("Error fetching inactive users:", error));

    // Fetch registered trucks
      fetch("http://localhost:8080/api/v1/home/transporters")
      .then((response) => response.json())
      .then((data) => setTransporters(data))
      .catch((error) => console.error("Error fetching registered trucks:", error));


    // Fetch registered companies
      fetch("http://localhost:8080/api/v1/home/companies")
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error("Error fetching registered companies:", error));


    // Fetch registered suppliers
      fetch("http://localhost:8080/api/v1/home/suppliers")
      .then((response) => response.json())
      .then((data) => setSuppliers(data))
      .catch((error) => console.error("Error fetching registered suppliers:", error));

    // Fetch registered customers
      fetch("http://localhost:8080/api/v1/home/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching registered customers:", error));

    // Fetch registered vehicles
    fetch("http://localhost:8080/api/v1/home/vehicles")
      .then((response) => response.json())
      .then((data) => setRegisteredTrucks(data))
      .catch((error) =>
        console.error("Error fetching registered vehicles:", error)
      );
  }, []);

  

  return (
    <SideBar>
      <div className="home-main-content">
        <h2 className="text-center">Admin Dashboard</h2>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="card card-gradient-all-users card-gradient">
                <div className="card-body">
                  <FontAwesomeIcon icon={faUser} size="3x" />
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">{allUsers}</p> {/* Placeholder data */}
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card card-gradient-active card-gradient">
                <div className="card-body">
                  <FontAwesomeIcon icon={faUsers} size="3x" />
                  <h5 className="card-title">Active Users</h5>
                  <p className="card-text">{activeUsers}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card card-gradient-inactive card-gradient">
                <div className="card-body">
                  <FontAwesomeIcon icon={faUsersSlash} size="3x" />
                  <h5 className="card-title">Inactive Users</h5>
                  <p className="card-text">{inactiveUsers}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card card-gradient-transporters card-gradient">
                <div className="card-body">
                  <FontAwesomeIcon icon={faTruck} size="3x" />
                  <h5 className="card-title">Transporters</h5>
                  <p className="card-text">{transporters}</p> {/* Placeholder data */}
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card card-gradient-registered card-gradient">
                <div className="card-body">
                  <FontAwesomeIcon icon={faTruck} size="3x" />
                  <h5 className="card-title">Registered Vehicles</h5>
                  <p className="card-text">{registeredTrucks}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card card-gradient-companies card-gradient">
                <div className="card-body">
                  <FontAwesomeIcon icon={faBuilding} size="3x" />
                  <h5 className="card-title">Companies</h5>
                  <p className="card-text">{companies}</p> {/* Placeholder data */}
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card card-gradient-suppliers card-gradient">
                <div className="card-body">
                  <FontAwesomeIcon icon={faUserTie} size="3x" />
                  <h5 className="card-title">Suppliers</h5>
                  <p className="card-text">{suppliers}</p> {/* Placeholder data */}
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card card-gradient-customers card-gradient">
                <div className="card-body">
                  <FontAwesomeIcon icon={faUserFriends} size="3x" />
                  <h5 className="card-title">Customers</h5>
                  <p className="card-text">{customers}</p> {/* Placeholder data */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
}

export default HomePage1;
