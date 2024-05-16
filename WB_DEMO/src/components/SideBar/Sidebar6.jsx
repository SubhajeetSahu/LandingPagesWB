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
  Person,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  ExitToApp,
  Assignment,
  Build,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SideBar6 = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const isLargeScreen = useMediaQuery("(min-width:600px)");

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
              <Typography
                sx={{ color: "white", textAlign: "center", mb: 1, fontWeight: "bold" }}
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
        <List sx={{ marginTop: "80px" }}>
          <ListItemButton
            component={Link}
            to="/home6"
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
            to="/SalesOrder"
            onClick={() => handleItemClick("SalesOrder")}
            selected={selectedItem === "SalesOrder"}
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
              <Assignment />
            </ListItemIcon>
            <ListItemText primary="Sales Order" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/ProcessOrder"
            onClick={() => handleItemClick("ProcessOrder")}
            selected={selectedItem === "ProcessOrder"}
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
            <ListItemText primary="Process Order" />
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
export default SideBar6;
