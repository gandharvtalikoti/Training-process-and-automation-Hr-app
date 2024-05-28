import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FiberManualRecord } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";

const COLORS = [
  "#FFB83D",
  "#2A7AF9",
  "#0DD08B",
  "#F3426C",
  "#CA2AF9",
  "#A52A2A",
  "#e91e63",
];

const RenderLegendOne = ({ data }) => {
  console.log(data)
  return (
    <Box>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        {data.map((entry, index) => (
          <Grid item key={`item-${index}`} xs="auto">
            <Stack direction="row" alignItems="center">
              <FiberManualRecord
                sx={{ color: COLORS[index % COLORS.length], fontSize: 16 }}
              />
              <Typography variant="caption">
                {entry.name} - <b>{entry.value}</b>
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const RenderLegendTwo = ({ data }) => {
  return (
    <Box sx={{ mb: -4 }}>
      <Grid container spacing={1}>
        {data.map((entry, index) => (
          <Grid item key={`item-${index}`} xs={12}>
            <Stack direction="row" alignItems="center">
              <FiberManualRecord
                sx={{ color: COLORS[index % COLORS.length], fontSize: 16 }}
              />
              <Typography variant="caption">
                {entry.name} - <b>{entry.value}</b>
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ p: 1, bgcolor: "#000000", color: "primary.contrastText" }}>
        <Typography variant="caption">{`${payload[0].name} : ${payload[0].value}`}</Typography>
      </Box>
    );
  }
  return null;
};

function MainChartOne({ data }) {
  return (
    <ResponsiveContainer>
      <PieChart width={100} height={100}>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

function MainChartTwo({ data }) {
  return (
    <ResponsiveContainer>
      <PieChart width={100} height={100}>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

function PieChartCustomOne({ chartData, total }) {
  return (
    <>
      <Box
        sx={{
          height: 180,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 100,
            height: 40,
            textAlign: "center",
          }}
        >
          <Typography variant="body2">Total</Typography>
          <Typography variant="body1">
            <b>{total}</b>
          </Typography>
        </Box>
        <MainChartOne data={chartData} />
      </Box>
      <RenderLegendOne data={chartData} />
    </>
  );
}

function PieChartCustomTwo({ chartData, total }) {
  return (
    <>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={6}>
          <RenderLegendTwo data={chartData} />
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              height: 180,
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 100,
                height: 40,
                textAlign: "center",
              }}
            >
              <Typography variant="body2">Total</Typography>
              <Typography variant="body1">
                <b>{total}</b>
              </Typography>
            </Box>
            <MainChartOne data={chartData} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

function PieChartCustomThree({ chartData, total }) {
  return (
    <>
      <Box
        sx={{
          height: 180,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 100,
            height: 50,
            textAlign: "center",
          }}
        >
          <Typography variant="body1">Total</Typography>
          <Typography variant="h5">
            <b>{total}</b>
          </Typography>
        </Box>
        <MainChartTwo data={chartData} />
      </Box>
      <RenderLegendOne data={chartData} />
    </>
  );
}

export { PieChartCustomOne, PieChartCustomTwo, PieChartCustomThree };
