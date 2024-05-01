import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./ManageUser.css";
import { useNavigate } from "react-router-dom";
import { Table, Tag, Button, Input } from "antd";
import Sidebar from "../../SideBar/SideBar";
import Header from "../../Header/Header";
import Swal from "sweetalert2";


const { Column } = Table;
const { Search } = Input;

function ManageUser() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(true); // State to track whether there are more pages to fetch
  const [userIdFilter, setUserIdFilter] = useState("");
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const handleEdit = (user) => {
    navigate("/update-user", { state: user });
  };

  const handleDelete = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this user. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/users/deleteUser/${userId}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            Swal.fire("Deleted!", "The user has been deleted.", "success");
            // User deleted successfully, you can update the state or refetch the data
            fetchUserData();
          } else {
            Swal.fire("Failed", "Failed to delete user", "error");
          }
        } catch (error) {
          Swal.fire(
            "Error",
            "An error occurred while deleting the user.",
            "error"
          );
          console.error("Error deleting user:", error);
        }
      }
    });
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/users?page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data.length === 0) {
        setHasMorePages(false); // No more pages to fetch
      } else {
        setHasMorePages(true);
      }
      setUsers(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [currentPage]); // Depend on currentPage only

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to filter the dataSource based on userId
  const filteredDataSource = users.filter((user) =>
    user.userId.includes(userIdFilter)
  );

  return (
    <div className="ViewUser">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`manageuser-main-content ${isSidebarExpanded ? "expanded" : ""}`}
      >
        <h2 className="text-center">Maintain User</h2>
        <div className="create-user-container">
          <div className="filters">
            <Search
              placeholder="Search User ID"
              value={userIdFilter}
              onChange={(e) => setUserIdFilter(e.target.value)}
              style={{ width: 200 }}
            />
          </div>
          <Table
            dataSource={filteredDataSource}
            pagination={false} // Disable pagination here
            className="user-table mt-3"
          >
            <Column title="User ID" dataIndex="userId" key="userId" />
            <Column
              title="Username"
              key="username"
              render={(text, record) => (
                <span>
                  {record.firstName}{" "}
                  {record.middleName && record.middleName + " "}
                  {record.lastName}
                </span>
              )}
            />
            <Column
              title="Role"
              dataIndex="role"
              key="role"
              render={(roles) => (
                <>
                  {roles.map((role) => {
                    let color = "";
                    switch (role) {
                      case "ADMIN":
                        color = "blue";
                        break;
                      case "GATE_USER":
                        color = "green";
                        break;
                      case "WEIGHBRIDGE_OPERATOR":
                        color = "orange";
                        break;
                      case "QUALITY_USER":
                        color = "purple";
                        break;
                      case "MANAGEMENT":
                        color = "cyan";
                        break;
                      default:
                        color = "default";
                    }
                    return (
                      <Tag color={color} key={role}>
                        {role}
                      </Tag>
                    );
                  })}
                </>
              )}
            />
            <Column title="Email" dataIndex="emailId" key="emailId" />
            <Column title="Contact No" dataIndex="contactNo" key="contactNo" />
            <Column title="Company" dataIndex="company" key="company" />
            <Column title="Company Site" dataIndex="site" key="site" />
            {/* <Column title="Status" dataIndex="status" key="status" /> */}
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <div className="action-buttons">
                  <Button onClick={() => handleEdit(record)}>
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      className="action-icon activate-icon"
                    />
                  </Button>
                  <Button
                    onClick={() => handleDelete(record.userId)}
                    style={{ marginLeft: "8px" }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="action-icon delete-icon"
                    />
                  </Button>
                </div>
              )}
            />
          </Table>
          <div className="d-flex justify-content-center gap-3 m-3">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              &lt;
            </Button>
            <span>{currentPage}</span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasMorePages} // Disable the button when there are no more pages
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUser;