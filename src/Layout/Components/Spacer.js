import React from "react";
import Box from "@mui/material/Box";

function Spacer({ height }) {
  return (
    <Box
      sx={{
        height: height * 8,
        width: "100%",
        display: "block",
        flexGrow: 0,
        flexShrink: 0,
      }}
    ></Box>
  );
}

export default Spacer;
