import React from "react";
import { Grid, Skeleton } from "@mui/material";

function Page() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rounded" sx={{ height: 100, mb: 2 }} />
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
      </Grid>
    </Grid>
  );
}

export default Page;
