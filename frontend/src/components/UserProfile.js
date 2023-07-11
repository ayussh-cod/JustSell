import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Box, Button, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserState } from "../Context/UserProvider";
import CloseIcon from "@mui/icons-material/Close";

const UserProfile = () => {
 
  const navigate = useNavigate();
  const [prods, setprods] = useState([]);
  const { user } = UserState();
  
    let { id } = useParams();
  const fetchdata = async () => {
 try {
   var token = JSON.parse(localStorage.getItem("user")).token;

   const config = {
     headers: {
       authorization: `Bearer ${token}`,
     },
   };

   const { data } = await axios.get(
     `http://localhost:5000/product/${id}`,
     config
   );
   setprods(data);
   console.log(data)
 } catch (error) {
   // Handle error if necessary
   console.error(error);
 }  
  };

  useEffect( () => {
    fetchdata();
  },[]);

  const handleRemoveProduct = async(productId) => {
      try {
         var token =  JSON.parse(localStorage.getItem("user")).token;
         const config = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(
          `http://localhost:5000/product/remove/${productId}`,
          config
        );
          fetchdata()
      
      } catch (error) {
        // Handle error if necessary
        console.error(error);
      }
    
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-evenly"
      width="100%"
    >
      {prods.map((pro) => (
        <Box
          key={pro._id}
          style={{ position: "relative" }} // Add position: relative to the container box
         
        >
          <IconButton
            style={{marginTop:"10px"}}
            onClick={()=>{navigate(`/${pro._id}/product`); }}
          >
            <ProductCard prod={pro}  key={pro._id}/>
          </IconButton>
      
         {JSON.parse(user).id===id&& <IconButton
            onClick={() => handleRemoveProduct(pro._id)}
            style={{
              position: "absolute", // Position the close icon absolutely
              top: 0, // Place it at the top
              right: 0, // Place it at the right
              color: "white",
              height:"1px"
            }}
          >
            <CloseIcon />
          </IconButton>}
        </Box>
      ))}
    </Box>
  );
};

export default UserProfile;
