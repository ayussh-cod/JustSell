import React, { useEffect, useState } from "react";
import { Alert, FormControl, FormLabel, Input, TextField } from "@mui/material";
import { Box, Container, Stack, Button, Text } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserState } from "../Context/UserProvider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert"; // Import MuiAlert component for the snack bar

const Login = () => {
  const navigate = useNavigate();
  const [name, setname] = useState();
  const [logged, setlogged] = useState(true);
  const [password, setpassword] = useState();
  const { setuser } = UserState();
  const [username, setusername] = useState();
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handlesubmit = async (username, password) => {
    console.log(username);
    if (username === "" || password == "") {
      setmessage("Pls enter all fields");
      setOpen(true);
    } else {
      const { data } = await axios.post(
        "http://localhost:5000/authenticate/login",
        {
          username,
          password,
        }
      );
      if (!(data === "error")) {
        await localStorage.setItem("user", JSON.stringify(data));

        setuser(JSON.stringify(data));
        navigate("/");
      } else {
        setmessage("Invalid credentails");
        setOpen(true); // Open the snack bar when login is unsuccessful
      }
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "Yellow",
        height: "100vh",
      }}
    >
      <Box
        display="flex"
        sx={{ border: "5px solid black" }}
        justifyContent="center"
        bgcolor="White"
        width={{ xs: "90%", sm: "70%", md: "50%" }}
        height="75%"
        marginTop="1px"
      >
        <Stack spacing={5} minWidth="70%">
          <h1 style={{ marginLeft: "120px", marginTop: "50px" }}>Login</h1>
          <FormControl id="Name" isRequired>
            <span sx={{ color: "black" }}>UserName*</span>
            <textarea
              id="Name"
              rows={1}
              placeholder="Pls Enter The Product Name"
              onChange={(e) => setusername(e.target.value)}
              style={{
                width: { xs: "80%", sm: "100%" },
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginTop: "17px",
                fontSize: "16px",
              }}
            />
          </FormControl>

          <FormControl id="Name" isRequired>
            <span sx={{ color: "black" }}>password*</span>
            <textarea
              id="Name"
              rows={1}
              placeholder="Pls Enter The Product Name"
              onChange={(e) => setpassword(e.target.value)}
              style={{
                width: { xs: "80%", sm: "100%" },
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginTop: "17px",
                fontSize: "16px",
              }}
            />
          </FormControl>
          <FormControl id="Name" isRequired>
            <span sx={{ color: "black" }}>
              Dont have an Account Create One{" "}
              <Button href="/SignUp">SignUp</Button>{" "}
            </span>
          </FormControl>
        </Stack>
      </Box>
      <Button
        onClick={(e) => handlesubmit(username, password)}
        sx={{
          marginTop: "20px",
          background: "black",
          width: "43%",
          height: "5%",
          color: "white",
          "&:hover": {
            background: "black",
            color: "white",
          },
        }}
      >
        Submit
      </Button>

      {/* Snackbar for showing the notification */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Login;
