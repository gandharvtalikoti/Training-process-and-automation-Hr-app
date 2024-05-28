import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { bool, func } from "prop-types";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

function TableAction({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 420,
          p: 2,
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 1,
            width: "100%",
          }}
        >
          <Box
            sx={{
              padding: 2,
              boxSizing: "border-box",
              borderBottom: 1,
              borderColor: "grey.300",
            }}
          >
            <Stack
              spacing={1}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" component="h2">
                Please confirm
              </Typography>
              <IconButton
                color="primary"
                component="span"
                size="small"
                onClick={onClose}
              >
                <Close />
              </IconButton>
            </Stack>
          </Box>
          <Box
            sx={{
              padding: 2,
              boxSizing: "border-box",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography>Do you want to delete &quot;Name&quot;</Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack
                  spacing={1}
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button
                    onClick={onClose}
                    size="medium"
                    color="inherit"
                    disableElevation
                  >
                    Close
                  </Button>
                  <Button
                    onClick={onClose}
                    size="medium"
                    color="error"
                    variant="contained"
                    disableElevation
                  >
                    Delete
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

TableAction.defaultProps = {};

TableAction.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
};

export default TableAction;
