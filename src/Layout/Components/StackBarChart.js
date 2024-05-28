import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FiberManualRecord } from "@mui/icons-material";

const COLORS = [
  "#0DD08B",
  "#F3426C",
  "#CA2AF9",
  "#2A7AF9",
  "#FFB83D",
  "#8245EB",
  "#354693",
];

const RenderLegendOne = (props) => {
  const { payload } = props;
  console.log(payload);
  return (
    <Box>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        {payload.map((entry, index) => (
          <Grid item key={`item-${index}`} xs="auto">
            <Stack direction="row" alignItems="center">
              <FiberManualRecord
                sx={{ color: COLORS[index % COLORS.length], fontSize: 16 }}
              />
              <Typography variant="caption">
                {entry.value} - {entry.payload.value}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

function MainChartTwo({ data }) {
  return (
    <ResponsiveContainer>
      <BarChart
        width={150}
        height={150}
        data={data}
        barSize={30}
        layout="vertical"
      >
        <XAxis type="number" hide />
        <YAxis type="category" hide />
        <Bar
          dataKey="accepted"
          name="Accepted"
          value="23L"
          stackId="a"
          fill="#0DD08B"
        />
        <Bar
          dataKey="cancelled"
          name="Cancelled"
          value="90K"
          stackId="a"
          fill="#F3426C"
        />
        <Bar
          dataKey="rejected"
          name="Rejected"
          value="10K"
          stackId="a"
          fill="#CA2AF9"
        />
        <Bar
          dataKey="short_closed"
          name="Short Closed"
          value={850}
          stackId="a"
          fill="#2A7AF9"
        />
        <Bar
          dataKey="change_request"
          name="Change Request"
          value={454}
          stackId="a"
          fill="#FFB83D"
        />
        <Bar
          dataKey="new_po"
          name="Accepted"
          value={82}
          stackId="a"
          fill="#8245EB"
        />
        <Bar
          dataKey="po_completed"
          name="PO Completed"
          value="12L"
          stackId="a"
          fill="#354693"
        />
        <Legend iconType="circle" iconSize={10} content={<RenderLegendOne />} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function StackBarChart({ chartData }) {
  return (
    <>
      <Box
        sx={{
          height: 140,
          position: "relative",
        }}
      >
        <MainChartTwo data={chartData} />
      </Box>
    </>
  );
}

export default StackBarChart;
