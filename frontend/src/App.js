/** @format */

// Importing necessary modules for routing and styling
import { BrowserRouter, Route, Routes } from "react-router-dom"; // BrowserRouter for routing and Routes to define paths
import "./App.css"; // Importing custom CSS styles for the app
import SignUp from "./pages/signup"; // Importing SignUp component
import Login from "./pages/login"; // Importing Login component
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS for styling
import Profile from "./pages/Profile"; // Importing Profile component
import HomePage from "./pages/HomePage"; // Importing HomePage component
import Events from "./pages/Events"; // Importing Events page
import EventDetail from "./pages/Events/eventdetail"; // Importing EventDetail page
import Payment from "./pages/Payment"; // Importing Payment page
import Booking from "./pages/Booking"; // Importing Booking page
import BookingDetails from "./pages/Booking/bookingdetails"; // Importing BookingDetails page
import PaymentHistory from "./pages/Payment/paymenthistory"; // Importing PaymentHistory page
import Reviews from "./pages/Reviews"; // Importing Reviews page
import Notification from "./pages/Notification"; // Importing Notification page

// Main App component defining routes and their corresponding components
function App() {
  return (
    <div className="App">
      {/* Wrapping the entire application with BrowserRouter to enable routing */}
      <BrowserRouter>
        <Routes>
          {/* Defining all the routes of the application */}
          
          {/* Route for SignUp page, accessible at '/' */}
          <Route path="/" element={<SignUp />} />

          {/* Route for Login page, accessible at '/login' */}
          <Route path="/login" element={<Login />} />

          {/* Route for Profile page, accessible at '/profile' */}
          <Route path="/profile" element={<Profile />} />

          {/* Route for HomePage, accessible at '/home' */}
          <Route path="/home" element={<HomePage />} />

          {/* Route for Events page, accessible at '/events' */}
          <Route path="/events" element={<Events />} />

          {/* Route for EventDetail page, dynamic route with event ID, accessible at '/eventdetails/:id' */}
          <Route path="/eventdetails/:id" element={<EventDetail />} />

          {/* Route for Payment page, dynamic route with payment ID, accessible at '/payment/:id' */}
          <Route path="/payment/:id" element={<Payment />} />

          {/* Route for Booking page, accessible at '/booking' */}
          <Route path="/booking" element={<Booking />} />

          {/* Route for BookingDetails page, dynamic route with booking ID, accessible at '/bookingdetails/:id' */}
          <Route path="/bookingdetails/:id" element={<BookingDetails />} />

          {/* Route for PaymentHistory page, accessible at '/paymenthistory' */}
          <Route path="/paymenthistory" element={<PaymentHistory />} />

          {/* Route for Reviews page, accessible at '/getreviews' */}
          <Route path="/getreviews" element={<Reviews />} />

          {/* Route for Notification page, accessible at '/notification' */}
          <Route path="/notification" element={<Notification />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
