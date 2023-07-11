import React from "react";
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

const ProductCard = ({ prod ,close}) => {
  return (
    <Card sx={{ maxWidth: 360, width: "100%",maxHeight:"700px", marginBottom:"50px", border:"10px solid grey" ,padding:"15px" }}>
      <CardMedia
        component="img"
        height="360"
        image={prod.image}
        alt="Product"
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {prod.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxHeight: 100, overflowY: "auto" }}
        >
          {prod.description}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.primary"
          sx={{ marginTop: "auto" }}
        >
          Price: {prod.price}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default ProductCard;
