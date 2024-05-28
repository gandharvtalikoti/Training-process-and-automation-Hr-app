/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React from "react";
import Grid from "@mui/material/Grid";
import { IconButton, Stack, Typography } from "@mui/material";
import MuiTable from "../../Layout/Table/MuiTable";
import Spacer from "../../Layout/Components/Spacer";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function DataTable({ tableData, loader }) {
  const data = tableData;
  console.log(data)

  const handleColor = (e) => {
    if (e === "Completed competence") return "#0DD08B";
    if (e === "In progress") return "#FFA200";
    if (e === "Reschedule Training") return "#E40034";
    if (e === "Pending") return "#00008B";
    if (e === "Effective") return "#CA2AF9";
    if (e === "Absent") return "#A52A2A";
    if (e === "Not Effective") return "#e91e63";
  };

  const columns = [
    {
      field: "editTable",
      headerName: "",
      width: 30,
      renderCell: (params) => (
        <Stack
          spacing={1}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <IconButton
            size="small"
            color="primary"
            component={Link}
            to={`/app/report-details/${params.row._id}`}
          >
            <RemoveRedEyeIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
      sortable: false,
      filterable: false,
      hideable: false,
    },
    {
      headerName: "SI No.",
      field: "id",
      width: 70,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },

    {
      field: "name",
      headerName: "Name",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.name}
        </Typography>
      ),
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      field: "department",
      headerName: "Department",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.department}
        </Typography>
      ),
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      field: "designation",
      headerName: "Designation",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.designation}
        </Typography>
      ),
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.email}
        </Typography>
      ),
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      field: "createdOn",
      headerName: "Created on",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.createdOn}
        </Typography>
      ),
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.status}
        </Typography>
      ),
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
  ];

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs>
          <MuiTable
            data={data}
            columns={columns}
            hideFooterPagination={true}
            laoding={loader}
          />
        </Grid>
      </Grid>
      <Spacer height={2} />
    </>
  );
}

export default DataTable;
