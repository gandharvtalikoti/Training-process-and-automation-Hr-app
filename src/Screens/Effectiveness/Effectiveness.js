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
import AddButton from "../../Layout/Components/AddButton";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import { DEPARTMENT } from "./Constants";
import {
  getAllDepartments,
  getEmployeeEffectiveData,
  getEmployeeTrainingData,
} from "./Service";
import EffectivenessPopup from "./EffectivenessPopup";

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
function Effectiveness() {
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
    status:"ALL",
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [effectivenessPopup, setEffectivenessPopup] = useState("");
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

  const handleAddUpdateEffectiveness = (data) => {
    setEffectivenessPopup(data);
  };

  const handleEffectivenessClose = () => {
    setEffectivenessPopup("");
  };
  const getTableData = async (flag) => {
    setLoader(true);
    try {
      const params = {
        search: filters.search,
        startDate:flag === true ? null : startDate,
        endDate:flag === true ? null : endDate
      };
      const { data } = await getEmployeeEffectiveData(params);
      const newList = data?.map((d, index) => ({
        ...d,
        id: index + 1,
        // handleDeleteEmployee,
        handleAddUpdateEffectiveness,
        department: d.department.name,
        departmentId: d.department._id,
        startDate: d?.startDate
          ? dayjs(d.startDate).format("DD MMM YYYY")
          : "-",
        endDate: d?.endDate ? dayjs(d.endDate).format("DD MMM YYYY") : "-",
        startTime: d?.startTime
          ? dayjs(d.startTime, "HH:mm").format("hh:mm A")
          : "-",
        endTime: d?.endTime ? dayjs(d.endTime, "HH:mm").format("hh:mm A") : "-",
        status: d.status,
        createdOn: d?.createdOn
        ? dayjs(d.createdOn).format("DD MMM YYYY")
        : "-",
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

  const searchedValue = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
    setEndDate(null);
  };
  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
  };

  const clearDateFields = () => {
    setStartDate(null);
    setEndDate(null);
    loadDepartments(true);
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
            HR->effectiveness
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" color="secondary.main" gutterBottom>
            <b>Training Effectiveness</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sx={2} md={2} lg={2}>
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

            <Grid item xs={12} sm={2} lg={2} md={2}>
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
            <Grid item xs={12} sm={12} md>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} sm={2}>
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
                <Grid item xs={12} sm={6} lg={3}>
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
                <Grid item xs={12} sm={6} lg={3}>
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
                <Grid item xs={12} sm={12} lg={3}>
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
                <Typography variant="body2">Approved/Submitted</Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center">
                <SquareRoundedIcon
                  fontSize="small"
                  sx={{ color: "#FFA200", mr: 1 }}
                />
                <Typography variant="body2">Approval Pending</Typography>
              </Stack>
            </Grid>
            <Grid item>
              <Stack direction="row" alignItems="center">
                <SquareRoundedIcon
                  fontSize="small"
                  sx={{ color: "#E40034", mr: 1 }}
                />
                <Typography variant="body2">Rejected</Typography>
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
      {effectivenessPopup ? (
        <EffectivenessPopup
          open
          onClose={handleEffectivenessClose}
          effectivenessPopup={effectivenessPopup}
          loadDepartments={loadDepartments}
          searchedValue={searchedValue}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Effectiveness;
