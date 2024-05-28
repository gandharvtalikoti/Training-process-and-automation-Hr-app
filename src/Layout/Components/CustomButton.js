import React from "react";
import { Add } from "@mui/icons-material";
import { alpha, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function CustomButton({ name, ...props }) {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: 50,
        height: 40,
        bgcolor: `${alpha(theme.palette.primary.main, 0.15)}`,
        color: "primary.main",
        "&:hover": {
          color: "white",
        },
      }}
      startIcon={
        <Add
          sx={{
            bgcolor: "common.white",
            color: "primary.main",
            borderRadius: "50%",
            boxShadow: "0 0 10px rgb(21 112 75 / 53%)",
          }}
        />
      }
      disableElevation
      {...props}
    >
      {name}
    </Button>
  );
}

export default CustomButton;
