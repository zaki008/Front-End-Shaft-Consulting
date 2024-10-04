"use client";
import { postRegister } from "@/redux/action/auth";
import { validateFormSignUp } from "@/utils/Validate";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [loadSubmit, setLoadSubmit] = useState(false);

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const token = Cookies.get("tokenLogin");
    if (token) {
      router.push("/users");
    }
  }, []);

  const handleSubmit = () => {
    if (!validateFormSignUp(form)) {
      return;
    }
    const data = {
      username: form.username,
      first_name: form.firstName,
      last_name: form.lastName,
      password: form.password,
    };
    dispatch(postRegister(data, router, setLoadSubmit));
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Grid item xs={8}>
        <Card
          sx={{
            maxWidth: { xs: 300, sm: 450, md: 550 },
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Register
            </Typography>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={form.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseUp={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel htmlFor="outlined-adornment-password">
                Cofirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showConfirmPass ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowConfirmPass((show) => !show)}
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseUp={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showConfirmPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              sx={{ marginTop: 2, marginBottom: 2 }}
              variant="contained"
              onClick={handleSubmit}
              disabled={loadSubmit ? true : false}
            >
              {loadSubmit ? <CircularProgress size={20} /> : "Submit"}
            </Button>
            <Typography fontSize={12}>
              Have an account?{" "}
              <Link style={{ color: "#7FA1C3" }} href={"/auth/signin"}>
                Sign In
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;
