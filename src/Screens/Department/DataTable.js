/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Edit, Search } from "@mui/icons-material";
import TableDelete from "./TableDelete";
import Spacer from "../../Layout/Components/Spacer";
import MuiTable from "../../Layout/Table/MuiTable";
import { Link } from "react-router-dom";

function DataTable({
  departments,
  loader,
  deletePopup,
  handleDeleteClose,
  handleConfirmDelete,
  deleteLoader,
  searchedValue
}) {
  const data = departments;

  const columns = [
    {
      field: "edit",
      headerName: "",
      width: 30,
      renderCell: (params) => (
        <Link to={`/app/department/details/${params.row._id}`}>
          <IconButton size="small" color="primary">
            <Edit fontSize="small" />
          </IconButton>
        </Link>
      ),
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
      headerName: "Department",
      field: "name",
      minWidth: 70,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      headerName: "Code",
      field: "code",
      minWidth: 70,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
    },
    {
      field: "delete",
      headerName: "",
      width: 30,
      renderCell: (params) => {
        const { handleDeleteDepartment } = params.row;
        return (
          <IconButton
            size="small"
            color="error"
            key={`${params.row.id}_Delete`}
            onClick={() => handleDeleteDepartment(params.row)}
          >
            <Delete fontSize="small" />
          </IconButton>
        );
      },
      sortable: false,
      filterable: false,
      hideable: false,
      disableColumnMenu: true,
    },
  ];

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Stack
            spacing={1}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography variant="h6" color="secondary.main">
              Department List
            </Typography>
            <TextField
              placeholder="Search"
              onChange={e => searchedValue(e)}
              variant="outlined"
              size="small"
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
          </Stack>
        </Grid>
        <Grid item xs>
          <MuiTable
            data={data}
            columns={columns}
            hideFooterPagination={true}
            loading={loader}
          />
        </Grid>
      </Grid>
      {deletePopup ? (
        <TableDelete
          open
          data={deletePopup}
          loader={deleteLoader}
          onClose={handleDeleteClose}
          onConfirm={handleConfirmDelete}
        />
      ) : null}
      <Spacer height={2} />
    </>
  );
}

export default DataTable;
