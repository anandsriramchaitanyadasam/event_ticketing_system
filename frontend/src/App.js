<<<<<<< HEAD
/** @format */

=======
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
<<<<<<< HEAD
import Events from "./pages/Events";

import EventDetail from "./pages/Events/eventdetail";
import Payment from "./pages/Payment";
import Booking from "./pages/Booking";
import BookingDetails from "./pages/Booking/bookingdetails";
import PaymentHistory from "./pages/Payment/paymenthistory";
import Reviews from "./pages/Reviews";
import Notification from "./pages/Notification";
=======
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
<<<<<<< HEAD

          <Route path="/home" element={<HomePage />} />
          <Route path="/events" element={<Events />} />

          <Route path="/eventdetails/:id" element={<EventDetail />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookingdetails/:id" element={<BookingDetails />} />
          <Route path="/paymenthistory" element={<PaymentHistory />} />
          <Route path="/getreviews" element={<Reviews />} />
          <Route path="/notification" element={<Notification />} />
=======
          {/* <Route path="/home" element={<HomePage />} /> */}
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
