import React, { useEffect, useState } from "react";
import { Close, Search } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
  MenuItem,
  Tooltip,
} from "@mui/material";
import DataTable from "./DataTable";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import { Stack } from "@mui/system";
import SquareRoundedIcon from "@mui/icons-material/SquareRounded";
import {
  getAllDepartments,
  getAllEmployees,
  getEmployeeReportData,
  getEmployeeTrainingData,
} from "./Service";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import { DEPARTMENT } from "./Constants";
const statuses = [
  {
    label: "ALL",
    value: "ALL",
  },
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Absent",
    value: "Absent",
  },
  {
    label: "Completed competence",
    value: "Completed competence",
  },
  {
    label: "In progress",
    value: "In progress",
  },
  {
    label: "Effective",
    value: "Effective",
  },
  {
    label: "Not Effective",
    value: "Not Effective",
  },
  {
    label: "Reschedule Training",
    value: "Reschedule Training",
  },
];
function Reports() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loader, setLoader] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [searchText, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    search: "",
  });
  const [formData, setFormData] = useState({
    [DEPARTMENT]: "ALL",
    status: "ALL",
  });

  const [competencePopup, setCompetencePopup] = useState("");
  const snackbar = useSnackbar();

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
  const loadDepartments = async (flag) => {
    setLoader(true);
    try {
      const { data } = await getAllDepartments();
      const newList = data?.map((d, index) => ({
        value: d._id,
        label: d.name,
      }));
      newList.unshift({ value: "ALL", label: "ALL" });
      setDepartments(newList);
      getTableData(flag);
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
    setEndDate(null);
  };

  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
  };
  const handleAddUpdateCompetence = (data) => {
    setCompetencePopup(data);
  };

  const handleCompetenceClose = () => {
    setCompetencePopup("");
  };
  const getTableData = async (flag) => {
    setLoader(true);
    try {
      const params = {
        search: filters.search,
        startDate: flag === true ? null : startDate,
        endDate: flag === true ? null : endDate,
      };
      const { data } = await getEmployeeReportData(params);
      const { employeesData } = data;

      const newList = employeesData?.map((d, index) => {
        return {
          ...d,
          id: index + 1,
          name: d?.name,
          department: d?.department?.name,
          createdOn: dayjs(d?.createdOn).format("YYYY-MM-DD"),
        };
      });
      setData(newList);
      setTableData(newList);
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  const clearDateFields = () => {
    setStartDate(null);
    setEndDate(null);
    loadDepartments(true);
  };

  const searchedValue = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleChangeStatus = (event) => {
    const status = event.target.value;
    const filterdData = data.filter((item) => item.status === status);
    if (status === "ALL") {
      setTableData(data);
    } else {
      setTableData(filterdData);
    }
    setFormData((prev) => ({
      ...prev,
      status: event.target.value,
    }));
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

  const isDateSearchDisabled = !startDate || !endDate;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography color="secondary.main" gutterBottom>
            HR->reports
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" color="secondary.main" gutterBottom>
            <b>Reports</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sx={4} md={2} lg={2}>
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
            <Grid item xs={12} sx={4} md={2} lg={2}>
              <TextField
                id="employee-master-business-unit"
                variant="outlined"
                fullWidth
                required
                select
                name={DEPARTMENT}
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
            <Grid item xs={12} sm={2} md={2} lg={2}>
              <TextField
                id="employee-master-business-unit"
                variant="outlined"
                fullWidth
                required
                select
                value={formData.status}
                onChange={handleChangeStatus}
                size="small"
              >
                {statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} sm={6} lg={4}>
                  <DesktopDatePicker
                    label="Start Date"
                    inputFormat="DD-MMM-YYYY"
                    value={startDate || null}
                    maxDate={endDate || null}
                    onChange={handleChangeStartDate}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <DesktopDatePicker
                    label="End Date"
                    inputFormat="DD-MMM-YYYY"
                    value={endDate || null}
                    minDate={startDate || null}
                    onChange={handleChangeEndDate}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} lg={4}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Tooltip
                        title={
                          isDateSearchDisabled
                            ? "Select start and end date"
                            : ""
                        }
                      >
                        <span>
                          <IconButton
                            sx={{
                              borderRadius: 1,
                              bgcolor: "background.paper",
                              boxShadow: 2,
                              color: "primary.main",
                            }}
                            disabled={isDateSearchDisabled || loader}
                            onClick={() => loadDepartments(false)}
                          >
                            <SearchIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Clear dates">
                        <IconButton
                          sx={{
                            borderRadius: 1,
                            bgcolor: "background.paper",
                            boxShadow: 2,
                            color: "primary.main",
                          }}
                          disabled={isDateSearchDisabled || loader}
                          onClick={clearDateFields}
                        >
                          <Close />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Stack direction="row" alignItems="center">
                <SquareRoundedIcon
                  fontSize="small"
                  sx={{ color: "#0DD08B", mr: 1 }}
                />
                <Typography variant="body2">Completed</Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center">
                <SquareRoundedIcon
                  fontSize="small"
                  sx={{ color: "#FFA200", mr: 1 }}
                />
                <Typography variant="body2">In progress</Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center">
                <SquareRoundedIcon
                  fontSize="small"
                  sx={{ color: "#E40034", mr: 1 }}
                />
                <Typography variant="body2">Reschedule Training</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid> */}
        <Grid item xs={12}>
          <Card>
            <DataTable tableData={tableData} loader={loader} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Reports;
