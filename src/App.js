import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import Home from "./pages/home/home";

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

// // Optionally, you can create a Home component
// const Home = () => {
//   return <h1>Welcome to the App</h1>;
// };

export default App;
