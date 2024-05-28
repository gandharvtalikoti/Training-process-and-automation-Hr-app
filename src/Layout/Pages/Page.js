import { Box, Container } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";

function Page() {
  return (
    <Box sx={{ p: 2, boxSizing: "border-box" }}>
      <Container sx={{ maxWidth: "none !important", height: "100%" }}>
        <Box
          component="img"
          sx={{
            display: "block",
            width: 220,
            marginBottom: 4,
          }}
        />
        <Outlet />
      </Container>
    </Box>
  );
}

export default Page;
