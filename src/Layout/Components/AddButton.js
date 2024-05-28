import { Add } from "@mui/icons-material";
import { alpha, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function AddButton({ name, toLink }) {
  const theme = useTheme();
  return (
    <Button
      variant="contained"
      sx={{
        borderRadius: 50,
        height: 40,
        bgcolor: "#0a2d5e",
        color: "white",
        "&:hover": {
          color: "white",
          bgcolor: "#0a2d5e",
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
      component={Link}
      to={toLink}
      disableElevation
    >
      {name}
    </Button>
  );
}

export default AddButton;
