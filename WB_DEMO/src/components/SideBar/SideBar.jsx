import { useState } from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  ListItemButton,
  Typography,
  Box,
  useMediaQuery,
  Popover,
  Divider,
  Avatar,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Person,
  DirectionsCar,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  Home,
  BusinessCenter,
  Store,
  Commute,
  Group,
  ExitToApp,
  Build,
  Handyman,
  Visibility,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const SideBar = ({ children }) => {
  const [openUser, setOpenUser] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const isLargeScreen = useMediaQuery("(min-width:600px)");

  const handleUserClick = () => {
    setOpenUser(!openUser);
    setSelectedItem(openUser ? null : "user");
  };

  const handleViewClick = () => {
    setOpenView(!openView);
    setSelectedItem(openView ? null : "view");
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleUserProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userName = sessionStorage.getItem("userName");
  const roles = JSON.parse(sessionStorage.getItem("roles"));
  const userId = sessionStorage.getItem("userId");

  const open = Boolean(anchorEl);

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to sign out.",
      icon: "warning",
      showClearButton: true,
      confirmButtonColor: "#d33",
      ClearButtonColor: "#3085d6",
      confirmButtonText: "Yes, sign out",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear session storage
        sessionStorage.clear();

        // Clear browser history and redirect
        window.location.href = "/";

        // Additional history manipulation to prevent users from navigating back
        if (window.history && window.history.pushState) {
          // Use replaceState to clear the existing history
          window.history.replaceState(null, null, "/");

          // Add a dummy entry to the history to replace current entry
          window.history.pushState(null, null, "/");

          // Prevent users from navigating back to the previous state
          window.onpopstate = function (event) {
            window.history.go(1);
          };
        }
      }
    });
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "rgb(14, 23, 38)",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "15px",
          }}
        >
          <IconButton onClick={toggleSideBar}>
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography
            variant={isLargeScreen ? "h6" : "h5"}
            sx={{ color: "white" }}
          >
            Weighbridge Management System
          </Typography>
          <IconButton onClick={handleUserProfileClick}>
            <Person style={{ color: "white" }} />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box sx={{ backgroundColor: "black", p: 3 }}>
              <Avatar
                sx={{
                  color: "black",
                  width: 56,
                  height: 56,
                  margin: "auto",
                  mb: 2,
                }}
              >
                <Person />
              </Avatar>
              <Typography
                variant="h6"
                sx={{ color: "white", textAlign: "center", mb: 1 }}
              >
                {userName}
              </Typography>
              <Typography sx={{ color: "white", textAlign: "center", mb: 1, fontWeight: "bold" }}>
                User ID: {userId}
              </Typography>
              <Divider sx={{ backgroundColor: "white", mb: 1 }} />
              <Typography sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
                Roles: {roles.join(", ")}
              </Typography>
            </Box>
          </Popover>
        </Box>
      </Box>
      <Drawer
        variant="temporary"
        open={isSideBarOpen}
        onClose={toggleSideBar}
        sx={{
          width: 240,
          flexShrink: 0,
          zIndex: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            position: "fixed",
            boxSizing: "border-box",
            backgroundColor: "rgb(229, 232, 237)",
          },
        }}
      >
        <List sx={{ marginTop: "120px;" }}>
          <ListItemButton
            component={Link}
            to="/home1"
            onClick={() => handleItemClick("dashboard")}
            selected={selectedItem === "dashboard"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        
          <ListItemButton
            onClick={handleUserClick}
            selected={selectedItem === "user"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="User Management" />
            {openUser ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openUser} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{ paddingLeft: "55px", listStyleType: "none" }}
            >
              <ListItemButton
                component={Link}
                to="/create-user"
                onClick={() => handleItemClick("createUser")}
                selected={selectedItem === "createUser"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    backgroundColor: "#3e8ee6",
                    color: "white",
                  },
                }}
              >
                <ListItemText primary="Create User" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/manage-user"
                onClick={() => handleItemClick("maintainUser")}
                selected={selectedItem === "maintainUser"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    backgroundColor: "#3e8ee6",
                    color: "white",
                  },
                }}
              >
                <ListItemText primary="Maintain User" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* New Dropdown */}
          <ListItemButton
            onClick={handleViewClick}
            selected={selectedItem === "view"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <Visibility />
            </ListItemIcon>
            <ListItemText primary="View Management" />
            {openView ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openView} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{ paddingLeft: "55px", listStyleType: "none" }}
            >
              <ListItemButton
                component={Link}
                to="/view-company"
                onClick={() => handleItemClick("viewCompany")}
                selected={selectedItem === "viewCompany"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    backgroundColor: "#3e8ee6",
                    color: "white",
                  },
                }}
              >
                <ListItemText primary="View Company" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/view-supplier"
                onClick={() => handleItemClick("viewSupplier")}
                selected={selectedItem === "viewSupplier"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    backgroundColor: "#3e8ee6",
                    color: "white",
                  },
                }}
              >
                <ListItemText primary="View Supplier" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/view-customer"
                onClick={() => handleItemClick("viewCustomer")}
                selected={selectedItem === "viewCustomer"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    backgroundColor: "#3e8ee6",
                    color: "white",
                  },
                }}
              >
                <ListItemText primary="View Customer" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/view-transporter"
                onClick={() => handleItemClick("viewTransporter")}
                selected={selectedItem === "viewTransporter"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    backgroundColor: "#3e8ee6",
                    color: "white",
                  },
                }}
              >
                <ListItemText primary="View Transporter" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/view-vehicle"
                onClick={() => handleItemClick("viewVehicle")}
                selected={selectedItem === "viewVehicle"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    backgroundColor: "#3e8ee6",
                    color: "white",
                  },
                }}
              >
                <ListItemText primary="View Vehicle" />
              </ListItemButton>
            </List>
            
          </Collapse>
          {/* End of New Dropdown */}

          <ListItemButton
            component={Link}
            to="/role-management"
            selected={selectedItem === "role"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <Build />
            </ListItemIcon>
            <ListItemText primary="Role Management" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/company-management"
            onClick={() => handleItemClick("companyManagement")}
            selected={selectedItem === "companyManagement"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <BusinessCenter />
            </ListItemIcon>
            <ListItemText primary="Company Management" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/site-management"
            onClick={() => handleItemClick("siteManagement")}
            selected={selectedItem === "siteManagement"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Site Management" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/transporter"
            onClick={() => handleItemClick("transportManagement")}
            selected={selectedItem === "transportManagement"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <Commute />
            </ListItemIcon>
            <ListItemText primary="Transport Management" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/vehicle"
            onClick={() => handleItemClick("vehicleManagement")}
            selected={selectedItem === "vehicleManagement"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <DirectionsCar />
            </ListItemIcon>
            <ListItemText primary="Vehicle Management" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/supplier"
            onClick={() => handleItemClick("supplierManagement")}
            selected={selectedItem === "supplierManagement"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <Store />
            </ListItemIcon>
            <ListItemText primary="Supplier Management" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/customer"
            onClick={() => handleItemClick("customerManagement")}
            selected={selectedItem === "customerManagement"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Customer Management" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/material-management"
            onClick={() => handleItemClick("materialManagement")}
            selected={selectedItem === "materialManagement"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <Handyman/>
            </ListItemIcon>
            <ListItemText primary="Material Management" />
          </ListItemButton>
          <ListItemButton
            onClick={handleSignOut}   
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </List>
      </Drawer>
      <div
        style={{
          transition: "margin-left 0.3s ease",
          marginLeft: isSideBarOpen ? "240px" : "0",
          overflowX: "hidden",
        }}
      >
        {children}
      </div>
    </>
  );
};
export default SideBar;
