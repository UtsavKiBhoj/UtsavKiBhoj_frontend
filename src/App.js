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
import EventsAllDetails from "./pages/eventsFullDetails/EventsAllDetails";
import AboutUsNgo from "./pages/aboutUsNgo/aboutUsNgo";
import NgoServices from "./pages/ngoServices/ngoServices";
import EventLocationForm from "./pages/eventPages/eventLocationDetails/eventLocationForm";
import { EventProvider } from "./components/context/EventContext";

const App = () => {
  return (
    <EventProvider>
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUsNgo />} />
        <Route path="/services" element={<NgoServices />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />
        <Route
          path="/userprofile"
          element={<PrivateRoute>{<UserProfile />}</PrivateRoute>}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute>{/* <Dashboard /> */}</PrivateRoute>}
        />
        <Route
          path="/forget-password"
          element={<PrivateRoute>{<ForgotPassword />}</PrivateRoute>}
        />
        <Route
          path="/event/Create-form/"
          element={<PrivateRoute>{<EventDetailForm />}</PrivateRoute>}
        />
        <Route
          path="/event/location-form/"
          element={<PrivateRoute>{<EventLocationForm />}</PrivateRoute>}
        />
        <Route
          path="/event/"
          element={<PrivateRoute>{<EventDetails />}</PrivateRoute>}
        />
        <Route path="/event/:id" element={<PrivateRoute>{<EventsAllDetails />}</PrivateRoute>} />{" "}
        {/* Individual event details */}
      </Routes>
      <Footer />
    </Router>
    </EventProvider>
  );
};

export default App;
