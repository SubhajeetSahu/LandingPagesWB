import { useState } from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
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
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  Person,
  Print,
  Report,
  Camera,
  DirectionsCar,
  ExitToApp
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SideBar2 = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const isLargeScreen = useMediaQuery("(min-width:600px)");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        window.location.href = "/";
        if (window.history && window.history.pushState) {
          window.history.replaceState(null, null, "/");
          window.history.pushState(null, null, "/");
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
          <IconButton onClick={toggleSidebar}>
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
                Roles: {roles}
              </Typography>
            </Box>
          </Popover>
        </Box>
      </Box>
      <Drawer
        variant="temporary"
        open={isSidebarOpen}
        onClose={toggleSidebar}
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
        <List sx={{ marginTop: "120px" }}>
          <ListItemButton
            component={Link}
            to="/VehicleEntry"
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
            component={Link}
            to="/VehicleEntryDetails"
            selected={selectedItem === "Inbound"}
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
            <ListItemText primary="Inbound" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            // to="/VehicleEntry-Outbound"
            to="/Sales-Details"
            selected={selectedItem === "Outbound"}
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
              < DirectionsCar />
            </ListItemIcon>
            <ListItemText primary="Outbound" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/reports"
            onClick={() => handleItemClick("report")}
            selected={selectedItem === "report"}
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
              <Report />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/print"
            onClick={() => handleItemClick("print")}
            selected={selectedItem === "print"}
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
              <Print />
            </ListItemIcon>
            <ListItemText primary="Print" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/camera"
            onClick={() => handleItemClick("camera")}
            selected={selectedItem === "camera"}
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
              <Camera />
            </ListItemIcon>
            <ListItemText primary="Camera" />
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
          marginLeft: isSidebarOpen ? "240px" : "0",
          overflowX: "hidden",
        }}
      >
        {children}
      </div>
    </>
  );
};
export default SideBar2;
