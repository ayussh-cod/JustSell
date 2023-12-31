import React, { useState } from "react";
import {
  Alert,
  FormControl,
  FormLabel,
  Input,
  Snackbar,
  TextField,
} from "@mui/material";
import { Box, Container, Stack, Button, Text } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserState } from "../Context/UserProvider";
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [name, setname] = useState();
  const [pic, setpic] = useState();
  const [password, setpassword] = useState();
  const { setuser } = UserState();
  const [username, setusername] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  const [unique, setunique] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState();

  const handleupload = (pics) => {
    setloading(true);
    // console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      console.log("FSD");
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "olxmern");
      data.append("cloud_name", "dopsbmkae");
      fetch("https://api.cloudinary.com/v1_1/dopsbmkae/image/upload", {
        method: "POST",
        body: data,
      })
        .then((result) => result.json())
        .then((data) => {
          setpic(data.url.toString());

          console.log(data);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handlesubmit = async (username, name, password, phoneNumber, pic) => {
    if (
      username === "" ||
      name === "" ||
      password === "" ||
      phoneNumber === ""
    ) {
      setmessage("Pls enter all fields");
      setOpen(true);
    } else {
      const { data } = await axios.post(
        "http://localhost:5000/authenticate/Signup",
        { username, name, password, phoneNumber, pic }
      );
      if (!(data === "error")) {
        await localStorage.setItem("user", JSON.stringify(data));

        setuser(JSON.stringify(data));
        navigate("/");
      } else {
        setunique(false);
        setOpen(true);
        setmessage("Pls use different username");
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
        bgcolor="white"
        width={{ xs: "90%", sm: "70%", md: "50%" }}
        height="75%"
        marginTop="1px"
      >
        <Stack spacing={5}>
          <h1 style={{ marginLeft: "120px", marginTop: "50px" }}>Sign-Up</h1>
          <FormControl id="Name" isRequired>
            <span sx={{ color: "black" }}>UserName*</span>

            <textarea
              id="Name"
              rows={1}
              placeholder="Pls Enter The Product Name"
              onChange={(e) => setusername(e.target.value)}
              style={{
                // marginLeft: "50px",
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
            <span sx={{ color: "black" }}>Name*</span>

            <textarea
              id="Name"
              rows={1}
              placeholder="Pls Enter The Product Name"
              onChange={(e) => setname(e.target.value)}
              style={{
                // marginLeft: "50px",
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
              //   console.log(password)
              style={{
                // marginLeft: "50px",
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
            <span sx={{ color: "black" }}>PhoneNumber</span>
            <textarea
              id="Name"
              rows={1}
              placeholder="Pls Enter The Product Name"
              onChange={(e) => setphoneNumber(e.target.value)}
              //   console.log(password)
              style={{
                // marginLeft: "50px",
                width: { xs: "80%", sm: "100%" },
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginTop: "17px",
                fontSize: "16px",
              }}
            />
          </FormControl>

          <FormControl id="pic">
            <span sx={{ color: "black" }}>Upload Pics</span>
            <Input
              type="file"
              p={1.5}
              accept="image/*"
              onChange={(e) => handleupload(e.target.files[0])}
              style={{
                marginLeft: "50px",
                marginTop: "17px",
                fontSize: "16px",
              }}
            />
          </FormControl>
        </Stack>
      </Box>
      {/* <Box
        sx={{
          marginTop: "20px",
          background: "white",
          width: "43%",
          height: "5%",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            background: "black",
            color: "white",
          },
        }}
      > */}
      <LoadingButton
        onClick={(e) =>
          handlesubmit(username, name, password, phoneNumber, pic)
        }
        sx={{
          marginTop: "20px",
          background: "White",
          width: "43%",
          height: "5%",
        }}
        loading={loading}
        variant="outlined"
        // disabled
      >
        <span sx={{color:"black"}}>Submit</span>
        
      </LoadingButton>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
