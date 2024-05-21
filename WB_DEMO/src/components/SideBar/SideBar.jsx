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

  BusinessCenter,
  Store,
  Commute,
  Group,
  ExitToApp,
  Home,
  Handyman,
  ProductionQuantityLimits,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SideBar = ({ children }) => {
  const [openUser, setOpenUser] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);
  const [openTransport, setOpenTransport] = useState(false);
  const [openVehicle, setOpenVehicle] = useState(false);
  const [openSupplier, setOpenSupplier] = useState(false);
  const [openCustomer, setOpenCustomer] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const isLargeScreen = useMediaQuery("(min-width:600px)");

  const handleUserClick = () => {
    setOpenUser(!openUser);
    setSelectedItem(openUser ? null : "user");
  };

  const handleCompanyClick = () => {
    setOpenCompany(!openCompany);
    setSelectedItem(openCompany ? null : "company");
  };

  const handleTransportClick = () => {
    setOpenTransport(!openTransport);
    setSelectedItem(openTransport ? null : "transport");
  };

  const handleVehicleClick = () => {
    setOpenVehicle(!openVehicle);
    setSelectedItem(openVehicle ? null : "vehicle");
  };

  const handleSupplierClick = () => {
    setOpenSupplier(!openSupplier);
    setSelectedItem(openSupplier ? null : "supplier");
  };

  const handleCustomerClick = () => {
    setOpenCustomer(!openCustomer);
    setSelectedItem(openCustomer ? null : "customer");
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
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, sign out",
      cancelButtonText: "Cancel",
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
              <Typography
                sx={{
                  color: "white",
                  textAlign: "center",
                  mb: 1,
                  fontWeight: "bold",
                }}
              >
                User ID: {userId}
              </Typography>
              <Divider sx={{ backgroundColor: "white", mb: 1 }} />
              <Typography
                sx={{ color: "white", textAlign: "center", fontWeight: "bold" }}
              >
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
              "&.Mui-selected:hover": {
                backgroundColor: "#2c74d1", // Update the hover color for the selected state
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
              "&.Mui-selected:hover": {
                backgroundColor: "#2c74d1", // Update the hover color for the selected state
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
              sx={{ paddingLeft: "55px",  listStyleType: "disc" }}
            >
              <ListItemButton
                component={Link}
                to="/create-user"
                onClick={() => handleItemClick("createUser")}
                selected={selectedItem === "createUser"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    // backgroundColor: "#3e8ee6",
                    color: "#3e8ee6",
                  },
                  "&.Mui-selected:hover": {
                    // backgroundColor: "#2c74d1", // Update the hover color for the selected state
                    color: "#2c74d1",
                  },
                  display: "list-item",
                }}
              >
                <ListItemText primary="Add User" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/manage-user"
                onClick={() => handleItemClick("maintainUser")}
                selected={selectedItem === "maintainUser"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    // backgroundColor: "#3e8ee6",
                    color: "#3e8ee6",
                  },
                  "&.Mui-selected:hover": {
                    // backgroundColor: "#2c74d1", // Update the hover color for the selected state
                    color: "#2c74d1",
                  },
                  display: "list-item",
                }}
              >
                <ListItemText primary="View User" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton
            onClick={handleCompanyClick}
            selected={selectedItem === "company"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#2c74d1", // Update the hover color for the selected state
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <BusinessCenter />
            </ListItemIcon>
            <ListItemText primary="Company Management" />
            {openCompany ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCompany} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{ paddingLeft: "55px", listStyleType: "disc" }}
            >
              <ListItemButton
                component={Link}
                to="/company-management"
                onClick={() => handleItemClick("createCompany")}
                selected={selectedItem === "createCompany"}sx={{
                  "&.Mui-selected, &:hover": {
                    // backgroundColor: "#3e8ee6",
                    color: "#3e8ee6",
                  },
                  "&.Mui-selected:hover": {
                    // backgroundColor: "#2c74d1", // Update the hover color for the selected state
                    color: "#2c74d1",
                  },
                  display: "list-item",
                }}
              >
                <ListItemText primary="Add Company" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/view-company"
                onClick={() => handleItemClick("maintainCompany")}
                selected={selectedItem === "maintainCompany"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    // backgroundColor: "#3e8ee6",
                    color: "#3e8ee6",
                  },
                  "&.Mui-selected:hover": {
                    // backgroundColor: "#2c74d1", // Update the hover color for the selected state
                    color: "#2c74d1",
                  },
                  display: "list-item",
                }}
              >
                <ListItemText primary="View Company" />
              </ListItemButton>
            </List>
          </Collapse>

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
              "&.Mui-selected:hover": {
                backgroundColor: "#2c74d1", // Update the hover color for the selected state
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
            onClick={handleTransportClick}
            selected={selectedItem === "transport"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#2c74d1", // Update the hover color for the selected state
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <Commute />
            </ListItemIcon>
            <ListItemText primary="Transporter Management" />
            {openTransport ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openTransport} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{ paddingLeft: "55px", listStyleType: "disc" }}
            >
              <ListItemButton
                component={Link}
                to="/transporter"
                onClick={() => handleItemClick("createTransport")}
                selected={selectedItem === "createTransport"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    // backgroundColor: "#3e8ee6",
                    color: "#3e8ee6",
                  },
                  "&.Mui-selected:hover": {
                    // backgroundColor: "#2c74d1", // Update the hover color for the selected state
                    color: "#2c74d1",
                  },
                  display: "list-item",
                }}
              >
                <ListItemText primary="Add Transporter" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/view-transporter"
                onClick={() => handleItemClick("maintainTransport")}
                selected={selectedItem === "maintainTransport"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    // backgroundColor: "#3e8ee6",
                    color: "#3e8ee6",
                  },
                  "&.Mui-selected:hover": {
                    // backgroundColor: "#2c74d1", // Update the hover color for the selected state
                    color: "#2c74d1",
                  },
                  display: "list-item",
                }}
              >
                <ListItemText primary="View Transporter" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton
            onClick={handleVehicleClick}
            selected={selectedItem === "vehicle"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#2c74d1", // Update the hover color for the selected state
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <DirectionsCar />
            </ListItemIcon>
            <ListItemText primary="Vehicle Management" />
            {openVehicle ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openVehicle} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{ paddingLeft: "55px", listStyleType: "disc" }}
            >
              <ListItemButton
                component={Link}
                to="/vehicle"
                onClick={() => handleItemClick("createVehicle")}
                selected={selectedItem === "createVehicle"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    // backgroundColor: "#3e8ee6",
                    color: "#3e8ee6",
                  },
                  "&.Mui-selected:hover": {
                    // backgroundColor: "#2c74d1", // Update the hover color for the selected state
                    color: "#2c74d1",
                  },
                  display: "list-item",
                }}
              >
                <ListItemText primary="Add Vehicle" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/view-vehicle"
                onClick={() => handleItemClick("maintainVehicle")}
                selected={selectedItem === "maintainVehicle"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    // backgroundColor: "#3e8ee6",
                    color: "#3e8ee6",
                  },
                  "&.Mui-selected:hover": {
                    // backgroundColor: "#2c74d1", // Update the hover color for the selected state
                    color: "#2c74d1",
                  },
                  display: "list-item",
                }}
              >
                <ListItemText primary="View Vehicle" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton
            onClick={handleSupplierClick}
            selected={selectedItem === "supplier"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#2c74d1", // Update the hover color for the selected state
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <Store />
            </ListItemIcon>
            <ListItemText primary="Supplier Management" />
            {openSupplier ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSupplier} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{ paddingLeft: "55px", listStyleType: "disc" }}
            >
              <ListItemButton
                component={Link}
                to="/Supplier"
                onClick={() => handleItemClick("createSupplier")}
                selected={selectedItem === "createSupplier"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    // backgroundColor: "#3e8ee6",
                    color: "#3e8ee6",
                  },
                  "&.Mui-selected:hover": {
                    // backgroundColor: "#2c74d1", // Update the hover color for the selected state
                    color: "#2c74d1",
                  },
                  display: "list-item",
                }}
              >
                <ListItemText primary="Add Supplier" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/view-supplier"
                onClick={() => handleItemClick("maintainSupplier")}
                selected={selectedItem === "maintainSupplier"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    // backgroundColor: "#3e8ee6",
                    color: "#3e8ee6",
                  },
                  "&.Mui-selected:hover": {
                    // backgroundColor: "#2c74d1", // Update the hover color for the selected state
                    color: "#2c74d1",
                  },
                  display: "list-item",
                }}
              >
                <ListItemText primary="View Supplier" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton
            onClick={handleCustomerClick}
            selected={selectedItem === "customer"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#2c74d1", // Update the hover color for the selected state
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Customer Management" />
            {openCustomer ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCustomer} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{ paddingLeft: "55px", listStyleType: "disc" }}
            >
              <ListItemButton
                component={Link}
                to="/Customer"
                onClick={() => handleItemClick("createCustomer")}
                selected={selectedItem === "createCustomer"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    // backgroundColor: "#3e8ee6",
                    color: "#3e8ee6",
                  },
                  "&.Mui-selected:hover": {
                    // backgroundColor: "#2c74d1", // Update the hover color for the selected state
                    color: "#2c74d1",
                  },
                  display: "list-item",
                }}
              >
                <ListItemText primary="Add Customer" />
              </ListItemButton>
              <ListItemButton
                component={Link}
                to="/view-customer"
                onClick={() => handleItemClick("maintainCustomer")}
                selected={selectedItem === "maintainCustomer"}
                sx={{
                  "&.Mui-selected, &:hover": {
                    // backgroundColor: "#3e8ee6",
                    color: "#3e8ee6",
                  },
                  "&.Mui-selected:hover": {
                    // backgroundColor: "#2c74d1", // Update the hover color for the selected state
                    color: "#2c74d1",
                  },
                  display: "list-item",
                }}
              >
                <ListItemText primary="View Customer" />
              </ListItemButton>
            </List>
          </Collapse>


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
              "&.Mui-selected:hover": {
                backgroundColor: "#2c74d1", // Update the hover color for the selected state
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <Handyman />
            </ListItemIcon>
            <ListItemText primary="Material Management" />
          </ListItemButton>

          


          <ListItemButton
            component={Link}
            to="/product-management"
            onClick={() => handleItemClick("productMaintenance")}
            selected={selectedItem === "productMaintenance"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#2c74d1", // Update the hover color for the selected state
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <ProductionQuantityLimits />
            </ListItemIcon>
            <ListItemText primary="Product Maintenance" />
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
              "&.Mui-selected:hover": {
                backgroundColor: "#2c74d1", // Update the hover color for the selected state
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#F8F8F8",
          marginLeft: isSideBarOpen ? "240px" : "0px",
          padding: "16px",
          transition: "margin-left 0.3s",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default SideBar;

