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
import {
  createSubSkill,
  deleteSubSKill,
  getAllSkills,
  getAllSubSKills,
} from "./Service";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import { SKILL_NAME, SUB_SKILL_NAME } from "./Constants";
import {
  validateSubSkillField,
  validateSubSkillSubmitFields,
} from "./Validation";
import { useNavigate } from "react-router-dom";

function SubSkills() {
  const [loader, setLoader] = useState(false);
  const [skills, setSkills] = useState([]);
  const [dropdownSkills, setDropdownSkills] = useState([]);

  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [deletePopup, setDeletePopup] = useState("");
  const [errors, setErrors] = useState({});
  const [createLoader, setCreateLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [skillName, setSkillName] = useState("ALL");
  const [formData, setFormData] = useState({
    [SKILL_NAME]: "",
    [SUB_SKILL_NAME]: "",
  });
  const [searchText, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    search: "",
  });

  const searchedValue = (e) => {
    setSearchTerm(e.target.value.trim());
  };
  const navigate = useNavigate();

  const snackbar = useSnackbar();
  const getSkillDropdowns = async () => {
    setLoader(true);
    try {
      const { data } = await getAllSkills();
      const newList = data?.map((d, index) => ({
        value: d._id,
        label: d.name,
      }));
      const newSkillList = data?.map((d, index) => ({
        value: d._id,
        label: d.name,
      }));
      newSkillList.unshift({ value: "ALL", label: "ALL" });

      setSkills(newList);
      setDropdownSkills(newSkillList)
      getTableData();
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  const getTableData = async () => {
    setLoader(true);
    try {
      const params = {
        search: filters.search,
      };
      const { data } = await getAllSubSKills(params);
      const newList = data?.map((d, index) => ({
        ...d,
        id: index + 1,
        handleDeleteSubSKill,
        skill: d?.skill?.name,
        skillId: d?.skill?._id
      }));
      setTableData(newList);
      setData(newList);
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
  const handleDeleteSubSKill = (subSkill) => {
    setDeletePopup(subSkill);
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
        const { data } = await createSubSkill(req);
        snackbar(data.message, "success");
        setCreateLoader(false);
        setFormData({
          [SKILL_NAME]: "",
          [SUB_SKILL_NAME]: "",
        });
        getSkillDropdowns();
      } catch (e) {
        console.log(e);
        snackbar("Someting went wrong", "error");
        setCreateLoader(false);
        setFormData({
          [SKILL_NAME]: "",
          [SUB_SKILL_NAME]: "",
        });
        // localStorage.clear();
      }
    }
  };

  const handleDeleteClose = () => {
    setDeletePopup(null);
  };

  const handleConfirmDelete = async () => {
    setDeleteLoader(true);

    const { _id: id } = deletePopup;
    try {
      const { data } = await deleteSubSKill(id);
      snackbar(data.message, "success");
      handleDeleteClose();
      getSkillDropdowns();
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setDeleteLoader(false);
    }
  };

  const handleChangeDepartment = (event) => {
    const skillId = event.target.value;    
    const filterdTableData = data.filter((item) => item.skillId === skillId);
    if (skillId === "ALL") {
      setTableData(data);
    } else {
      setTableData(filterdTableData);
    }
    setSkillName(event.target.value);
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
    getSkillDropdowns();
  }, [filters]);
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography color="secondary.main" gutterBottom>
            HR->sub-skills
          </Typography>
        </Grid>
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
            >
              Cancel
            </Button>
            <ButtonCustom variant="contained" onClick={handledSubSkillSubmit}>
              {createLoader ? (
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
            tableData={tableData}
            deletePopup={deletePopup}
            handleConfirmDelete={handleConfirmDelete}
            searchedValue={searchedValue}
            skills={dropdownSkills}
            handleChangeDepartment={handleChangeDepartment}
            skillName={skillName}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default SubSkills;
