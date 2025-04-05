/** @format */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import Events from "./pages/Events";
import UserEvents from "./components/Events/userevents";
import VendorProfile from "./pages/Profile/vendorprofile";
import EventDetail from "./pages/Events/eventdetail";
import Payment from "./pages/Payment";
import Booking from "./pages/Booking";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/vendor-profile" element={<VendorProfile />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/userevents" element={<UserEvents />} />
          <Route path="/eventdetails/:id" element={<EventDetail />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
