import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Card, Grid, Typography } from "@mui/material";
import { PieChartCustomOne } from "../../Layout/Components/PieChartCustom";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import { getDashboardData } from "./Service";

const QualityStatusData = [
  { name: "Completed", value: 67 },
  { name: "Pending", value: 24 },
  { name: "Under Training", value: 9 },
];

function CardTrainingStatus() {
  const [loader, setLoader] = useState({});
  const snackbar = useSnackbar();
  const [qualityStatusData, setQualityStatusData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const loadDashboardData = async () => {
    setLoader(true);
    try {
      const { data } = await getDashboardData();
      let total = data.reduce((acc, item) => acc + item.value, 0);
      setTotalCount(total);
      setQualityStatusData(data);
    } catch (e) {
      console.log(e);
      snackbar("Someting went wrong", "error");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);
  return (
    <>
      <Card sx={{ p: 2, position: "relative", minHeight: 290 }}>
        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs>
            <Typography variant="body1" component="p">
              Training Status
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ position: "absolute", top: 70, left: 16 }}>
              <Typography variant="caption">Total</Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {totalCount}
              </Typography>
            </Box>
            <PieChartCustomOne chartData={qualityStatusData} total={totalCount} />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default CardTrainingStatus;
