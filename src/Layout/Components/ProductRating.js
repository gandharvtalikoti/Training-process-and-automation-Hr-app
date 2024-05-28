import { Rating } from "@mui/material";
import { styled } from "@mui/system";

const ProductRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconFilled": {
    color: theme.palette.custom.main,
  },
  "& .MuiRating-iconHover": {
    color: theme.palette.custom.dark,
  },
}));

export default ProductRating;
