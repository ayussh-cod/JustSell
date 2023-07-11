import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {useNavigate} from "react-router-dom"
import Signup from "./Signup";
import { UserState } from "../Context/UserProvider";
import { Avatar } from "@mui/material";
import axios from "axios";
const Navbar = () => {
const {user,setuser}=UserState();
const navigate=useNavigate();
const gohome=()=>{
  navigate(`/`)
}
const Userclick=async()=>{
  
  
  navigate(`/${JSON.parse(user).id}`)
   window.location.reload();
// window.location.reload();
}
const handleClick = () => {
  if(user)
  navigate(`/${JSON.parse(user).id}/sell`);
  else 
  navigate("/login");
};
const login = () => { 
  // Change the URL to '/new-url'
  navigate(`/login`);
};
const logout = () => {
  setuser("")
  localStorage.setItem("user","")
  navigate(`/`);
};
 return (
   <Box sx={{ flexGrow: 1 }}>
     <AppBar position="fixed" sx={{ backgroundColor: "black"}}>
       <Toolbar>
         <IconButton
           size="large"
           edge="start"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 2 }}
         >
           <MenuIcon />
         </IconButton>
         <Typography component="div" sx={{ flexGrow: 1 }} onClick={gohome}>
           <Button variant="h6">Bechde</Button>
         </Typography>
         {user ? (
           <Button color="inherit" onClick={logout}>
             Logout
           </Button>
         ) : (
           <Button color="inherit" onClick={login}>
             login
           </Button>
         )}
         <Button color="inherit" onClick={handleClick}>
           sell
         </Button>
         {user && (
           <Button onClick={Userclick}>
             <Avatar
               alt="Remy Sharp"
               src="http://res.cloudinary.com/dopsbmkae/image/upload/v1686910810/zicvrkkebd4fi6pgapqt.png"
             />
           </Button>
         )}
       </Toolbar>
     </AppBar>
   </Box>
 );
};

export default Navbar;
