import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

const PriceCard = ({ prod }) => {
  if (!prod || !prod[0]) {
    return null; // or render a placeholder or loading state
  }

  return (
    <Card
      sx={{
        maxWidth: "100%",
       
        backgroundColor: "lightgray", // Set the background color
        borderRadius: "8px", // Set the border radius
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add a box shadow
        padding: "16px", // Add padding
      }}
    >
      <CardContent>
        <Box
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            marginBottom: "8px",
          }}
        >
          Name: {prod[0].name}
        </Box>
        <Box>Price: {prod[0].price}</Box>
        
      </CardContent>
    </Card>
  );
};

export default PriceCard;
