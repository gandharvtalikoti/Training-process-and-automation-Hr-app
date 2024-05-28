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
import ButtonCustom from "../../Layout/Components/ButtonCustom";
import Spacer from "../../Layout/Components/Spacer";
import DataTable from "./DataTable";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import { Link, useNavigate } from "react-router-dom";
import { DEPARTMENT_NAME, DEPARTMENT_CODE } from "./Constants";
import {
  validateDepartmentField,
  validateDepartmentSubmitFields,
} from "./Validation";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
} from "./Service";
import Loading from "../../Layout/Components/Loading";

function Department() {
  const [location, setLocation] = useState();
  const [formData, setFormData] = useState({
    [DEPARTMENT_NAME]: "",
    [DEPARTMENT_CODE]: "",
  });
  const [errors, setErrors] = useState({});
  const [departmentLoader, setDepartmentLoader] = useState(false);
  const [loader, setLoader] = useState("");
  const [departments, setDepartments] = useState([]);
  const [deletePopup, setDeletePopup] = useState("");
  const [deleteLoader, setDeleteLoader] = useState("");
  const [searchText, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    search: "",
  });

  const snackbar = useSnackbar();
  const navigate = useNavigate();

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    const newErrors = validateDepartmentField(errors, name, value);
    formData[name] = value;
    setFormData({ ...formData });
    setErrors({ ...newErrors });
  };
  const handleDeleteDepartment = (department) => {
    setDeletePopup(department);
  };

  const handleDeleteClose = () => {
    setDeletePopup(null);
  };

  const handledDepartmentSubmit = async () => {
    const newErrors = validateDepartmentSubmitFields(formData);
    if (Object.keys(newErrors).length) {
      setErrors({ ...newErrors });
    } else {
      setDepartmentLoader(true);
      const req = {
        [DEPARTMENT_NAME]: formData[DEPARTMENT_NAME].trim(),
        [DEPARTMENT_CODE]: formData[DEPARTMENT_CODE].trim(),
      };
      try {
        const { data } = await createDepartment(req);
        snackbar(data.message, "success");
        setDepartmentLoader(false);
        setFormData({ [DEPARTMENT_NAME]: "", [DEPARTMENT_CODE]: "" });
        loadDepartments();
      } catch (e) {
        console.log(e);
        snackbar("Someting went wrong", "error");
        setDepartmentLoader(false);
        setFormData({ [DEPARTMENT_NAME]: "", [DEPARTMENT_CODE]: "" });
        // localStorage.clear();
      }
    }
  };

  const loadDepartments = async () => {
    setLoader(true);
    try {
      const params = {
        search: filters.search,
      };
      const { data } = await getAllDepartments(params);
      const newList = data?.map((d, index) => ({
        ...d,
        id: index + 1,
        handleDeleteDepartment,
      }));
      setDepartments(newList);
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  const handleConfirmDelete = async () => {
    setDeleteLoader(true);

    const { _id: id } = deletePopup;
    try {
      const { data } = await deleteDepartment(id);
      snackbar(data.message, "success");
      handleDeleteClose();
      loadDepartments();
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setDeleteLoader(false);
    }
  };

  const searchedValue = (e) => {
    setSearchTerm(e.target.value.trim());
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
    loadDepartments(filters);
  }, [filters]);
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography color="secondary.main" gutterBottom>
            HR->Department
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color="secondary.main">
            New Department
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="department-name"
                    label="Department"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    name={DEPARTMENT_NAME}
                    onChange={handleTextChange}
                    value={formData[DEPARTMENT_NAME]}
                    error={errors[DEPARTMENT_NAME]}
                    helperText={errors[DEPARTMENT_NAME]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="department-code"
                    label="Department Code"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    name={DEPARTMENT_CODE}
                    value={formData[DEPARTMENT_CODE]}
                    onChange={handleTextChange}
                    error={errors[DEPARTMENT_CODE]}
                    helperText={errors[DEPARTMENT_CODE]}
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
            <ButtonCustom variant="contained" onClick={handledDepartmentSubmit}>
              {" "}
              {departmentLoader ? (
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
            departments={departments}
            loader={departmentLoader}
            deletePopup={deletePopup}
            handleDeleteClose={handleDeleteClose}
            handleConfirmDelete={handleConfirmDelete}
            deleteLoader={deleteLoader}
            searchedValue={searchedValue}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Department;
