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
import { useNavigate, useParams } from "react-router-dom";
import { DEPARTMENT_NAME, DEPARTMENT_CODE } from "./Constants";
import {
  validateDepartmentField,
  validateDepartmentSubmitFields,
} from "./Validation";
import {
  editDepartment,
  fetchDepartmentById,
} from "./Service";

const locations = [
  {
    value: 1,
    label: "Mumbai",
  },
  {
    value: 2,
    label: "Kolkata",
  },
  {
    value: 3,
    label: "Jaipur",
  },
  {
    value: 4,
    label: "Hyderabad",
  },
  {
    value: 5,
    label: "Bengaluru",
  },
];

function EditDepartment() {
  const { id } = useParams();
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

  const handleSubmit = async () => {
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
        const { data } = await editDepartment(id, req);
        snackbar(data.message, "success");
        setDepartmentLoader(false);
        getDepartmentById()
      } catch (e) {
        console.log(e);
        snackbar("Someting went wrong", "error");
        setDepartmentLoader(false);
        // localStorage.clear();
      }
    }
  };

  const getDepartmentById = async () => {
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
      const { data } = await fetchDepartmentById(id);
      console.log(data);
      setFormData({
        [DEPARTMENT_NAME]: data?.name,
        [DEPARTMENT_CODE]: data?.code,
      });
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getDepartmentById();
  }, []);
  return (
    <>
      <Grid container spacing={1}>
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
              onClick={() => navigate('/app/department')}
            >
              Back
            </Button>
            <ButtonCustom variant="contained" onClick={handleSubmit}>
              {departmentLoader ? (
                <>
                  &nbsp;&nbsp;
                  <CircularProgress size={18} />
                </>
              ) : null}
              Save
            </ButtonCustom>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default EditDepartment;
