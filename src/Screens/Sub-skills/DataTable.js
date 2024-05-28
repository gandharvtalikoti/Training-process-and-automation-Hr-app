/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  IconButton,
  InputAdornment,
  MenuItem,
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
  tableData,
  deletePopup,
  handleConfirmDelete,
  searchedValue,
  skills,
  handleChangeDepartment,
  skillName,
}) {
  const data = tableData;
  const [deleteRow, setDeleteRow] = useState(false);

  const handleDeleteRow = () => setDeleteRow(true);
  const handleDeleteCloseRow = () => setDeleteRow(false);

  const columns = [
    {
      field: "edit",
      headerName: "",
      width: 30,
      renderCell: (params) => (
        <Link to={`/app/edit-sub-skill/${params.row._id}`}>
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
      width: 140,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
      disableColumnMenu: true,
    },
    {
      headerName: "Skill",
      field: "skill",
      minWidth: 130,
      flex: 1,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
      disableColumnMenu: true,
    },
    {
      headerName: "Sub Skill",
      field: "name",
      minWidth: 130,
      flex: 1,
      sortable: false,
      filterable: false,
      hideable: false,
      editable: false,
      disableColumnMenu: true,
    },
    {
      field: "delete",
      headerName: "",
      width: 30,
      renderCell: (params) => {
        const { handleDeleteSubSKill } = params.row;
        return (
          <IconButton
            size="small"
            color="error"
            key={`${params.row.id}_Delete`}
            onClick={() => handleDeleteSubSKill(params.row)}
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
              Sub Skills
            </Typography>
            <TextField
              placeholder="Search"
              variant="outlined"
              size="small"
              onChange={(e) => searchedValue(e)}
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
            <Grid item xs={12} sm={2}>
              <TextField
                id="employee-master-business-unit"
                variant="outlined"
                fullWidth
                required
                select
                value={skillName}
                onChange={handleChangeDepartment}
                size="small"
              >
                {skills.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs>
          <MuiTable data={data} columns={columns} hideFooterPagination={true} />
        </Grid>
      </Grid>
      {deletePopup ? (
        <TableDelete
          open
          onClose={handleDeleteCloseRow}
          deletePopup={deletePopup}
          handleConfirmDelete={handleConfirmDelete}
        />
      ) : (
        ""
      )}
      <Spacer height={2} />
    </>
  );
}

export default DataTable;
