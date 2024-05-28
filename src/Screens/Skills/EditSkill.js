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
import { SKILL_NAME, DEPARTMENT } from "./Constants";
import { validateSkillField, validateSkillSubmitFields } from "./Validation";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import {
  createSkill,
  deleteSkill,
  editSkill,
  fetchSkillById,
  getAllSkills,
} from "./Service";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDepartments } from "../EmployeeMaster/Service";
import { deepOrange } from "@mui/material/colors";

function EditSkill() {
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    [SKILL_NAME]: "",
    [DEPARTMENT]: "",
  });
  const [skillLoader, setSkillLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

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
        [SKILL_NAME]: formData[SKILL_NAME].trim(),
        [DEPARTMENT]: formData[DEPARTMENT],
      };
      try {
        const { data } = await editSkill(id, req);
        snackbar(data.message, "success");
        setSkillLoader(false);
      } catch (e) {
        console.log(e);
        snackbar("Someting went wrong", "error");
        setSkillLoader(false);
        // localStorage.clear();
      }
    }
  };

  const loadDepartments = async () => {
    setLoader(true);
    try {
      const { data } = await getAllDepartments();
      const newList = data?.map((d, index) => ({
        value: d._id,
        label: d.name,
      }));
      setDepartments(newList);
      loadSkillById();
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  const loadSkillById = async () => {
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
      const { data } = await fetchSkillById(id);
      setFormData({
        [SKILL_NAME]: data.name,
        [DEPARTMENT]: data.department,
      });
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6" color="secondary.main">
            Edit Skills
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
              onClick={() => navigate("/app/skills")}
            >
              BACK
            </Button>
            <ButtonCustom variant="contained" onClick={handledSkillSubmit}>
              {" "}
              {skillLoader ? (
                <>
                  &nbsp;&nbsp;
                  <CircularProgress size={18} />
                </>
              ) : null}
              SAVE
            </ButtonCustom>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Spacer height={2} />
        </Grid>
      </Grid>
    </>
  );
}
export default EditSkill;
