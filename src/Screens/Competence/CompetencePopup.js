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
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import { getAllSkills } from "../Skills/Service";
import { DEPARTMENT, SCORE, ACTUAL_SCORE } from "./Constants";
import {
  validateCompetenceField,
  validateCompetenceSubmitField,
  validateTrainingField,
  validateTrainingSubmitField,
} from "./Validation";
import { getAllSubSKills } from "../Sub-skills/Service";
import { addEmployeeTraining, addScore, getAllDepartments } from "./Service";
import { Department } from "../../Layout/Images";
import { SUGGESTED_FACULTY } from "../Training/Constants";

const scores = [
  {
    value: "25",
    label: "25",
  },
  {
    value: "50",
    label: "50",
  },
  {
    value: "75",
    label: "75",
  },
  {
    value: "100",
    label: "100",
  },
];
function CompetencePopup({
  open,
  onClose,
  competencePopup,
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
    [ACTUAL_SCORE]: competencePopup?.expectedOutput,
    [SCORE]: "",
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
      const status =
        formData[SCORE] < formData[ACTUAL_SCORE]
          ? "Reschedule Training"
          : "Completed competence";

      const req = {
        [SCORE]: formData[SCORE],
        [ACTUAL_SCORE]: formData[ACTUAL_SCORE],
        status,
        employeeId:
          competencePopup?.employeeId?._id || competencePopup?._id || null,
        name: competencePopup?.name,
        departmentId: competencePopup?.departmentId,
      };
      console.log(req)
   
      if (!competencePopup?.employeeId?._id) {
        req.name = competencePopup?.name;
        req.department = competencePopup?.departmentId;
      }
      try {
        const { data } = await addScore(
          req,
          competencePopup?.employeeId?._id ? competencePopup?._id : 0
        );
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
                Competence
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
                    label="Required Score"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    select
                    name={ACTUAL_SCORE}
                    onChange={handleTextChange}
                    value={formData[ACTUAL_SCORE]}
                    error={errors[ACTUAL_SCORE]}
                    helperText={errors[ACTUAL_SCORE]}
                  >
                    {scores.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  id="score"
                  label="Actual Score"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  name={SCORE}
                  onChange={handleTextChange}
                  value={formData[SCORE]}
                  error={errors[SCORE]}
                  helperText={errors[SCORE]}
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

CompetencePopup.defaultProps = {};

CompetencePopup.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
};

export default CompetencePopup;
