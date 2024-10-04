"use client";
import { postLogin } from "@/redux/action/auth";
import { validateFormSignIn } from "@/utils/Validate";
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

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loadSubmit, setLoadSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = Cookies.get("tokenLogin");
    if (token) {
      router.push("/users");
    }
  }, []);

  const handlesubmit = () => {
    const { username, password } = form;
    if (!validateFormSignIn(form)) {
      return;
    }
    const data = {
      username: username,
      password: password,
    };
    dispatch(postLogin(data, router, setLoadSubmit));
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Login
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
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
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
            <Button
              sx={{ marginTop: 2, marginBottom: 2 }}
              variant="contained"
              onClick={handlesubmit}
              disabled={loadSubmit ? true : false}
            >
              {loadSubmit ? <CircularProgress size={20} /> : "Submit"}
            </Button>
            <Typography fontSize={12}>
              Don't have an account?{" "}
              <Link style={{ color: "#7FA1C3" }} href={"/auth/signup"}>
                Sign up
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SignIn;
