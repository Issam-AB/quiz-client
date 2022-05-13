import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import useStateContext from "../hooks/useStateContext";
import Center from "./Center";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const { setContext, resetContext } = useStateContext();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  useEffect(() => {
    resetContext();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setContext({ participantId: user.uid, email: user.email });
        console.log(user.email);
        if (user.email === "admin@admin.com") {
          navigate("/admin");
        } else {
          navigate("/quiz");
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  const handleClickShowPassword = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
  };

  return (
    <Center>
      <Card sx={{ width: "400px" }}>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ my: 3 }}>
            Quiz App
          </Typography>
          <Box
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "90%",
              },
            }}
          >
            <form noValidate autoComplete="off" onSubmit={handleLogin}>
              {error && (
                <Alert
                  sx={{ width: "20.6rem", ml: "19px" }}
                  variant="filled"
                  severity="error"
                >
                  Wrong email or password!
                </Alert>
              )}

              <TextField
                label="Email"
                name="email"
                variant="outlined"
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
              <TextField
                label="password"
                name="password"
                type={user.showPassword ? "text" : "password"}
                variant="outlined"
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {user.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "90%", marginBottom: "10px" }}
              >
                Login
              </Button>
              <Typography variant="subtitle1">
                <Link style={{ color: "#25CCF7" }} to="/forgot-password">
                  Forgot Password?
                </Link>
              </Typography>
            </form>
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
        Need an account?{" "}
        <Link style={{ color: "#25CCF7" }} to="/signup">
          Sign Up
        </Link>
      </Box>
    </Center>
  );
}
