import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FiberManualRecord } from "@mui/icons-material";

const COLORS = ["#82ca9d", "#8245EB", "#F1E31E", "#2A7AF9"];

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

const CustomTooltipOne = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ p: 1, bgcolor: "#000000", color: "primary.contrastText" }}>
        <Typography variant="caption">
          {`${payload[0].name} : ${payload[0].value}`}
        </Typography>
      </Box>
    );
  }
  return null;
};

const CustomTooltipTwo = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ p: 1, bgcolor: "#000000", color: "primary.contrastText" }}>
        <Typography variant="caption">
          {`${payload[0].name} : ${payload[0].value}`}
        </Typography>
        <br />
        <Typography variant="caption">
          {`${payload[1].name} : ${payload[1].value}`}
        </Typography>
      </Box>
    );
  }
  return null;
};

function LineChartCustomOne({ data }) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <Tooltip content={<CustomTooltipOne />} />
          <Line
            type="linear"
            dataKey="value"
            stroke="#82ca9d"
            strokeWidth={3}
            name="Order"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

function LineChartCustomTwo({ data }) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <Tooltip content={<CustomTooltipTwo />} />
          <Line
            type="linear"
            dataKey="value_1"
            stroke="#82ca9d"
            strokeWidth={3}
            name="PO Amount"
          />
          <Line
            type="linear"
            dataKey="value_2"
            stroke="#8245EB"
            strokeWidth={3}
            name="GRN Amount"
          />
          <Legend content={<RenderLegendOne />} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

function LineChartCustomThree({ data }) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <YAxis tickCount={10} type="number" domain={[0, 100]} />
          <Tooltip content={<CustomTooltipOne />} />
          <Line
            type="linear"
            dataKey="value"
            stroke="#82ca9d"
            strokeWidth={3}
            name="Order"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export { LineChartCustomOne, LineChartCustomTwo, LineChartCustomThree };
