
import React, { createContext, useContext, useEffect, useState } from "react";
const UserContext = createContext();

const UserProvider = ({children}) => {
   const [user, setuser] = useState();
  useEffect(() => {
   
     setuser(localStorage.getItem("user"));
     
 
  }, [])
  
 

 return (
    <UserContext.Provider value={{user,setuser}}>
        {children}
    </UserContext.Provider>
 )
};
export const UserState = () => {
  return useContext(UserContext);
};
export default UserProvider;
