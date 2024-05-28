import React, { useState } from "react";
import dayjs from "dayjs";
import Spacer from "../../Layout/Components/Spacer";
import SearchIcon from "@mui/icons-material/Search";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import CardTrainingStatus from "./CardTrainingStatus";
import { Link } from "react-router-dom";

function Dashboard() {
  const [startDate, setStartDate] = useState(dayjs("2014-08-18T21:11:54"));
  const [endDate, setEndDate] = useState(dayjs("2014-08-18T21:11:54"));

  const handleChangeStartDate = (newValue) => {
    setStartDate(newValue);
  };
  const handleChangeEndDate = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={6}>
          <Typography variant="h5" color="secondary.main" gutterBottom>
            <b>Hi HR, Welcome back!</b>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography color="secondary.main" gutterBottom>
            HR->Dashboard
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Spacer height={2} />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4}>
          <CardTrainingStatus />
        </Grid>
        {/* <Grid item xs={12} sm={12} md={6} lg={4}>
          <CardGRNStatus />
        </Grid> */}
      </Grid>
    </>
  );
}

export default Dashboard;
