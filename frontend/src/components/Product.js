import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardMedia, Typography } from "@mui/material";
import PriceCard from "./PriceCard";
import ContactCard from "./ContactCard";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [prod, setProd] = useState();
  let { id } = useParams();

  const fetchProd = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/product", {
        params: { id },
        headers: {
          "Content-type": "application/json",
        },
      });
      setProd(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProd();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        padding: "40px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Grid container spacing={4} maxWidth="1200px">
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "10px 15px 4px rgba(0, 0, 0, 0.1)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Product Details
            </Typography>
            <CardMedia
              component="img"
              image="http://res.cloudinary.com/dopsbmkae/image/upload/w_500,h_500/v1686910810/zicvrkkebd4fi6pgapqt.png"
              alt="Product Image"
              sx={{
                objectFit: "contain",
                height: "400px",
                marginBottom: "24px",
              }}
            />
           
              <PriceCard prod={prod} />
           
            <Typography variant="h5" gutterBottom sx={{ marginTop: "24px" }}>
              Product Description
            </Typography>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                hyphens: "auto",
              }}
            >
              {prod && prod[0] && prod[0].description}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "10px 15px 4px rgba(0, 0, 0, 0.1)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Contact Information
            </Typography>
            <ContactCard prod={prod} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
