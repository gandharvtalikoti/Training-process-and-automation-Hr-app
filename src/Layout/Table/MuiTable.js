import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";

function MuiTable({ data, columns, height, ...props }) {
  const [pageSize, setPageSize] = useState(10);
  const theme = useTheme();
  return (
    <Box sx={{ height: height ? height : 500, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 30]}
        pagination={false}
        disableSelectionOnClick
        {...props}
        sx={{
          boxShadow: 2,
          bgcolor: "background.paper",
          "& .MuiDataGrid-virtualScroller": {
            "&::-webkit-scrollbar": {
              height: 10,
              width: 10,
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
            scrollbarWidth: "thin",
            scrollbarColor: `${theme.palette.primary.main} ${theme.palette.grey[200]}`,
            scrollMargin: 2,
          },
        }}
      />
    </Box>
  );
}

export default MuiTable;
