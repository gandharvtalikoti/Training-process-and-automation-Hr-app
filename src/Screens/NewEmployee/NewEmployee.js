import React, { useEffect, useState } from "react";
import { Add, Attachment, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import ButtonCustom from "../../Layout/Components/ButtonCustom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  editEmployee,
  fetchEmployeeById,
  getAllDepartments,
} from "./Service";
import {
  FULL_NAME,
  EMAIL,
  PHONE,
  DESIGNATION,
  DEPARTMENT,
  EXPERIENCE,
  GENDER,
  HEIGHT,
  PASSWORD,
  QULIFICATION,
  ROLE,
  WEIGHT,
  ADDRESS,
  OTHERS,
} from "./Constants";
import {
  validateEmployeeField,
  validateEmployeeSubmitFields,
} from "./Validation";
import { getAllSkills } from "../Skills/Service";

const genders = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

const roles = [
  {
    value: "Hr",
    label: "HR",
  },
  {
    value: "Employee",
    label: "Employee",
  },
  {
    value: "SECTIONAL_HEAD",
    label: "Section Head",
  },
];

function NewEmployeeMaster() {
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const [loader, setLoader] = useState(false);
  const [createLoader, setCreateLoader] = useState(false);
  const [checkedSkills, setCheckedSkills] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    [FULL_NAME]: "",
    [EMAIL]: "",
    [PHONE]: "",
    [DESIGNATION]: "",
    [DEPARTMENT]: "",
    [EXPERIENCE]: "",
    [GENDER]: "",
    [HEIGHT]: "",
    [PASSWORD]: "",
    [QULIFICATION]: "",
    [ROLE]: "",
    [WEIGHT]: "",
    [ADDRESS]: "",
    [OTHERS]: "",
  });
  const [errors, setErrors] = useState({});
  const [skills, setSkils] = useState([]);

  // const handleChangeBusinessUnit = (event) => {
  //   setBusinessUnit(event.target.value);
  // };

  const snackbar = useSnackbar();

  const handleCheckboxChange = (skillName) => (event) => {
    if (event.target.checked) {
      setCheckedSkills([...checkedSkills, skillName]);
    } else {
      setCheckedSkills(checkedSkills.filter((name) => name !== skillName));
    }
  };
  const loadDepartments = async () => {
    setLoader(true);
    try {
      // const modifiedSearchText = searchTerm.replace(/'/g, "''")
      // const params = {
      //   limit: filters.limit,
      //   page: filters.page,
      //   search: modifiedSearchText,
      //   isActive: filters.isActive,
      //   orderBy: filters.orderBy,
      // }
      const { data } = await getAllDepartments();

      const newList = data?.map((d, index) => ({
        value: d._id,
        label: d.name,
      }));
      setDepartments(newList);
      if (id) {
        getEmployeeDetailsById();
      } else {
        setLoader(false);
      }
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  const getEmployeeDetailsById = async () => {
    setLoader(true);
    try {
      // const modifiedSearchText = searchTerm.replace(/'/g, "''")
      // const params = {
      //   limit: filters.limit,
      //   page: filters.page,
      //   search: modifiedSearchText,
      //   isActive: filters.isActive,
      //   orderBy: filters.orderBy,
      // }
      const { data } = await fetchEmployeeById(id);
      setFormData({
        [FULL_NAME]: data.name,
        [PHONE]: data.phone,
        [EMAIL]: data.email,
        [DESIGNATION]: data.designation,
        [HEIGHT]: data.height,
        [WEIGHT]: data.weight,
        [GENDER]: data.gender,
        [DEPARTMENT]: data.department,
        [QULIFICATION]: data.qualification,
        [ROLE]: data.role,
        [EXPERIENCE]: data.experience,
        [PASSWORD]: data.password,
        [ADDRESS]: data.address,
        [OTHERS]: data.others,
      });
      setCheckedSkills(data.skills)
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    const newErrors = validateEmployeeField(errors, name, value);
    formData[name] = value;
    setFormData({ ...formData });
    setErrors({ ...newErrors });
  };

  const handledEmployeeSubmit = async () => {
    const newErrors = validateEmployeeSubmitFields(formData);
    if (Object.keys(newErrors).length) {
      setErrors({ ...newErrors });
    } else {
      setCreateLoader(true);
      const req = {
        ...formData,
        skills:checkedSkills
      };
      try {
        const { data } = await createEmployee(req);
        snackbar(data.message, "success");
        setCreateLoader(false);
        navigate("/app/employee-master");
        setFormData({
          [FULL_NAME]: "",
          [EMAIL]: "",
          [PHONE]: "",
          [DESIGNATION]: "",
          [ADDRESS]: "",
          [DEPARTMENT]: "",
          [EXPERIENCE]: "",
          [GENDER]: "",
          [HEIGHT]: "",
          [PASSWORD]: "",
          [QULIFICATION]: "",
          [ROLE]: "",
          [WEIGHT]: "",
          [OTHERS]: "",
        });
      } catch (e) {
        console.log(e);
        snackbar("Someting went wrong", "error");
        setCreateLoader(false);
        setFormData({
          [FULL_NAME]: "",
          [EMAIL]: "",
          [PHONE]: "",
          [DESIGNATION]: "",
          [ADDRESS]: "",
          [DEPARTMENT]: "",
          [EXPERIENCE]: "",
          [GENDER]: "",
          [HEIGHT]: "",
          [PASSWORD]: "",
          [QULIFICATION]: "",
          [ROLE]: "",
          [WEIGHT]: "",
          [OTHERS]: "",
        });
        // localStorage.clear();
      }
    }
  };

  const handledEmployeeUpdate = async () => {
    const newErrors = validateEmployeeSubmitFields(formData);
    if (Object.keys(newErrors).length) {
      setErrors({ ...newErrors });
    } else {
      setCreateLoader(false);
      const req = {
        ...formData,
        skills:checkedSkills
      };
      try {
        const { data } = await editEmployee(id, req);
        snackbar(data.message, "success");
        setCreateLoader(false);
        getEmployeeDetailsById();
      } catch (e) {
        console.log(e);
        snackbar("Someting went wrong", "error");
        setCreateLoader(false);
        // localStorage.clear();
      }
    }
  };
  const loadSkillsData = async () => {
    setLoader(true);
    try {
      const skillsResponse = await getAllSkills({ search: "" });
      setSkils(skillsResponse.data);
    } catch (e) {
      console.log(e);
      snackbar("Something went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    loadDepartments();
    loadSkillsData();
  }, []);

  const filteredSkills = skills?.filter(
    (item) => item.department === formData[DEPARTMENT]
  );
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item>
              <IconButton
                sx={{
                  border: 1,
                  borderColor: "grey.300",
                }}
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon fontSize="inherit" />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" color="secondary.main">
                <b>Employee Master</b>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
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
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_phone"
                    label="Phone"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    name={PHONE}
                    onChange={handleTextChange}
                    value={formData[PHONE]}
                    error={errors[PHONE]}
                    helperText={errors[PHONE]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    name={EMAIL}
                    onChange={handleTextChange}
                    value={formData[EMAIL]}
                    error={errors[EMAIL]}
                    helperText={errors[EMAIL]}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_designation"
                    label="Designation"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name={DESIGNATION}
                    onChange={handleTextChange}
                    value={formData[DESIGNATION]}
                    error={errors[DESIGNATION]}
                    helperText={errors[DESIGNATION]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_height"
                    label="Height"
                    variant="outlined"
                    size="small"
                    name={HEIGHT}
                    onChange={handleTextChange}
                    value={formData[HEIGHT]}
                    error={errors[HEIGHT]}
                    helperText={errors[HEIGHT]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_weight"
                    label="Weight"
                    variant="outlined"
                    size="small"
                    name={WEIGHT}
                    onChange={handleTextChange}
                    value={formData[WEIGHT]}
                    error={errors[WEIGHT]}
                    helperText={errors[WEIGHT]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Stack direction="row" spacing={1}>
                    <TextField
                      id="employee-gender"
                      label="Gender"
                      variant="outlined"
                      size="small"
                      fullWidth
                      select
                      name={GENDER}
                      onChange={handleTextChange}
                      value={formData[GENDER]}
                      error={errors[GENDER]}
                      helperText={errors[GENDER]}
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={4} lg={3}>
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
                    >
                      {departments.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_qualification"
                    label="Qualification"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name={QULIFICATION}
                    onChange={handleTextChange}
                    value={formData[QULIFICATION]}
                    error={errors[QULIFICATION]}
                    helperText={errors[QULIFICATION]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_experience"
                    label="Experience"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name={EXPERIENCE}
                    onChange={handleTextChange}
                    value={formData[EXPERIENCE]}
                    error={errors[EXPERIENCE]}
                    helperText={errors[EXPERIENCE]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Stack direction="row" spacing={1}>
                    <TextField
                      id="employee-role"
                      label="Role"
                      variant="outlined"
                      size="small"
                      fullWidth
                      select
                      required
                      name={ROLE}
                      onChange={handleTextChange}
                      value={formData[ROLE]}
                      error={errors[ROLE]}
                      helperText={errors[ROLE]}
                    >
                      {roles.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_password"
                    label="Password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    name={PASSWORD}
                    onChange={handleTextChange}
                    value={formData[PASSWORD]}
                    error={errors[PASSWORD]}
                    helperText={errors[PASSWORD]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="address"
                    label="Address"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    name={ADDRESS}
                    onChange={handleTextChange}
                    value={formData[ADDRESS]}
                    error={errors[ADDRESS]}
                    helperText={errors[ADDRESS]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="others"
                    label="Others"
                    variant="outlined"
                    size="small"
                    fullWidth
                    name={OTHERS}
                    onChange={handleTextChange}
                    value={formData[OTHERS]}
                    error={errors[OTHERS]}
                    helperText={errors[OTHERS]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography>Skills</Typography>
                  {filteredSkills.map((skill) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={skill._id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkedSkills.includes(skill.name)}
                            onChange={handleCheckboxChange(skill.name)}
                          />
                          
                        }
                        label={
                          <Typography variant="body2">{skill.name}</Typography>
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
            <Button
              variant="outlined"
              sx={{ borderColor: "grey.600", color: "grey.600" }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            {id ? (
              <ButtonCustom variant="contained" onClick={handledEmployeeUpdate}>
                {createLoader ? (
                  <>
                    &nbsp;&nbsp;
                    <CircularProgress size={18} />
                  </>
                ) : null}
                Save
              </ButtonCustom>
            ) : (
              <ButtonCustom variant="contained" onClick={handledEmployeeSubmit}>
                {createLoader ? (
                  <>
                    &nbsp;&nbsp;
                    <CircularProgress size={18} />
                  </>
                ) : null}
                Create
              </ButtonCustom>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default NewEmployeeMaster;
