import React, { useState } from "react";
import {
  Grid,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import { Box } from "@mui/system";

function FilterDate() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Typography variant="body2">Filter By</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleClick}>
            <EventIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="MM/DD/YYYY"
                value={startDate}
                onChange={handleChangeStartDate}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Grid>
            <Grid item xs>
              <DesktopDatePicker
                label="End Date"
                inputFormat="MM/DD/YYYY"
                value={endDate}
                onChange={handleChangeEndDate}
                renderInput={(params) => <TextField {...params} size="small" />}
              />
            </Grid>
            <Grid item>
              <IconButton
                sx={{
                  borderRadius: 1,
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  color: "primary.main",
                }}
              >
                <SearchIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </>
  );
}

export default FilterDate;
