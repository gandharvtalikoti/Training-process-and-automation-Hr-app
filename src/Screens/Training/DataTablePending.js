/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import MuiTable from "../../Layout/Table/MuiTable";
import TableDelete from "./TableDelete";
import Spacer from "../../Layout/Components/Spacer";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function DataTablePending({ tableData, loginRole, loader }) {
  const data = tableData;
  const [deleteRow, setDeleteRow] = useState(false);

  const handleDeleteRow = () => setDeleteRow(true);
  const handleDeleteCloseRow = () => setDeleteRow(false);

  const handleColor = (e) => {
    if (e === "Reschedule Training") return "#E40034";
    if (e === "Absent") return "#A52A2A";
    if (e === "Completed competence") return "#0DD08B";
    if (e === "In progress") return "#FFB83D";
    if (e === "Pending") return "#00008B";
    if (e === "Not Effective") return "#e91e63";
    if (e === "Effective") return "#CA2AF9";
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
      field: "departmentLabel",
      headerName: "Department",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.departmentLabel}
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
      field: "skillLabel",
      headerName: "Skill Name",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.skillLabel}
        </Typography>
      ),
      minWidth: 170,

      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      field: "subSkillLabel",
      headerName: "Sub SKill Name",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.subSkillLabel}
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
      field: "trainingIdentifiedDate",
      headerName: "Training identified date",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.trainingIdentifiedDate}
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
      field: "expectedOutput",
      headerName: "Expected output",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.status)}>
          {params.row.expectedOutput}
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
      headerName: "Created On",
      renderCell: (params) => (
        <Typography variant="body2" color={handleColor(params.row.createdOn)}>
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

    {
      field: "deleteTable",
      headerName: "",
      width: 190,
      renderCell: (params) => {
        const { handleScheduleTraining, role, status } = params.row;

        // if (role === "EMPLOYEE") {
        if (
          status === "Pending" ||
          status === "Reschedule Training" ||
          status === "Not Effective" ||
          status === "Absent"
        ) {
          return (
            <IconButton
              size="large"
              color="error"
              key={`${params.row.id}_Training`}
              onClick={() => handleScheduleTraining(params.row)}
            >
              <Typography sx={{ textDecoration: "underline" }}>
                Schedule Training
              </Typography>
            </IconButton>
          );
        }
        // }
      },
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
      disableColumnMenu: true,
    },
  ];

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs>
          <Box>
            <MuiTable
              data={data}
              columns={columns}
              hideFooterPagination={true}
              loading={loader}
            />
          </Box>
        </Grid>
      </Grid>
      <TableDelete open={deleteRow} onClose={handleDeleteCloseRow} />
      <Spacer height={2} />
    </>
  );
}

export default DataTablePending;
