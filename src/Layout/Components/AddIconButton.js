import { Add } from "@mui/icons-material";
import { alpha, IconButton } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

function AddIconButton({ ...props }) {
  const theme = useTheme();
  return (
    <IconButton
      variant="contained"
      sx={{
        bgcolor: "#0a2d5e",
        color: "primary.main",
        "&:hover": {
          bgcolor: "#0a2d5e",
          color: "white",
        },
      }}
      {...props}
    >
      <Add />
    </IconButton>
  );
}

export default AddIconButton;
