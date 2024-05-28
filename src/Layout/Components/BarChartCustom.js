import React from "react";
import { FiberManualRecord } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ p: 1, bgcolor: "#000000", color: "primary.contrastText" }}>
        <Typography variant="caption">{`${payload[0].name} : ${payload[0].value}`}</Typography>
        <br></br>
        <Typography variant="caption">{`${payload[1].name} : ${payload[1].value}`}</Typography>
        <br></br>
        <Typography variant="caption">{`${payload[2].name} : ${payload[2].value}`}</Typography>
      </Box>
    );
  }
  return null;
};

const COLORS = ["#F3426C", "#0DD08B", "#F1E31E", "#2A7AF9"];

const RenderLegendOne = (props) => {
  const { payload } = props;
  return (
    <Box>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        {payload.map((entry, index) => (
          <Grid item key={`item-${index}`} xs="auto">
            <Stack direction="row" alignItems="center">
              <FiberManualRecord
                sx={{ color: COLORS[index % COLORS.length], fontSize: 16 }}
              />
              <Typography variant="caption">{entry.value}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

function BarChartCustom({ data }) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 16,
            right: 16,
            left: 0,
            bottom: 16,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickCount={10} type="number" domain={[0, 10]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={10}
            content={<RenderLegendOne />}
          />
          <Bar dataKey="value0" fill="#F3426C" name="< 5 Days" />
          <Bar dataKey="value1" fill="#0DD08B" name="> 2 Days" />
          <Bar dataKey="value2" fill="#F1E31E" name="< 2 Days > 5 Days" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default BarChartCustom;
