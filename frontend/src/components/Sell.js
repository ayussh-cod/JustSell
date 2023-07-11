import React, { useState } from "react";
import { FormControl, FormLabel, Input, Snackbar, TextField } from "@mui/material";
import { Box, Container, Stack, Button, Text } from "@mui/material";
import axios from "axios"
import { json, useNavigate } from "react-router-dom";
import { UserState } from "../Context/UserProvider";

const Sell = () => {
  
  let navigate = new useNavigate();
  const {user}=UserState();
 
  const handleSubmit = async (pic, name, desc, price) => {
    try{
      const token =  JSON.parse(user).token;
      
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(user).token}`,
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/product",
        { pic, name, desc, price},
        config
      );
     
      navigate("/");
    }
    catch(error)
    {
      console.log(error)
    }
  };
  const [loading, setloading] = useState();
  const [name, setname] = useState();
  const [pic, setpic] = useState();
  const [desc, setdesc] = useState();
  const [price, setprice] = useState();
  
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
        .then((result) =>result.json()).then((data) => {
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
  
  return (
    <Container
      style={{
        display: "flex",
   
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        bgcolor="white"
        width={{ xs: "100%", sm: "70%", md: "50%" }}
        height="75%"
        marginTop="50px"
        
      >
        <Stack spacing={5}>
          <h1 style={{ marginLeft: "180px", marginTop: "50px" }}>Bechde</h1>
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

          <FormControl id="desc" isRequired>
            <span sx={{ color: "black" }}>Description*</span>
            <textarea
              id="description-input"
              rows={4}
              placeholder="Pls Enter The Product Description"
              onChange={(e) => setdesc(e.target.value)}
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

          <FormControl>
            <FormLabel>Prcie*</FormLabel>
            <textarea
              id="Price"
              rows={1}
              placeholder="Pls Enter The Product Price"
              onChange={(e) => setprice(e.target.value)}
              style={{
                placeholder: "Enter your Product Price",
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
      <Button
        onClick={() => handleSubmit({ pic, name, desc, price })}
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
    </Container>
  );
};

export default Sell;
