import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";

function ProductBlockMini({ category, name, img, price, link }) {
  return (
    <Card
      sx={{
        width: 142,
        borderRadius: 0.5,
      }}
    >
      <CardActionArea
        sx={{ px: 1, pt: 1, boxSizing: "border-box" }}
        component={Link}
        to={link}
      >
        <Box
          component="img"
          src={img}
          sx={{
            width: 80,
            height: 80,
            display: "block",
            borderRadius: 20,
            margin: "0 auto",
          }}
        />
        <Typography
          variant="caption"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            lineClamp: 1,
          }}
        >
          <b>{category}</b> - {name}
        </Typography>
      </CardActionArea>
      <CardActions>
        <Stack
          spacing={0}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          justifyContent="space-around"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Typography
            variant="caption"
            sx={{ whiteSpace: "nowrap", minWidth: "46%" }}
          >
            <NumericFormat
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₹"}
              thousandsGroupStyle={"lakh"}
            />
          </Typography>
          <Button
            size="small"
            color="primary"
            variant="text"
            disableElevation
            sx={{ fontSize: "0.75rem", lineHeight: "1.66", p: 0 }}
          >
            Buy Now
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}

export default ProductBlockMini;
