import { Add, Edit } from "@mui/icons-material";
import {
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Spacer from "../../Layout/Components/Spacer";
import DataTable from "./DataTable";
import ButtonCustom from "../../Layout/Components/ButtonCustom";
import { DEPARTMENT, SKILL_NAME } from "./Constants";
import { validateSkillField, validateSkillSubmitFields } from "./Validation";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import { createSkill, deleteSkill, getAllSkills } from "./Service";
import { getAllDepartments } from "../EmployeeMaster/Service";

function Skills() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    [SKILL_NAME]: "",
    [DEPARTMENT]: "",
  });
  const [skillLoader, setSkillLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [skills, setSkills] = useState([]);
  const [deletePopup, setDeletePopup] = useState("");
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [departments, setDepartments] = useState([]);
  const snackbar = useSnackbar();
  const [searchText, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    search: "",
  });

  const searchedValue = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    const newErrors = validateSkillField(errors, name, value);
    formData[name] = value;
    setFormData({ ...formData });
    setErrors({ ...newErrors });
  };

  const handledSkillSubmit = async () => {
    const newErrors = validateSkillSubmitFields(formData);
    if (Object.keys(newErrors).length) {
      setErrors({ ...newErrors });
    } else {
      setSkillLoader(true);
      const req = {
        [DEPARTMENT]: formData[DEPARTMENT],
        [SKILL_NAME]: formData[SKILL_NAME].trim(),
      };
      try {
        const { data } = await createSkill(req);
        snackbar(data.message, "success");
        setSkillLoader(false);
        setFormData({ [SKILL_NAME]: "", [DEPARTMENT]: "" });
        loadData();
      } catch (e) {
        console.log(e);
        snackbar("Someting went wrong", "error");
        setSkillLoader(false);
        setFormData({ [SKILL_NAME]: "", [DEPARTMENT]: "" });
        // localStorage.clear();
      }
    }
  };

  const handleDeleteSkill = (department) => {
    setDeletePopup(department);
  };

  const handleDeleteClose = () => {
    setDeletePopup(null);
  };

  // const loadDepartments = async () => {
  //   setLoader(true);
  //   try {
  //     const { data } = await getAllDepartments();
  //     const newList = data?.map((d, index) => ({
  //       value: d._id,
  //       label: d.name,
  //     }));
  //     setDepartments(newList);
  //     loadSkills();
  //   } catch (e) {
  //     console.log(e);
  //     snackbar("Someting went wrong", "error");
  //   } finally {
  //     setLoader(false);
  //   }
  // };
  // const loadSkills = async () => {
  //   setLoader(true);
  //   try {
  //     // const modifiedSearchText = searchTerm.replace(/'/g, "''")
  //     const params = {
  //       search: filters.search,
  //     };
  //     const { data } = await getAllSkills(params);
  //     console.log(departments)

  //     const newList = data?.map((d, index) => {
  //       const department = departments.find(
  //         (dep) => dep._id === d.department
  //       );
  //       return {
  //         ...d,
  //         id: index + 1,
  //         departmentName: department ? department.label : "-",
  //         handleDeleteSkill,
  //       };
  //     });
  //     setSkills(newList);
  //   } catch (e) {
  //     console.log(e);
  //     snackbar("Someting went wrong", "error");
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const loadData = async () => {
    setLoader(true);
    try {
      const [departmentsResponse, skillsResponse] = await Promise.all([
        getAllDepartments(),
        getAllSkills({ search: filters.search }),
      ]);

      const departmentsData = departmentsResponse.data;
      const skillsData = skillsResponse.data;

      const departmentList = departmentsData?.map((d) => ({
        value: d._id,
        label: d.name,
      }));

      setDepartments(departmentList);

      const skillsList = skillsData?.map((d, index) => {
        const department = departmentList.find(
          (dep) => dep.value === d.department
        );
        return {
          ...d,
          id: index + 1,
          departmentName: department ? department.label : "-",
          handleDeleteSkill,
        };
      });

      setSkills(skillsList);
    } catch (e) {
      console.log(e);
      snackbar("Something went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  const handleConfirmDelete = async () => {
    setDeleteLoader(true);
    const { _id: id } = deletePopup;
    try {
      const { data } = await deleteSkill(id);
      snackbar(data.message, "success");
      handleDeleteClose();
      loadData();
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setDeleteLoader(false);
    }
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (filters.search !== searchText) {
        setFilters((prev) => ({ search: searchText }));
      }
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  useEffect(() => {
    loadData();
  }, [filters]);
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography color="secondary.main" gutterBottom>
            HR->skills
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color="secondary.main">
            New Skills
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
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
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="business-unit"
                    label="Skill name"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    name={SKILL_NAME}
                    onChange={handleTextChange}
                    value={formData[SKILL_NAME]}
                    error={errors[SKILL_NAME]}
                    helperText={errors[SKILL_NAME]}
                  />
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
            >
              Cancel
            </Button>
            <ButtonCustom variant="contained" onClick={handledSkillSubmit}>
              {" "}
              {skillLoader ? (
                <>
                  &nbsp;&nbsp;
                  <CircularProgress size={18} />
                </>
              ) : null}
              Create
            </ButtonCustom>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Spacer height={2} />
        </Grid>
        <Grid item xs={12}>
          <DataTable
            skills={skills}
            deletePopup={deletePopup}
            handleConfirmDelete={handleConfirmDelete}
            searchedValue={searchedValue}
          />
        </Grid>
      </Grid>
    </>
  );
}
export default Skills;
