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
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import useStateContext from "../hooks/useStateContext";
import Center from "./Center";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ForgetPassword = () => {
  const { resetContext } = useStateContext();
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    email: "",
  });

  useEffect(() => {
    resetContext();
  }, []);

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      setError("");
      await sendPasswordResetEmail(auth, user.email);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    }
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
            <form noValidate autoComplete="off" onSubmit={resetPassword}>
              {error && (
                <Alert
                  sx={{ width: "20.6rem", ml: "19px" }}
                  variant="filled"
                  severity="error"
                >
                  {error}
                </Alert>
              )}
              {message && (
                <Alert
                  sx={{ width: "20.6rem", ml: "19px" }}
                  variant="filled"
                  severity="success"
                >
                  {message}
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

              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "90%", marginBottom: "10px" }}
              >
                Login
              </Button>
              {/* {JSON.stringify(user, null, 2)} */}
            </form>
          </Box>
          <Box sx={{ width: "100%", textAlign: "center", mt: 2 }}>
            <Link style={{ color: "#25CCF7" }} to="/">
              Login
            </Link>
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
};

export default ForgetPassword;
