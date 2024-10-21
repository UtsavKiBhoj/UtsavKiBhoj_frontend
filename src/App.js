import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Signup from "./pages/signup/signup";
import Login from "./pages/login/login";
import Navbar from "./components/Navbar";
import Footer from "./components/footer/footer";
import LandingPage from "./pages/landingPage/LandingPage";
import UserProfile from "./pages/userProfile/UserProfile";
import ForgotPassword from "./pages/forgetPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import EventDetailForm from "./pages/eventPages/eventForm/EventDetailForm";
import EventDetails from "./pages/eventsDetail/EventDetails";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword/>} />
        <Route path="/userprofile" element={<PrivateRoute>{<UserProfile/>}</PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute>{/* <Dashboard /> */}</PrivateRoute>}/>
        <Route path="/forget-password"element={<PrivateRoute>{<ForgotPassword />}</PrivateRoute>}/>
        <Route path="event/Create-form/"element={<PrivateRoute>{<EventDetailForm/>}</PrivateRoute>}/>
        <Route path="event/list/"element={<PrivateRoute>{<EventDetails/>}</PrivateRoute>}/>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
