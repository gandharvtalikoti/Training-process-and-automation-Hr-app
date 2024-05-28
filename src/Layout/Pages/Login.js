import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Divider, Typography } from "@mui/material";
import { Background } from "../Images";
import { Stack } from "@mui/system";

function Login({ FullLogo }) {
  return (
    <Box
      sx={{
        bgcolor: "white",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        p: 2,
        position: "relative",
        display: "block",
        boxSizing: "border-box",
        minHeight: "100vh",
      }}
    >
      <Container
        sx={{
          maxWidth: "none !important",
          pl: { xs: "0 !important", sm: "inherit !important" },
          pr: { xs: "0 !important", sm: "inherit !important" },
        }}
      >
        <Stack
          flexDirection="column"
          justifyContent="space-between"
          alignItems="inherit"
          sx={{
            minHeight: "calc(100vh - 32px)",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Stack
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            ></Stack>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Outlet />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default Login;
