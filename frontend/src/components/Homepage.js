import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard"
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Homepage = () => {
  const navigate=useNavigate()
  const [prods, setprods] = useState([]);
  const fetchdata = async () => {
    const { data } = await axios.get("http://localhost:5000/product/");
    setprods(data);
  
  };
  useEffect(() => {
    fetchdata();
  
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="space-evenly"
      width="100%"
    >
      {prods.map((pro) => (
        <Button onClick={()=>{navigate(`/${pro._id}/product`)}}>
          <ProductCard prod={pro} key={pro._id} />
        </Button>
      ))}
    </Box>
  );
};

export default Homepage;
