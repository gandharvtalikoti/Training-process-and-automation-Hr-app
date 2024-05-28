import { Button } from "@mui/material";
import { styled } from "@mui/system";

const ButtonCustom = styled(Button)(({ theme }) => ({
  minWidth: 120,
  boxShadow: `0 10px 16px -8px ${theme.palette.primary.light}`,
  "&:hover": {
    boxShadow: `0 10px 16px -8px ${theme.palette.primary.light}`,
  },
  backgroundColor:"#0a2d5e"
}));

export default ButtonCustom;
