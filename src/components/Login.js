import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import useStateContext from "../hooks/useStateContext";
import Center from "./Center";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// const getFreshModel = () => ({
//   name: "",
//   email: "",
// });

export default function Login() {
  const { context, setContext, resetContext } = useStateContext();
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
    // if (validate())
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user.uid);
        setContext({ participantId: user.uid });
        navigate("/quiz");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      });
  };

  const handleClickShowPassword = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
  };

  //   const validate = () => {
  //     let temp = {};
  //     temp.email = /\S+@\S+\.\S+/.test(user.email) ? "" : "Email is not valid.";
  //     temp.name = user.name != "" ? "" : "This field is required.";
  //     setError(temp);
  //     return Object.values(temp).every((x) => x == "");
  //   };

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
              {error && (
                <span style={{ fontSize: "12", color: "red" }}>
                  Wrong email or password!
                </span>
              )}
              {/* {JSON.stringify(user, null, 2)} */}
            </form>
          </Box>
        </CardContent>
      </Card>
    </Center>
  );
}
