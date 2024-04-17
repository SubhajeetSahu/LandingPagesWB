import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "./ManageUser.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../SideBar/SideBar";
import Header from "../Header/Header";
 
function ManageUser() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPageText, setItemsPerPageText] = useState("6");
  const navigate = useNavigate();
 
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
 
  const handleEdit = (user) => {
    navigate("/update-user", { state: user });
  };
 
  const fetchUserData = async (page, size) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/users?page=${page}&size=${size}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
 
  useEffect(() => {
    const itemsPerPage = parseInt(itemsPerPageText, 10);
    if (!isNaN(itemsPerPage) && itemsPerPage > 0) {
      fetchUserData(currentPage, itemsPerPage);
    }
  }, [currentPage, itemsPerPageText]); // Depend on currentPage and itemsPerPage
 
  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
 
  // Function to handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPageText(e.target.value);
  };
 
  return (
    <div className="ViewUser">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`create-main-content ${isSidebarExpanded ? "expanded" : ""}`}
      >
        <h2 className="text-center">Maintain User</h2>
        <div className="create-user-container">
          <div className="table-responsive-xl table-responsive-md table-responsive-lg table-responsive-sm table-responsive-xxl mt-3">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">User ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Middle Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">Email id</th>
                  <th scope="col">Contact No</th>
                  <th scope="col">Company</th>
                  <th scope="col">CompanySite</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.userId}</td>
                    <td>{user.firstName}</td>
                    <td>{user.middleName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.role.join(", ")}</td>
                    <td>{user.emailId}</td>
                    <td>{user.contactNo}</td>
                    <td>{user.company}</td>
                    <td>{user.site}</td>
                    <td>{user.status}</td>
                    <td>
                      <button onClick={() => handleEdit(user)}>
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="action-icon activate-icon"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex justify-content-center gap-4 m-3 mb-3">
          <button
            className="btn btn-primary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
          <input
            type="text"
            className="form-control size-input"
            value={itemsPerPageText}
            onChange={handleItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
}
 
export default ManageUser;