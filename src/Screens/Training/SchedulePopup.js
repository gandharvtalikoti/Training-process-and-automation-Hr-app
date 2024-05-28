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
  START_DATE,
  END_DATE,
  START_TIME,
  END_TIME,
  SUGGESTED_FACULTY,
} from "./Constants";
import {
  validateTrainingField,
  validateTrainingSubmitField,
} from "./Validation";
import { getAllSubSKills } from "../Sub-skills/Service";
import {
  addEmployeeTraining,
  changeEmployeeStatus,
  getAllDepartments,
  scheduleEmployeeTraining,
} from "./Service";
import { Department } from "../../Layout/Images";
import { DesktopDatePicker, DesktopTimePicker } from "@mui/x-date-pickers";

const durations = [
  {
    value: "within a month",
    label: "Within 1 month",
  },
  {
    value: "within 2 month",
    label: "Within 2 months",
  },
  {
    value: "within 3 month",
    label: "Within 3 months",
  },
];
function SchedulePopup({
  open,
  onClose,
  trainingPopup,
  handleConfirmDelete,
  loadTrainingData,
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
    [DURATION]: trainingPopup?.duration,
    [SUGGESTED_FACULTY]: "",
  });
  const [errors, setErrors] = useState("");

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
        (item) => item.value === trainingPopup.department
      );
      setSkills(skillsList);
      setSubSkills(subskillsList);
      setDepartments(departmentsList);
      setFormData((prev) => ({
        ...prev,
        [FULL_NAME]: trainingPopup?.name,
        [DEPARTMENT]: trainingPopup?.department?._id,
        [SKILL_NAME]: trainingPopup?.skill?._id,
        [SUB_SKILL_NAME]: trainingPopup?.subSkillName?._id,
        [DURATION]: trainingPopup?.duration,
      }));
    } catch (e) {
      console.error(e);
      snackbar("Something went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  const handleChangeStartDate = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      [START_DATE]: newValue,
    }));
  };

  const handleChangeEndDate = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      [END_DATE]: newValue,
    }));
  };

  const handleDeliveryStartTime = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      [START_TIME]: newValue,
    }));
  };

  const handleDeliveryEndTime = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      [END_TIME]: newValue,
    }));
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
      snackbar("Some fields are missing", "error");
    } else {
      setTrainingLoader(true);
      const req = {
        [FULL_NAME]: formData[FULL_NAME].trim(),
        [DEPARTMENT]: formData[DEPARTMENT].trim(),
        [SKILL_NAME]: formData[SKILL_NAME].trim(),
        [SUB_SKILL_NAME]: formData[SUB_SKILL_NAME].trim(),
        [DURATION]: formData[DURATION].trim(),
        [START_DATE]: formData[START_DATE],
        [END_DATE]: formData[END_DATE],
        [START_TIME]: formData[START_TIME],
        [END_TIME]: formData[END_TIME],
        employeeId: trainingPopup.employeeId?._id,
        status: "In progress",
        [SUGGESTED_FACULTY]: formData[SUGGESTED_FACULTY],
      };
      try {
        const { data } = await scheduleEmployeeTraining(
          req,
          trainingPopup?._id
        );
        loadTrainingData();
        snackbar(data.message, "success");
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

  const handleAbsentStatus = async () => {
    const employeeId = trainingPopup._id;
    const req = {
      status: "Absent",
    };
    try {
      const { data } = await changeEmployeeStatus(req, employeeId);
      loadTrainingData();
      snackbar(data.message, "success");
      onClose();
      setTrainingLoader(false);
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
      setTrainingLoader(false);
      // localStorage.clear();
    }
  };

  useEffect(() => {
    loadDropdowns();
  }, []);

  const filteredSubSkills = subSkills.filter(
    (item) => item.skill._id === formData[SKILL_NAME]
  );
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 620,
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
              <Grid item xs={12} sm={12} md={6} lg={6}>
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
              <Grid item xs={12} sm={12} md={6} lg={6}>
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
              <Grid item xs={12} sm={12} md={6} lg={6}>
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
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
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
                  // disabled
                >
                  {skills.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
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
                  // disabled
                >
                  {filteredSubSkills.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  id="suggested-faculty"
                  label="Suggested faculty or Trainer"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  name={SUGGESTED_FACULTY}
                  onChange={handleTextChange}
                  value={formData[SUGGESTED_FACULTY]}
                  error={errors[SUGGESTED_FACULTY]}
                  helperText={errors[SUGGESTED_FACULTY]}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DesktopDatePicker
                  label="Start Date*"
                  inputFormat="MM/DD/YYYY"
                  value={formData[START_DATE]}
                  onChange={handleChangeStartDate}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      size="small"
                      error={errors[START_DATE]}
                      helperText={errors[START_DATE]}
                      
                    />
                  )}
                  
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DesktopDatePicker
                  label="End Date*"
                  inputFormat="MM/DD/YYYY"
                  value={formData[END_DATE]}
                  onChange={handleChangeEndDate}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      size="small"
                      error={errors[END_DATE]}
                      helperText={errors[END_DATE]}
                    />
                  )}
                  minDate={formData[START_DATE]}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DesktopTimePicker
                  label="Start Time*"
                  value={formData[START_TIME]}
                  onChange={handleDeliveryStartTime}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{ ...params.inputProps, readOnly: true }}
                      fullWidth
                      required
                      size="small"
                      error={errors[START_TIME]}
                      helperText={errors[START_TIME]}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <DesktopTimePicker
                  label="End Time*"
                  value={formData[END_TIME]}
                  onChange={handleDeliveryEndTime}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{ ...params.inputProps, readOnly: true }}
                      fullWidth
                      required
                      size="small"
                      error={errors[END_TIME]}
                      helperText={errors[END_TIME]}
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
                    onClick={handleAbsentStatus}
                    size="medium"
                    color="warning"
                    variant="contained"
                    disableElevation
                  >
                    {trainingLoader ? (
                      <>
                        &nbsp;&nbsp;
                        <CircularProgress size={18} />
                      </>
                    ) : null}
                    Absent
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

SchedulePopup.defaultProps = {};

SchedulePopup.propTypes = {
  open: bool.isRequired,
  onClose: func.isRequired,
};

export default SchedulePopup;
