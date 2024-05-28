import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { bool, func } from "prop-types";
import {
  CircularProgress,
  IconButton,
  MenuItem,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import { getAllSkills } from "../Skills/Service";
import { DEPARTMENT, EFFECTIVENESS, COMMENT } from "./Constants";
import {
  validateCompetenceField,
  validateCompetenceSubmitField,
  validateTrainingField,
  validateTrainingSubmitField,
} from "./Validation";
import { getAllSubSKills } from "../Sub-skills/Service";
import {
  addEffectiveness,
  addEmployeeTraining,
  addScore,
  getAllDepartments,
} from "./Service";
import { Department } from "../../Layout/Images";
import Effectiveness from "./Effectiveness";

const effectivenessDropdown = [
  {
    value: "Effective",
    label: "Effective",
  },
  {
    value: "Not Effective",
    label: "Not Effective",
  },
];

function EffectivenessPopup({
  open,
  onClose,
  effectivenessPopup,
  handleConfirmDelete,
  loadDepartments,
}) {
  const [loader, setLoader] = useState(false);
  const [trainingLoader, setTrainingLoader] = useState(false);

  const snackbar = useSnackbar();
  const [skills, setSkills] = useState([]);
  const [subSkills, setSubSkills] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    [EFFECTIVENESS]: "",
    [COMMENT]: "",
  });
  const [errors, setErrors] = useState("");

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    const newErrors = validateCompetenceField(errors, name, value);
    formData[name] = value;
    setFormData({ ...formData });
    setErrors({ ...newErrors });
  };

  const handleSaveTraining = async () => {
    const newErrors = validateCompetenceSubmitField(formData);
    if (Object.keys(newErrors).length) {
      setErrors({ ...newErrors });
    } else {
      setTrainingLoader(true);
      const status = formData[EFFECTIVENESS];
      const req = {
        [EFFECTIVENESS]: formData[EFFECTIVENESS],
        [COMMENT]: formData[COMMENT],
        status,
        employeeId: effectivenessPopup.employeeId?._id,
      };
      try {
        const { data } = await addEffectiveness(req, effectivenessPopup?._id);
        snackbar(data.message, "success");
        loadDepartments();
        onClose();
        setTrainingLoader(false);
      } catch (e) {
        console.log(e);
        snackbar("Someting went wrong", "error");
        setTrainingLoader(false);
        // localStorage.clear();
      }
    }
  };

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
                Effectiveness
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
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Stack direction="row" spacing={1}>
                  <TextField
                    id="employee-department"
                    label="Effectiveness"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    select
                    name={EFFECTIVENESS}
                    onChange={handleTextChange}
                    value={formData[EFFECTIVENESS]}
                    error={errors[EFFECTIVENESS]}
                    helperText={errors[Effectiveness]}
                  >
                    {effectivenessDropdown.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  id="remarks"
                  label="Remarks"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  name={COMMENT}
                  onChange={handleTextChange}
                  value={formData[COMMENT]}
                  error={errors[COMMENT]}
                  helperText={errors[COMMENT]}
                />
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
                    onClick={handleSaveTraining}
                    size="medium"
                    color="primary"
                    variant="contained"
                    disableElevation
                  >
                    {trainingLoader ? (
                      <>
                        &nbsp;&nbsp;
                        <CircularProgress size={18} />
                      </>
                    ) : null}
                    Save
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

EffectivenessPopup.defaultProps = {};

EffectivenessPopup.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
};

export default EffectivenessPopup;
