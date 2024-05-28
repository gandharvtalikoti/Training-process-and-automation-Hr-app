import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Loading() {
  return (
    <Box
      sx={{
        bgcolor: "action.active",
        display: "block",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 99999,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    </Box>
  );
}

export default Loading;
