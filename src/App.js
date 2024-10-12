import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import Navbar from "./components/Navbar";
import Footer from "./components/footer/footer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute>{/* <Dashboard /> */}</PrivateRoute>}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
