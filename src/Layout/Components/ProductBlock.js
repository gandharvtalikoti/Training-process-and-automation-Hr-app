import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Link } from "react-router-dom";
import ProductRating from "./ProductRating";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NumericFormat } from "react-number-format";

function ProductBlock({
  category,
  name,
  img,
  rating,
  description,
  delivery,
  price,
  wishlist,
  link,
  bg,
  color,
}) {
  return (
    <Card
      sx={{
        width: "100%",
        flexShrink: 0,
        flexGrow: 0,
        bgcolor: bg,
        borderRadius: 0.5,
      }}
    >
      <CardActionArea
        sx={{ px: 1, pt: 1, boxSizing: "border-box" }}
        component={Link}
        to={link}
      >
        <Typography variant="caption" sx={{ mb: 2, color: color }}>
          <b>{category}</b>
        </Typography>
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <Box
            component="img"
            src={img}
            sx={{
              width: 100,
              height: 100,
              display: "block",
              borderRadius: 20,
              boxShadow: "0 4px 10px #d5d5d5",
              mt: 2,
            }}
          />
          <Box>
            <Typography
              variant="body2"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                WebkitLineClamp: 1,
                lineClamp: 1,
              }}
            >
              <b>{name}</b>
            </Typography>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
            >
              <Typography variant="body2" color="custom.main">
                {rating}
              </Typography>
              <ProductRating
                name="rating"
                defaultValue={rating}
                size="small"
                readOnly
                color="primary.main"
              />
            </Stack>
            <Box sx={{ height: 31 }}>
              <Typography
                variant="caption"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  lineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  lineHeight: 1.26,
                }}
              >
                {description}
              </Typography>
            </Box>
            <Typography variant="caption">
              <b>Delivery:</b> In {delivery} Days
            </Typography>
            <Typography variant="body1" gutterBottom>
              <b>
                <NumericFormat
                  value={price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                  thousandsGroupStyle={"lakh"}
                />{" "}
              </b>
            </Typography>
          </Box>
        </Stack>
      </CardActionArea>
      <CardActions
        sx={{
          pt: 0,
          px: 1,
          pb: 1,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          size="small"
          color="inherit"
          startIcon={
            wishlist ? (
              <FavoriteRoundedIcon color="error" />
            ) : (
              <FavoriteBorderRoundedIcon color="error" />
            )
          }
          sx={{ borderRadius: 0.5 }}
        >
          Wishlist
        </Button>
        <Button
          size="small"
          color="primary"
          startIcon={<ShoppingCartOutlinedIcon />}
          variant="contained"
          disableElevation
          sx={{ borderRadius: 0.5 }}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductBlock;
