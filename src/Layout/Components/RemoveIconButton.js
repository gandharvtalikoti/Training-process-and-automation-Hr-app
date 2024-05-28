import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { alpha, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function RemoveIconButton({ ...props }) {
  const theme = useTheme();
  return (
    <IconButton
      variant="contained"
      sx={{
        bgcolor: `${alpha(theme.palette.primary.main, 0.15)}`,
        color: "primary.main",
        "&:hover": {
          bgcolor: `${alpha(theme.palette.primary.main, 0.85)}`,
          color: "white",
        },
      }}
      {...props}
    >
      <RemoveIcon />
    </IconButton>
  );
}

export default RemoveIconButton;
