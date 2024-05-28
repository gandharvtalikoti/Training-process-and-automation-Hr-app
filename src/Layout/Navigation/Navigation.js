import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Link, Outlet } from "react-router-dom";
import {
  Admin,
  Dashboard,
  ECommerce,
  SidebarLogo,
  Organization,
  AccountsIcon,
  shoppingCart,
} from "../Images";
import { Stack, Tooltip, useTheme, Typography } from "@mui/material";

function CustomLink({ img, alt, onClick, to }) {
  return (
    <Link to={to}>
      <Box
        onClick={onClick}
        sx={{
          display: "block",
          width: 160,
          marginBottom: 3,

          p: 1,
          cursor: "pointer",
          filter: "grayscale(1)",
          ":hover": {
            filter: "none",
          },
        }}
        to={`/app/`}
      >
        <Typography variant="body2" sx={{ color: "white" }}>
          {alt}
        </Typography>
      </Box>
    </Link>
  );
}

function Navigation() {
  const [role, setRole] = useState("");
  const theme = useTheme();

  useEffect(() => {
    // Fetch the user's role from localStorage
    const storedRole = localStorage.getItem("USER_ROLE");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        display: "block",
        position: "relative",
        backgroundColor: "#F3F5F9",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          px: 1,
          py: 2,
          boxSizing: "border-box",
          bgcolor: "#0a2d5e",
          boxShadow: 2,
          borderRadius: "0 10px 10px 0",
          border: 1,
          borderColor: "grey.300",
          height: "100%",
          width: 200,
          overflowX: "hidden",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            height: 10,
            width: 5,
          },
          "&::-webkit-scrollbar-track": {
            bgcolor: "grey.100",
            mb: 3,
            mt: 3,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "grey.300",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            bgcolor: "grey.400",
          },
          scrollbarWidth: "none",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "left",
          }}
        >
          <Stack justifyContent="space-between" alignItems="left">
            <Box
              component="img"
              src={SidebarLogo}
              alt="Spotlight"
              sx={{
                display: "block",
                width: "100px",
                height: "88px",
                borderRadius: "50%",
                marginBottom: 3,
              }}
            />
            {role === "Hr" && (
              <>
                <CustomLink
                  img={Dashboard}
                  component={Link}
                  to={`/app/`}
                  alt="Dashboard"
                />
                <CustomLink
                  img={Organization}
                  component={Link}
                  to={`/app/department/`}
                  alt="Department"
                />
                <CustomLink
                  img={Admin}
                  component={Link}
                  to={`/app/employee-master`}
                  alt="Employee master"
                />
                <CustomLink
                  img={AccountsIcon}
                  component={Link}
                  to={`/app/skills`}
                  alt="Skills"
                />
                <CustomLink
                  img={AccountsIcon}
                  component={Link}
                  to={`/app/sub-skills`}
                  alt="Sub Skills"
                />
                <CustomLink
                  img={ECommerce}
                  component={Link}
                  to={`/app/training`}
                  alt="Training"
                />
                <CustomLink
                  img={shoppingCart}
                  component={Link}
                  to={`/app/competence`}
                  alt="Competence"
                />
                <CustomLink
                  img={ECommerce}
                  component={Link}
                  to={`/app/effectiveness`}
                  alt="Training effectiveness"
                />
                <CustomLink
                  img={shoppingCart}
                  component={Link}
                  to={`/app/reports`}
                  alt="Reports"
                />
                <CustomLink
                  img={shoppingCart}
                  component={Link}
                  to={`/`}
                  alt="Logout"
                />
              </>
            )}
            {role === "SECTIONAL_HEAD" && (
              <>
                <CustomLink
                  img={Admin}
                  component={Link}
                  to={`/app/employee-master`}
                  alt="Employee master"
                />
                <CustomLink
                  img={shoppingCart}
                  component={Link}
                  to={`/`}
                  alt="Logout"
                />
              </>
            )}
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          display: "block",
          position: "absolute",
          left: 200,
          width: "calc(100% - 200px)",
          height: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            height: 10,
            width: 5,
          },
          "&::-webkit-scrollbar-track": {
            background: "rgb(151 167 195 / 30%)",
            mb: 3,
            mt: 3,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "primary.main",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            bgcolor: "primary.dark",
          },
          scrollbarWidth: "thin",
          scrollbarColor: `${theme.palette.primary.main} ${theme.palette.grey[200]}`,
          scrollMargin: 2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Navigation;
