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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Box } from "@mui/system";
import DataTable from "./DataTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import { useEffect } from "react";
import { getEmployeeReportData, getEmployeeReportDataById } from "./Service";

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

function ReportsDetails() {
  const { id } = useParams();
  const [tabValue, setTabValue] = React.useState(0);
  const [loader, setLoader] = useState(false);
  const [trainingData, setTrainingData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [skills, setSkills] = useState([]);
  const [formData, setFormDate] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    email: "",
    department: "",
    skill: "",
    subSkill: "",
    duration: "",
    suggestedFaculty: "",
  });

  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const getTableData = async () => {
    setLoader(true);
    try {
      const { data } = await getEmployeeReportDataById(id);
      const { trainings, employeesData } = data;
      const trainingData = trainings;
      setFormDate({
        name: employeesData?.name,
        phoneNumber: employeesData?.phone,
        address: employeesData?.address,
        email: employeesData?.email,
        department: employeesData?.department?.name,
        skill: trainingData?.skill?.name,
        subSkill: trainingData?.subSkillName?.name,
        duration: trainingData?.duration,
        suggestedFaculty: trainingData?.suggestedFaculty,
        status: employeesData?.status,
      });
      setSkills(employeesData.skills);
      setTrainingData(trainings);
      setEmployeeData(employeesData);
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getTableData();
  }, []);
  console.log(trainingData);
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
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <b>Employee Name</b>
                    </TableCell>
                    <TableCell>{formData.name}</TableCell>
                    <TableCell>
                      <b>Phone Number</b>
                    </TableCell>
                    <TableCell>{formData.phoneNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Address</b>
                    </TableCell>
                    <TableCell>{formData.address}</TableCell>
                    <TableCell>
                      <b>Email</b>
                    </TableCell>
                    <TableCell>{formData.email}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <b>Department</b>
                    </TableCell>
                    <TableCell>{formData.department}</TableCell>
  
                    <TableCell>
                      <b>Duration</b>
                    </TableCell>
                    <TableCell>{formData.duration}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Suggested Faculty</b>
                    </TableCell>
                    <TableCell>{formData.suggestedFaculty}</TableCell>
                    <TableCell>
                      <b>Status</b>
                    </TableCell>
                    <TableCell>{formData.status}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer>
              <TableRow>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Skill</b>
                      </TableCell>
                      {skills.map((data, index) => (
                        <TableCell>{data}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                </Table>
              </TableRow>
            </TableContainer>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Training Name</TableCell>
                    <TableCell>Skill</TableCell>
                    <TableCell>Sub Skill</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Suggested Faculty</TableCell>
                    <TableCell>Actual Score</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Training Identified Date</TableCell>
                    <TableCell>Expected Output</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trainingData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell>{`Training ${index + 1}`}</TableCell>
                      <TableCell>{data.skill?.name}</TableCell>
                      <TableCell>{data.subSkillName?.name}</TableCell>
                      <TableCell>{data.duration}</TableCell>
                      <TableCell>{data.suggestedFaculty}</TableCell>
                      <TableCell>{data.actualScore}</TableCell>
                      <TableCell>{data.score}</TableCell>
                      <TableCell>
                        {dayjs(data.startDate).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>
                        {dayjs(data.endDate).format("DD MMM YYYY")}
                      </TableCell>
                      <TableCell>{data.status}</TableCell>
                      <TableCell>{data.comment}</TableCell>
                      <TableCell>
                        {dayjs(data.trainingIdentifiedDate).format(
                          "DD MMM YYYY"
                        )}
                      </TableCell>
                      <TableCell>{data.expectedOutput}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default ReportsDetails;
