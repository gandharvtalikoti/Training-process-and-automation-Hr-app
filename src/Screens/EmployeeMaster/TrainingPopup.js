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
import {
  DEPARTMENT,
  DURATION,
  FULL_NAME,
  SKILL_NAME,
  SUB_SKILL_NAME,
  EXPECTED_OUTPUT,
  OTHER_SKILLS,
  TRAINING_IDENTIFIED_DATE,
} from "./Constants";
import {
  validateTrainingField,
  validateTrainingSubmitField,
} from "./Validation";
import { getAllSubSKills } from "../Sub-skills/Service";
import { addEmployeeTraining, getAllDepartments } from "./Service";
import { Department } from "../../Layout/Images";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const durations = [
  {
    value: "within a month",
    label: "Within a month",
  },
  {
    value: "within 2 month",
    label: "Within 2 month",
  },
  {
    value: "within 3 month",
    label: "Within 3 month",
  },
];
function TrainingPopup({
  open,
  onClose,
  trainingPopup,
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
    [FULL_NAME]: "",
    [DEPARTMENT]: "",
    [SKILL_NAME]: "",
    [SUB_SKILL_NAME]: "",
    [EXPECTED_OUTPUT]: "",
    [OTHER_SKILLS]: "",
    [TRAINING_IDENTIFIED_DATE]: "",
  });
  const [errors, setErrors] = useState("");
  const [startDate, setStartDate] = useState("");

  const loadDropdowns = async () => {
    setLoader(true);
    try {
      const [skillsData, subskillsData, departmentsData] = await Promise.all([
        getAllSkills(),
        getAllSubSKills(),
        getAllDepartments(),
      ]);

      const skillsList = skillsData?.data?.map((d, index) => ({
        id: index + 1,
        value: d._id,
        label: d.name,
        department: d.department,
      }));

      const subskillsList = subskillsData?.data?.map((d, index) => ({
        id: index + 1,
        value: d._id,
        label: d.name,
        skill: d.skill,
      }));

      const departmentsList = departmentsData?.data?.map((d, index) => ({
        id: index + 1,
        value: d._id,
        label: d.name,
      }));
      const [department] = departmentsList.filter(
        (item) => item?.value === trainingPopup.departmentId
      );

      setSkills(skillsList);
      setSubSkills(subskillsList);
      setDepartments(departmentsList);
      setFormData((prev) => ({
        ...prev,
        [FULL_NAME]: trainingPopup.name,
        [DEPARTMENT]: department?.value,
      }));
    } catch (e) {
      console.error(e);
      snackbar("Something went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    const newErrors = validateTrainingField(errors, name, value);
    formData[name] = value;
    setFormData({ ...formData });
    setErrors({ ...newErrors });
  };

  const handleSaveTraining = async () => {
    const newErrors = validateTrainingSubmitField(formData);
    if (Object.keys(newErrors).length) {
      setErrors({ ...newErrors });
    } else {
      setTrainingLoader(true);
      const req = {
        [FULL_NAME]: formData[FULL_NAME].trim(),
        [DEPARTMENT]: formData[DEPARTMENT].trim(),
        [SKILL_NAME]: formData[SKILL_NAME].trim(),
        [SUB_SKILL_NAME]: formData[SUB_SKILL_NAME].trim(),
        [DURATION]: formData[DURATION].trim(),
        [EXPECTED_OUTPUT]: formData[EXPECTED_OUTPUT],
        [OTHER_SKILLS]: formData[OTHER_SKILLS],
        [TRAINING_IDENTIFIED_DATE]: formData[TRAINING_IDENTIFIED_DATE],
        employeeId: trainingPopup._id,
        status:"Pending"
      };

      try {
        const { data } = await addEmployeeTraining(req);
        snackbar(data.message, "success");
        onClose();
        setTrainingLoader(false);
        loadDepartments();
      } catch (e) {
        console.log(e);
        snackbar("Someting went wrong", "error");
        setTrainingLoader(false);
        // localStorage.clear();
      }
    }
  };

  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
    setFormData((prevState) => ({
      ...prevState,
      [TRAINING_IDENTIFIED_DATE]: newValue,
    }));
  };

  useEffect(() => {
    loadDropdowns();
  }, []);

  const filteredSubSkills = subSkills.filter(
    (item) => item.skill._id === formData[SKILL_NAME]
  );

  const filteredSkills = skills.filter(
    (item) => item.department === formData[DEPARTMENT]
  );
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
                Employee Training
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
                <TextField
                  id="employee_first_name"
                  label="Full Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  name={FULL_NAME}
                  onChange={handleTextChange}
                  value={formData[FULL_NAME]}
                  error={errors[FULL_NAME]}
                  helperText={errors[FULL_NAME]}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Stack direction="row" spacing={1}>
                  <TextField
                    id="employee-department"
                    label="Department"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    select
                    name={DEPARTMENT}
                    onChange={handleTextChange}
                    value={formData[DEPARTMENT]}
                    error={errors[DEPARTMENT]}
                    helperText={errors[DEPARTMENT]}
                    disabled
                  >
                    {departments.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  id="employee-skill"
                  label="Skill"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  select
                  name={SKILL_NAME}
                  onChange={handleTextChange}
                  value={formData[SKILL_NAME]}
                  error={errors[SKILL_NAME]}
                  helperText={errors[SKILL_NAME]}
                >
                  {filteredSkills.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  id="employee-skill"
                  label="Sub skill"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  select
                  name={SUB_SKILL_NAME}
                  onChange={handleTextChange}
                  value={formData[SUB_SKILL_NAME]}
                  error={errors[SUB_SKILL_NAME]}
                  helperText={errors[SUB_SKILL_NAME]}
                >
                  {filteredSubSkills.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  id="employee-skill"
                  label="Priority"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  select
                  name={DURATION}
                  onChange={handleTextChange}
                  value={formData[DURATION]}
                  error={errors[DURATION]}
                  helperText={errors[DURATION]}
                >
                  {durations.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  id="expected_output"
                  label="Expected output"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  name={EXPECTED_OUTPUT}
                  onChange={handleTextChange}
                  value={formData[EXPECTED_OUTPUT]}
                  error={errors[EXPECTED_OUTPUT]}
                  helperText={errors[EXPECTED_OUTPUT]}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  id="other_skills"
                  label="Other skills"
                  variant="outlined"
                  size="small"
                  fullWidth
                  name={OTHER_SKILLS}
                  onChange={handleTextChange}
                  value={formData[OTHER_SKILLS]}
                  error={errors[OTHER_SKILLS]}
                  helperText={errors[OTHER_SKILLS]}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <DesktopDatePicker
                  label="Training identified date"
                  inputFormat="MM/DD/YYYY"
                  // value={formData[TRAINING_IDENTIFIED_DATE]}
                  onChange={handleChangeStartDate}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      size="small"
                      error={errors[TRAINING_IDENTIFIED_DATE]}
                      helperText={errors[TRAINING_IDENTIFIED_DATE]}
                    />
                  )}
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

TrainingPopup.defaultProps = {};

TrainingPopup.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
};

export default TrainingPopup;
