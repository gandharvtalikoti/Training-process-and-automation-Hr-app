import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import { useSnackbar } from "../../Context/Snackbar/SnackbarContext";
import ButtonCustom from "../../Layout/Components/ButtonCustom";
import { USER_EMAIL, USER_PASSWORD, USER_ROLE } from "./Constants";
import { validateLoginField, validateLoginSubmitFields } from "./Validation";
import { checkLogin, login } from "./Service";

const roles = [
  {
    value: "Hr",
    label: "HR",
  },
  {
    value: "SECTIONAL_HEAD",
    label: "Section Head",
  },
];
function LoginForm({ themFunc, currentLogo }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    [USER_ROLE]: "",
    [USER_EMAIL]: "",
    [USER_PASSWORD]: "",
  });
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const [loginLoader, setLoginLoader] = useState(false);

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    const newErrors = validateLoginField(errors, name, value);
    formData[name] = value;
    setFormData({ ...formData });
    setErrors({ ...newErrors });
  };

  const handleLoginSubmit = async () => {
    const newErrors = validateLoginSubmitFields(formData);
    if (Object.keys(newErrors).length) {
      setErrors({ ...newErrors });
    } else {
      setLoginLoader(true);
      const req = {
        [USER_EMAIL]: formData[USER_EMAIL].trim(),
        [USER_PASSWORD]: formData[USER_PASSWORD].trim(),
        [USER_ROLE]: formData[USER_ROLE].trim(),
      };

      try {
        const [loginData, checkLoginData] = await Promise.all([
          login(req),
          checkLogin(req),
        ]);

        const loginResponse = loginData.data;
        const checkLoginResponse = checkLoginData.data;

        if (loginResponse.message === 'Login successful' && checkLoginResponse.data === 'open') {
          snackbar(loginResponse.message, "success");
          localStorage.setItem("USER_EMAIL", formData[USER_EMAIL].trim());
          localStorage.setItem("USER_ROLE", formData[USER_ROLE].trim());
          setLoginLoader(false);
          if (formData[USER_ROLE] === "SECTIONAL_HEAD") {
            navigate("/app/employee-master");
          } else {
            navigate("/app/");
          }
        } else {
          snackbar('something went wrong', "error");
        }
      } catch (e) {
        console.log(e);
        snackbar("Invalid credentials", "error");
        setLoginLoader(false);
        localStorage.clear();
      }
    }
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, null, window.location.pathname);
    });
  }, []);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={0}
      style={{ minHeight: "90vh" }}
    >
      <Grid item xs={12}>
        <Stack direction={{ lg: "row", md: "column" }}>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{
                mb: 2,
                border: 1,
                borderColor: "grey.300",
                width: "50%",
              }}
              elevation={0}
            >
              <CardContent sx={{ pt: 0, pb: 0, mt: 5 }}>
                <Box sx={{ width: "100%", p: 0 }}>
                  <Grid container spacing={2} direction="column">
                    <Grid item>
                      <TextField
                        id="outlined-select-currency"
                        name={USER_ROLE}
                        label="Role"
                        select
                        variant="outlined"
                        required
                        fullWidth
                        onChange={handleTextChange}
                        value={formData[USER_ROLE]}
                        error={errors[USER_ROLE]}
                        helperText={errors[USER_ROLE]}
                      >
                        {roles.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item>
                      <TextField
                        id="Username"
                        name={USER_EMAIL}
                        label="Enter Your Email"
                        variant="outlined"
                        onChange={handleTextChange}
                        value={formData[USER_EMAIL]}
                        error={errors[USER_EMAIL]}
                        helperText={errors[USER_EMAIL]}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="password"
                        name={USER_PASSWORD}
                        label="Enter Your Password"
                        variant="outlined"
                        onChange={handleTextChange}
                        value={formData[USER_PASSWORD]}
                        error={errors[USER_PASSWORD]}
                        helperText={errors[USER_PASSWORD]}
                        required
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <CardActions sx={{ p: 0, mt: 3 }}>
                    <Stack
                      sx={{ width: "100%" }}
                      justifyContent="flex-end"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      <ButtonCustom
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleLoginSubmit}
                      >
                        {loginLoader ? (
                          <>
                            &nbsp;&nbsp;
                            <CircularProgress size={18} />
                          </>
                        ) : null}
                        Login
                      </ButtonCustom>
                    </Stack>
                  </CardActions>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default LoginForm;
