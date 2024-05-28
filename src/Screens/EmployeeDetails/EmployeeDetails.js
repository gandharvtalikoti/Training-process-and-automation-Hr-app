import { Attachment } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Rating,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Box } from "@mui/system";
import DataTable from "./DataTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

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

const businessUnits = [
  {
    value: 1,
    label: "Business Unit 1",
  },
  {
    value: 2,
    label: "Business Unit 2",
  },
  {
    value: 3,
    label: "Business Unit 3",
  },
  {
    value: 4,
    label: "Business Unit 4",
  },
  {
    value: 5,
    label: "Business Unit 5",
  },
];

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

const departments = [
  {
    value: 1,
    label: "HR",
  },
  {
    value: 2,
    label: "Training",
  },
  {
    value: 3,
    label: "Finance",
  },
  {
    value: 4,
    label: "Sales",
  },
  {
    value: 5,
    label: "Development",
  },
];

const divisions = [
  {
    value: 1,
    label: "Marketing & Proposals",
  },
  {
    value: 2,
    label: "sales",
  },
  {
    value: 3,
    label: "Project",
  },
  {
    value: 4,
    label: "Designing",
  },
  {
    value: 5,
    label: "Production",
  },
  {
    value: 6,
    label: "Maintenance",
  },
  {
    value: 7,
    label: "Store",
  },
  {
    value: 8,
    label: "Procurement",
  },
  {
    value: 9,
    label: "Quality",
  },
  {
    value: 10,
    label: "Inspection",
  },
  {
    value: 11,
    label: "Packaging",
  },
  {
    value: 12,
    label: "Finance",
  },
  {
    value: 13,
    label: "Dispatch",
  },
  {
    value: 14,
    label: "Account",
  },
  {
    value: 15,
    label: "Research & Development",
  },
  {
    value: 16,
    label: "Information Technology",
  },
  {
    value: 17,
    label: "Human Resource",
  },
  {
    value: 18,
    label: "Security",
  },
  {
    value: 19,
    label: "Administration",
  },
];

const roles = [
  {
    value: 1,
    label: "CEO",
  },
  {
    value: 2,
    label: "CTO",
  },
  {
    value: 3,
    label: "CIO/Chief Digital Officer/Chief Innovation Officer",
  },
  {
    value: 4,
    label: "VP of Product Management/Head of Product",
  },
  {
    value: 5,
    label: "Product Manager",
  },
  {
    value: 6,
    label: "VP of Marketing",
  },
  {
    value: 7,
    label: "VP of Engineering/Director of Engineering",
  },
  {
    value: 8,
    label: "Chief Architect",
  },
  {
    value: 9,
    label: "Software Architect",
  },
  {
    value: 10,
    label: "Engineering Project Manager/Engineering Manager",
  },
  {
    value: 11,
    label: "Technical Lead/Engineering Lead/Team Lead",
  },
  {
    value: 12,
    label: "Principal Software Engineer",
  },
  {
    value: 13,
    label: "Senior Software Engineer/Senior Software Developer",
  },
  {
    value: 14,
    label: "Software Engineer",
  },
  {
    value: 15,
    label: "Software Developer",
  },
  {
    value: 16,
    label: "Junior Software Developer",
  },
  {
    value: 17,
    label: "Intern Software Developer",
  },
];

function EmployeeDetails() {
  const [selectedFiles, setSelectedFiles] = useState();
  const [tabValue, setTabValue] = React.useState(0);
  const [location, setLocation] = useState();
  const [department, setDepartment] = useState();
  const [division, setDivisions] = useState();
  const [role, setRoles] = useState();
  const [businessUnit, setBusinessUnit] = useState();
  const [startDate, setStartDate] = useState(dayjs("2014-08-18T21:11:54"));
  const [endDate, setEndDate] = useState(dayjs("2014-08-18T21:11:54"));
  const navigate = useNavigate();

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeBusinessUnit = (event) => {
    setBusinessUnit(event.target.value);
  };

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleChangeDepartment = (event) => {
    setDepartment(event.target.value);
  };

  const handleChangeDivisions = (event) => {
    setDivisions(event.target.value);
  };

  const handleChangeRoles = (event) => {
    setRoles(event.target.value);
  };

  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
  };

  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
  };

  const handleSelectedFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFiles(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item>
              <IconButton
                sx={{
                  border: 1,
                  borderColor: "grey.300",
                }}
                onClick={() => navigate(-1)}
              >
                <ArrowBackIcon fontSize="inherit" />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" color="secondary.main">
                <b>Employee Details</b>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Card>
          
            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_title"
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_id"
                    label="Employee Id"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_first_name"
                    label="First Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_last_name"
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_phone"
                    label="Phone"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee-business-unit"
                    label="Business Unit"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    select
                    value={businessUnit}
                    onChange={handleChangeBusinessUnit}
                  >
                    {businessUnits.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee-location"
                    label="Location"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    select
                    value={location}
                    onChange={handleChangeLocation}
                  >
                    {locations.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee-role"
                    label="Role"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    select
                    value={role}
                    onChange={handleChangeRoles}
                  >
                    {roles.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee-department"
                    label="Department"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    select
                    value={department}
                    onChange={handleChangeDepartment}
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
                    id="employee-division"
                    label="Division"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    select
                    value={division}
                    onChange={handleChangeDivisions}
                  >
                    {divisions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_strides_experience"
                    label="Strides Experience"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_total_experience"
                    label="Total Experience"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_education"
                    label="Education"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" color="secondary.main">
                    Validity
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <DesktopDatePicker
                    label="Start Date"
                    inputFormat="MM/DD/YYYY"
                    value={startDate}
                    onChange={handleChangeStartDate}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} size="small" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <DesktopDatePicker
                    label="End Date"
                    inputFormat="MM/DD/YYYY"
                    value={endDate}
                    onChange={handleChangeEndDate}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} size="small" />
                    )}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_fixed_pay"
                    label="Fixed Pay"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_variable_pay"
                    label="Variable Pay"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_total_ctc"
                    label="Total CTC"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_last_increment"
                    label="Last Increment"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_esops"
                    label="ESOPs"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_benefits"
                    label="Any Other Benefits"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    id="employee_performance_details"
                    label="Performance Details"
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                    rows={5}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" color="secondary.main">
                    Performance Rating
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    spacing={1}
                    divider={<Divider orientation="vertical" flexItem />}
                  >
                    <Box>
                      <Typography variant="body2">FY 2021-2022</Typography>
                      <Rating name="read-only" value={4.5} size="small" />
                    </Box>
                    <Box>
                      <Typography variant="body2">FY 2020-2021</Typography>
                      <Rating
                        name="read-only"
                        value={4}
                        size="small"
                        readOnly
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2">FY 2019-2020</Typography>
                      <Rating
                        name="read-only"
                        value={4}
                        size="small"
                        readOnly
                      />
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <DataTable />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" color="secondary.main">
                    Self Assessment
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_energizers"
                    label="Energizers & Strengths"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_stress_triggers"
                    label="Stress Triggers & Development Areas"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_challenge"
                    label="Biggest Challenge at Work"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" color="secondary.main">
                    Development Plans
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_exp_need"
                    label="Experience Need"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_expo_need"
                    label="Exposure Need"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_education_future"
                    label="Education & Future Skills"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_leadership"
                    label="Leadership Development"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={5}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_native_city"
                    label="Native City"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_state"
                    label="State"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_marital"
                    label="Marital Status"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_family"
                    label="Family Details"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_financial_commitment"
                    label="Financial Commitment"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <TextField
                    id="employee_other_comment"
                    label="Other Comment"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
            </TabPanel>
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
            <Button variant="contained">Save Details</Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default EmployeeDetails;
