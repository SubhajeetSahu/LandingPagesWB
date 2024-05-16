import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faUserCheck,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./ManageUser.css";
import { useNavigate } from "react-router-dom";
import { Table, Tag, Button, Input } from "antd";
import Swal from "sweetalert2";
import SideBar from "../../SideBar/SideBar";
import "antd/dist/reset.css";

const { Column } = Table;
const { Search } = Input;

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(true); // State to track whether there are more pages to fetch
  const [userIdFilter, setUserIdFilter] = useState("");
  const navigate = useNavigate();

  const handleEdit = (user) => {
    navigate("/update-user", { state: user });
  };

  const handleDelete = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to inactive this user.",
      icon: "warning",
      showClearButton: true,
      confirmButtonColor: "#d33",
      ClearButtonColor: "#3085d6",
      confirmButtonText: "Yes, inactivate it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/users/${userId}/deactivate`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            Swal.fire("Deactivated!", "The user is inactive now.", "success");
            // User deleted successfully, you can update the state or refetch the data
            fetchUserData();
          } else {
            Swal.fire("Failed", "Failed to inactivate user", "error");
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

  const handleActivate = async (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to activate this user.",
      icon: "warning",
      showClearButton: true,
      confirmButtonColor: "#d33",
      ClearButtonColor: "#3085d6",
      confirmButtonText: "Yes, activate it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/users/${userId}/activate`,
            {
              method: "PUT",
            }
          );
          if (response.ok) {
            Swal.fire("Activated!", "The user is active now.", "success");
            // User deleted successfully, you can update the state or refetch the data
            fetchUserData();
          } else {
            Swal.fire("Failed", "Failed to activate user", "error");
          }
        } catch (error) {
          Swal.fire(
            "Error",
            "An error occurred while activating the user.",
            "error"
          );
          console.error("Error activating user:", error);
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

  const fetchUserById = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/users/${userIdFilter}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      setUsers([userData]); // Update users state with fetched user data
    } catch (error) {
      console.error("Error fetching user by id:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [currentPage]); // Depend on currentPage only

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <SideBar>
      <div className="ViewUser">
        <div className="view-user-content">
          <h2 className="text-center">View User</h2>
          <div className="maintain-user-container container-fluid">
            <div className="filters">
              <Search
                placeholder="Search User ID"
                value={userIdFilter}
                onChange={(e) => setUserIdFilter(e.target.value)}
                style={{ width: 200 }}
                onSearch={fetchUserById} // Call fetchUserById when search button is clicked
              />
            </div>
            <div className="table-responsive">
              <Table
                dataSource={users}
                pagination={false} // Disable pagination here
                className="user-table mt-3 custom-table"
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
                          case "SALES":
                            color = "geekblue";
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
                <Column
                  title="Contact No"
                  dataIndex="contactNo"
                  key="contactNo"
                />
                <Column title="Company" dataIndex="company" key="company" />
                <Column title="Company Site" dataIndex="site" key="site" />
                <Column
                  title="Status"
                  dataIndex="status"
                  key="status"
                  filters={[
                    { text: "Active", value: "ACTIVE" },
                    { text: "Inactive", value: "INACTIVE" },
                  ]}
                  onFilter={(value, record) => record.status === value}
                  render={(text) => (
                    <Tag color={text === "ACTIVE" ? "green" : "red"}>
                      {text}
                    </Tag>
                  )}
                />
                <Column
                  title="Action"
                  key="action"
                  render={(text, record) => (
                    <>
                      {/* Check if the user's role is not "ADMIN" */}
                      {!record.role.includes("ADMIN") && (
                        <div className="action-buttons">
                          {record.status === "ACTIVE" && (
                            <Button onClick={() => handleEdit(record)}>
                              <FontAwesomeIcon
                                icon={faPencilAlt}
                                style={{ color: "orange" }} // Inline style for orange color
                                className="action-icon activate-icon"
                              />
                            </Button>
                          )}
                          {record.status === "INACTIVE" ? (
                            <Button
                              onClick={() => handleActivate(record.userId)}
                            >
                              <FontAwesomeIcon
                                icon={faUserCheck}
                                style={{ color: "green" }}
                                className="action-icon activate-icon"
                              />
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleDelete(record.userId)}
                              style={{ marginLeft: "8px" }}
                            >
                              <FontAwesomeIcon
                                icon={faUserXmark}
                                style={{ color: "red" }}
                                className="action-icon delete-icon"
                              />
                            </Button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                />
              </Table>
            </div>
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
    </SideBar>
  );
}

export default ManageUser;
