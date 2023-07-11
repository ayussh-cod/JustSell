import "./App.css";
import Homepage from "./components/Homepage";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sell from "./components/Sell";
import Product from "./components/Product";
import Signup from "./components/Signup";
import UserProvider from "./Context/UserProvider";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import Uo from "./components/Uo";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app-container">
          <Navbar />
        </div>
        <div className="content-container">
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/:u/sell" element={<Sell />} />
            <Route exact path="/:id/product" element={<Product />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/:id" element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
