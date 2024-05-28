import { Search } from "@mui/icons-material";
import {
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddButton from "../../Layout/Components/AddButton";
import DataTable from "./DataTable";
import { deleteEmployee, getAllDepartments, getAllEmployees } from "./Service";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import { DEPARTMENT } from "./Constants";
import TrainingPopup from "./TrainingPopup";
import Loading from "../../Layout/Components/Loading";

function EmployeeMaster() {
  const [departments, setDepartments] = useState([]);
  const [tableData, setTableData] = useState(false);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    [DEPARTMENT]: "ALL",
  });
  const snackbar = useSnackbar();
  const [deletePopup, setDeletePopup] = useState("");
  const [deleteLoader, setDeleteLoader] = useState("");
  const [role, setRole] = useState("");
  const [trainingPopup, setTrainingPopup] = useState("");
  const [searchText, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    search: "",
  });

  const handleChangeDepartment = (event) => {
    const department = event.target.value;
    const filterdTableData = data.filter(
      (item) => item.departmentId === department
    );
    if (department === "ALL") {
      setTableData(data);
    } else {
      setTableData(filterdTableData);
    }
    setFormData({ [DEPARTMENT]: event.target.value });
  };

  const handleDeleteEmployee = (employee) => {
    setDeletePopup(employee);
  };

  const handleDeleteClose = () => {
    setDeletePopup(null);
  };

  const handleTrainingClose = () => {
    setTrainingPopup(null);
  };

  const handleAddEmployeeTraining = (employee) => {
    setTrainingPopup(employee);
  };

  const searchedValue = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  const getTableData = async () => {
    setLoader(true);
    try {
      const params = {
        search: filters.search,
      };
      const { data } = await getAllEmployees(params);
      const newList = data?.map((d, index) => ({
        ...d,
        id: index + 1,
        handleDeleteEmployee,
        handleAddEmployeeTraining,
        department: d?.department?.name,
        departmentId: d?.department?._id,
      }));
      setData(newList);
      setTableData(newList);
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setLoader(false);
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
      newList.unshift({ value: "ALL", label: "ALL" });
      setDepartments(newList);
      getTableData();
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
      const { data } = await deleteEmployee(id);
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (filters.search !== searchText) {
        setFilters((prev) => ({ search: searchText }));
      }
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  useEffect(() => {
    loadDepartments();
  }, [filters]);

  useEffect(() => {
    const storedRole = localStorage.getItem("USER_ROLE");
    if (storedRole) {
      setRole(storedRole);
    }
  });
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography color="secondary.main" gutterBottom>
            HR->employee-master
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" color="secondary.main" gutterBottom>
            <b>Employee Master</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {role !== "SECTIONAL_HEAD" ? (
              <Grid item>
                <AddButton name="New Employee" toLink="/app/new-employee" />
              </Grid>
            ) : (
              ""
            )}
            <Grid item xs>
              <TextField
                placeholder="Search"
                variant="outlined"
                size="small"
                fullWidth
                onChange={(e) => searchedValue(e)}
                sx={{
                  "& fieldset": {
                    borderRadius: 5,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                id="employee-master-business-unit"
                variant="outlined"
                fullWidth
                required
                select
                value={formData[DEPARTMENT]}
                onChange={handleChangeDepartment}
                size="small"
              >
                {departments.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DataTable
            tableData={tableData}
            deletePopup={deletePopup}
            handleDeleteClose={handleDeleteClose}
            handleConfirmDelete={handleConfirmDelete}
            deleteLoader={deleteLoader}
            loginRole={role}
          />
        </Grid>
        {trainingPopup ? (
          <TrainingPopup
            open
            onClose={handleTrainingClose}
            trainingPopup={trainingPopup}
            loadDepartments={loadDepartments}
            searchedValue={searchedValue}
          />
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}

export default EmployeeMaster;
