/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React from "react";
import Grid from "@mui/material/Grid";
import { IconButton, Stack, Typography } from "@mui/material";
import MuiTable from "../../Layout/Table/MuiTable";
import Spacer from "../../Layout/Components/Spacer";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { Edit } from "@mui/icons-material";

function DataTable({ tableData, loader }) {
  const data = tableData;

  const handleColor = (e) => {
    if (e === "Effective") return "#CA2AF9";
    if (e === "Completed competence") return "#0DD08B";
    if (e === "Rejected") return "#E40034";
    if (e === "Pending") return "#00008B";
    if (e === "In progress") return "#FFA200";
    if (e === "Not Effective") return "#e91e63";
    if (e === "Absent") return "#A52A2A";
    if (e === "Reschedule Training") return "#E40034";
  };

  const columns = [
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
      field: "startDate",
      headerName: "Training Start Date",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.startDate}
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
      field: "endDate",
      headerName: "Training End Date",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.endDate}
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
      field: "startTime",
      headerName: "Training Start Time",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.startTime}
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
      field: "endTime",
      headerName: "Training End Time",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.endTime}
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
      field: "actualScore",
      headerName: "ActualScore",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.actualScore}
        </Typography>
      ),
      minWidth: 180,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      field: "score",
      headerName: "Score",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.score}
        </Typography>
      ),
      minWidth: 180,
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
      minWidth: 200,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      field: "createdOn",
      headerName: "Created On",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.createdOn}
        </Typography>
      ),
      minWidth: 200,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      field: "competence",
      headerName: "",
      renderCell: (params) => {
        const { handleAddUpdateEffectiveness, status } = params.row;
        if (status === "Completed competence") {
          return (
            <>
              <IconButton
                size="large"
                color="primary"
                key={`${params.row.id}_Competence`}
                onClick={() => handleAddUpdateEffectiveness(params.row)}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "primary.main", textDecoration: "underline" }}
                >
                  Effectiveness
                </Typography>
              </IconButton>
            </>
          );
        }
      },
      minWidth: 150,
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
            loading={loader}
          />
        </Grid>
      </Grid>
      <Spacer height={2} />
    </>
  );
}

export default DataTable;
