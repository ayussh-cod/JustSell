import React from "react";
import { Card, CardContent, Avatar, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
const ContactCard = ({ prod }) => {
  const navigate=useNavigate()
  if (!prod || !prod[0]) {
    return null; // or render a placeholder or loading state
  }
console.log(prod[0])
  const { name, phoneNumber,pic,_id } = prod[0].user;
console.log(_id)
  return (
    <Card sx={{ marginTop: "16px", backgroundColor: "#f5f5f5" }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          component="div"
          disableRipple
          onClick={()=>{navigate(`/${_id}`)}}
          sx={{
            display: "flex",
            width:"100%",
            alignItems: "center",
            textTransform: "none",
          }}
        >
          <Avatar
            src=""
            alt="Avatar"
            sx={{
              width: 40,
              height: 40,
              marginRight: "16px",
            }}
          />
          <Typography variant="h6" component="div" fontWeight="bold">
            {name}
          </Typography>
          <ArrowForwardIcon
            sx={{
              marginLeft: "auto",
              color: "grey",
            }}
          />
        </Button>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Phone: {phoneNumber}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
