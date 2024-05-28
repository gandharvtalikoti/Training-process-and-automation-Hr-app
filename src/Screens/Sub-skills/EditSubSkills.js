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
import { createSubSkill, deleteSubSKill, fetchSubSkillById, getAllSkills, getAllSubSKills, updateSubSkill } from "./Service";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import { SKILL_NAME, SUB_SKILL_NAME } from "./Constants";
import {
  validateSubSkillField,
  validateSubSkillSubmitFields,
} from "./Validation";
import { useNavigate, useParams } from "react-router-dom";

function EditSubSkills() {
  const { id } = useParams();

  const [loader, setLoader] = useState(false);
  const [skills, setSkills] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [deletePopup, setDeletePopup] = useState("");
  const [errors, setErrors] = useState({});
  const [createLoader, setCreateLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false)

  const [formData, setFormData] = useState({
    [SKILL_NAME]: "",
    [SUB_SKILL_NAME]: "",
  });

  const navigate = useNavigate();

  const snackbar = useSnackbar();
  const getSkillDropdowns = async () => {
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
      const { data } = await getAllSkills();
      const newList = data?.map((d, index) => ({
        value: d._id,
        label: d.name,
      }));
      setSkills(newList);
      loadSkillById();
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

 

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    const newErrors = validateSubSkillField(errors, name, value);
    formData[name] = value;
    setFormData({ ...formData });
    setErrors({ ...newErrors });
  };


  const handledSubSkillSubmit = async () => {
    const newErrors = validateSubSkillSubmitFields(formData);
    if (Object.keys(newErrors).length) {
      setErrors({ ...newErrors });
    } else {
      setCreateLoader(true);
      const req = {
        ...formData,
      };
      try {
        const { data } = await updateSubSkill(id,req);
        snackbar(data.message, "success");
        setCreateLoader(false);

      } catch (e) {
        console.log(e);
        snackbar("Someting went wrong", "error");
        setCreateLoader(false);
        // localStorage.clear();
      }
    }
  };

  const handleDeleteClose = () => {
    setDeletePopup(null);
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
      const { data } = await fetchSubSkillById(id);
      setFormData({
        [SKILL_NAME]: data.skill,
        [SUB_SKILL_NAME]: data.name,
      })
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setLoader(false);
    }
  };


  useEffect(() => {
    getSkillDropdowns();
  }, []);
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h6" color="secondary.main">
            New Sub Skills
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
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
                    {skills.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="sub-skill"
                    label="Sub Skill name"
                    variant="outlined"
                    fullWidth
                    required
                    size="small"
                    name={SUB_SKILL_NAME}
                    onChange={handleTextChange}
                    value={formData[SUB_SKILL_NAME]}
                    error={errors[SUB_SKILL_NAME]}
                    helperText={errors[SUB_SKILL_NAME]}
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
              onClick={() => navigate('/app/sub-skills')}
            >
              Back
            </Button>
            <ButtonCustom variant="contained" onClick={handledSubSkillSubmit}>
              {createLoader ? (
                <>
                  &nbsp;&nbsp;
                  <CircularProgress size={18} />
                </>
              ) : null}
              Save
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

export default EditSubSkills;
