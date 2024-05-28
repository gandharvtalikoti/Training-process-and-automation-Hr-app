import React, { useDebugValue, useEffect, useState } from "react";
import { Close, Search } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DataTablePending from "./DataTablePending";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import AddButton from "../../Layout/Components/AddButton";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import { getAllTrainings } from "./Service";
import SchedulePopup from "./SchedulePopup";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <CardContent sx={{ p: 2 }}>{children}</CardContent>}
    </div>
  );
}

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

function Training() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [loader, setLoader] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");
  const [scheduleTrainingPopup, setScheduleTrainingPopup] = useState("");
  const snackbar = useSnackbar();
  const [searchText, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    search: "",
  });
  const [formData, setFormData] = useState({
    status: "ALL",
  });
  const searchedValue = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleScheduleTraining = (data) => {
    setScheduleTrainingPopup(data);
  };

  const handlePopupClose = () => {
    setScheduleTrainingPopup("");
  };

  const loadTrainingData = async (flag) => {
    setLoader(true);
    try {

      const params = {
        search: filters.search,
        startDate:flag === true ? null : startDate,
        endDate:flag === true ? null : endDate
      };

      const { data } = await getAllTrainings(params);
      const newList = data?.map((d, index) => ({
        ...d,
        id: index + 1,
        name: d.name,
        departmentLabel: d?.department?.name,
        skillLabel: d?.skill?.name,
        subSkillLabel: d?.subSkillName?.name,
        status: d?.status,
        handleScheduleTraining,
        createdOn: dayjs(d?.createdOn).format("YYYY-MM-DD"),
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

  const handleChangeStatus = (event) => {
    const status = event.target.value;
    const filterdData = data.filter((item) => item.status === status);
    if (status === "ALL") {
      setTableData(data);
    } else {
      setTableData(filterdData);
    }
    setFormData({ status: event.target.value });
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
    loadTrainingData(true);
  };

  useEffect(() => {
    loadTrainingData();
  }, [filters]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (filters.search !== searchText) {
        setFilters((prev) => ({ search: searchText }));
      }
    }, 1200);
    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  useEffect(() => {
    const storedRole = localStorage.getItem("USER_ROLE");

    if (storedRole) {
      setRole(storedRole);
    }
  }, []);
  const isDateSearchDisabled = !startDate || !endDate;
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography color="secondary.main" gutterBottom>
            HR->training
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" color="secondary.main" gutterBottom>
            <b>Training</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={5} sx={5} md={4}>
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
                      <TextField fullWidth {...params} size="small"  />
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
                            onClick={() => loadTrainingData(false)}
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
        <Grid item xs={12}>
          <Card>
            <TabPanel value={tabValue} index={0}>
              <DataTablePending
                tableData={tableData}
                loginRole={role}
                loader={loader}
              />
            </TabPanel>
          </Card>
        </Grid>
        {scheduleTrainingPopup ? (
          <SchedulePopup
            open
            onClose={handlePopupClose}
            trainingPopup={scheduleTrainingPopup}
            loadTrainingData={loadTrainingData}
          />
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}

export default Training;
