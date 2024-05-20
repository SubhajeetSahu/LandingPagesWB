import { useState } from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Popover,
  Divider,
  Avatar,
  Collapse,
  IconButton,
  ListItemButton,
  Typography,
  Box,
  useMediaQuery,
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
  Handyman
} from "@mui/icons-material";
import PrintIcon from '@mui/icons-material/Print';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar3 = ({ children }) => {
  const [openUser, setOpenUser] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const isLargeScreen = useMediaQuery("(min-width:600px)");

  const handleUserClick = () => {
    setOpenUser(!openUser);
    setSelectedItem(openUser ? null : "user");
  };

  const ReversedFireTruckIcon = styled(FireTruckIcon)({
    transform: 'scaleX(-1)',
  });
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
  console.log(userName, roles, userId);

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
      cancelButtonText: "Cancel"
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
                Roles: {roles.join(", ")}
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
        <List sx={{ marginTop: "80px" }}>
          <ListItemButton
            component={Link}
            to="/QualityCheck"
            onClick={() => handleItemClick("QualityCheck")}
            selected={selectedItem === "QualityCheck"}
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
                backgroundColor: "#2c74d1",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Quality Dashboard" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/QualityInboundDashboard"
            onClick={() => handleItemClick("Inbound")}
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
              "&.Mui-selected:hover": {
                backgroundColor: "#2c74d1",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <FireTruckIcon />
            </ListItemIcon>
            <ListItemText primary="Inbound" />
          </ListItemButton>
          <ListItemButton
  component={Link}
  to="/QualityOutboundDashboard"
  onClick={() => handleItemClick("Outbound")}
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
    "&.Mui-selected:hover": {
      backgroundColor: "#2c74d1",
      color: "white",
    },
  }}
>
  <ListItemIcon>
    <ReversedFireTruckIcon />
  </ListItemIcon>
  <ListItemText primary="Outbound" />
</ListItemButton>
          <ListItemButton
            component={Link}
            to="/QReport"
            onClick={() => handleItemClick("Reports")}
            selected={selectedItem === "Reports"}
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
                backgroundColor: "#2c74d1",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/QPrint"
            onClick={() => handleItemClick("Print")}
            selected={selectedItem === "Print"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#3e8ee6",
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#3                8ee6",
                color: "white",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#2c74d1",
                color: "white",
              },
            }}
          >
            <ListItemIcon>
              <PrintIcon />
            </ListItemIcon>
            <ListItemText primary="Print" />
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
                backgroundColor: "#2c74d1",
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

export default Sidebar3;
