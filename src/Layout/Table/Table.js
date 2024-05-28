import React from "react";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table as MUITable,
  Icon,
  Grid,
  IconButton,
  Typography,
  TextField,
  MenuItem,
  Box,
  Paper,
} from "@mui/material";
import { useTable, useSortBy, usePagination, useExpanded } from "react-table";
import {
  ArrowDownward,
  ArrowUpward,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import { Stack } from "@mui/system";

function Table({ columns, data, onClick }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useSortBy,
    useExpanded,
    usePagination
  );

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "grey.300",
        width: "100%",
        overflow: "auto",
      }}
      component={Paper}
    >
      <TableContainer
        sx={{
          bgcolor: "background.paper",
          "&::-webkit-scrollbar": {
            height: 10,
            width: 5,
          },
          "&::-webkit-scrollbar-track": {
            background: "rgb(151 167 195 / 30%)",
            mb: 3,
            mt: 3,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "primary.main",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        <MUITable {...getTableProps()} size="small">
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      sx={{
                        minWidth:
                          column.id === "id" ||
                          column.id === "expander" ||
                          column.id === "editTable" ||
                          column.id === "deleteTable"
                            ? 50
                            : 120,
                      }}
                    >
                      <Stack
                        spacing={0}
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        sx={{ height: 40 }}
                      >
                        <Typography
                          sx={{ fontSize: "0.75rem" }}
                          color="secondary"
                        >
                          <b>{column.render("Header")}</b>
                        </Typography>
                        {column.isSorted ? (
                          <>
                            {column.isSortedDesc ? (
                              <ArrowDownward fontSize="small" />
                            ) : (
                              <ArrowUpward fontSize="small" />
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </Stack>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    onClick(row);
                  }}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <TableCell
                      {...cell.getCellProps()}
                      component="th"
                      scope="row"
                      sx={{ border: "none", fontSize: "0.75rem" }}
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </MUITable>
      </TableContainer>

      <Box
        sx={{
          p: 1,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "grey.300",
        }}
      >
        <Grid
          container
          spacing={1}
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <IconButton
              size="small"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <FirstPage />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <ChevronRight />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <LastPage />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Typography
              variant="body2"
              sx={{
                "& strong": {
                  marginLeft: 2,
                },
              }}
            >
              Page
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              size="small"
              variant="outlined"
            >
              {[10, 20, 30, 40, 50].map((pageSizeX) => (
                <MenuItem key={pageSizeX} value={pageSizeX}>
                  Show {pageSizeX}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

Table.defaultProps = {};

export default Table;
