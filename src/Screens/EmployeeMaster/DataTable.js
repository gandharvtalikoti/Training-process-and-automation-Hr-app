/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Avatar,
  Button,
  FormControlLabel,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import MuiTable from "../../Layout/Table/MuiTable";
import TableDelete from "./TableDelete";
import Spacer from "../../Layout/Components/Spacer";
import { Link } from "react-router-dom";

function DataTable({
  tableData,
  deletePopup,
  handleDeleteClose,
  handleConfirmDelete,
  deleteLoader,
  loginRole,
}) {
  const [deleteRow, setDeleteRow] = useState(false);

  const handleDeleteRow = () => setDeleteRow(true);
  const handleDeleteCloseRow = () => setDeleteRow(false);

  const columns = [
    {
      field: "edit",
      headerName: "",
      width: 30,
      renderCell: (params) => {
        const role = params.row.role;
        if (loginRole !== "SECTIONAL_HEAD") {
          return (
            <Link to={`/app/new-employee/${params.row._id}`}>
              <IconButton size="small" color="primary">
                <Edit fontSize="small" />
              </IconButton>
            </Link>
          );
        } else {
          return null;
        }
      },
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
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
      headerName: "Name",
      field: "name",
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },

    {
      headerName: "Phone Number",
      field: "phone",
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      headerName: "E-Mail",
      field: "email",
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      headerName: "Designation",
      field: "designation",
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      headerName: "Height",
      field: "height",
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      headerName: "Weight",
      field: "weight",
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      headerName: "Gender",
      field: "gender",
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      headerName: "Department",
      field: "department",
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      headerName: "Qualification",
      field: "qualification",
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      headerName: "Experience",
      field: "experience",
      minWidth: 130,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      headerName: "Role",
      field: "role",
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
      width: 250,
      renderCell: (params) => {
        const {
          handleDeleteEmployee,
          handleAddEmployeeTraining,
          role,
          status,
        } = params.row;
        if (loginRole === "SECTIONAL_HEAD" && role === "Employee") {
          // if (status === "Pending") {
          //   return (
          //     <>
          //       <Typography
          //         sx={{
          //           color: "blue",
          //         }}
          //       >
          //         Pending
          //       </Typography>
          //     </>
          //   );
          // } else if (status === "In progress") {
          //   return (
          //     <>
          //       <Typography
          //         sx={{
          //           color: "blue",
          //         }}
          //       >
          //         In Progress
          //       </Typography>
          //     </>
          //   );
          // }else if (status === "Effective") {
          //   return (
          //     <>
          //       <Typography
          //         sx={{
          //           color: "blue",
          //         }}
          //       >
          //         Effective
          //       </Typography>
          //     </>
          //   );
          // }
          // else if (status === "Completed competence") {
          //   return (
          //     <>
          //       <Typography
          //         sx={{
          //           color: "blue",
          //         }}
          //       >
          //         Completed competence
          //       </Typography>
          //     </>
          //   );
          // }  else {
          return (
            <>
              <IconButton
                size="large"
                color="primary"
                key={`${params.row.id}_Training`}
                onClick={() => handleAddEmployeeTraining(params.row)}
              >
                <Typography
                  sx={{ fontWeight: "bold", textDecoration: "underline" }}
                >
                  Training
                </Typography>
              </IconButton>
            </>
          );
        }
        // } else {
        //   if (loginRole !== "SECTIONAL_HEAD") {
        //     if (status === "Pending") {
        //       return (
        //         <Typography
        //           sx={{
        //             color: "blue",
        //           }}
        //         >
        //           Pending
        //         </Typography>
        //       );
        //     } else {
        //       return (
        //         <IconButton
        //           size="large"
        //           color="error"
        //           key={`${params.row.id}_Delete`}
        //           onClick={() => handleDeleteEmployee(params.row)}
        //         >
        //           <Delete fontSize="small" />
        //         </IconButton>
        //       );
        //     }
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
              data={tableData}
              columns={columns}
              hideFooterPagination={true}
            />
          </Box>
        </Grid>
      </Grid>
      {deletePopup ? (
        <TableDelete
          open
          onClose={handleDeleteClose}
          deletePopup={deletePopup}
          handleConfirmDelete={handleConfirmDelete}
        />
      ) : null}
      <Spacer height={2} />
    </>
  );
}

export default DataTable;
