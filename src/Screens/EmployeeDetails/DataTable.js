/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React from "react";
import Grid from "@mui/material/Grid";
import MuiTable from "../../Layout/Table/MuiTable";
import Spacer from "../../Layout/Components/Spacer";
const UserData = []
function DataTable() {
  const data = UserData;

  const columns = [
    {
      headerName: "SI No.",
      field: "id",
      width: 70,
    },
    {
      headerName: "Company Name/Location",
      field: "company",
      minWidth: 130,
      flex: 1,
    },
    {
      headerName: "Roles & Designation",
      field: "role",
      minWidth: 130,
      flex: 1,
    },
    {
      headerName: "Start Date",
      field: "start",
      minWidth: 130,
      flex: 1,
    },
    {
      headerName: "End Date",
      field: "end",
      minWidth: 130,
      flex: 1,
    },
  ];

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs>
          <MuiTable data={data} columns={columns} />
        </Grid>
      </Grid>
      <Spacer />
    </>
  );
}

export default DataTable;
