/** @format */

// Import global stylesheet and Bootstrap CSS
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Import page components for each route
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Vendors from "./Pages/Vedors";          // Note: ensure folder/file name matches ("Vedors" vs "Vendors")
import Category from "./Pages/Category";
import Events from "./Pages/Events";
import BookedEvents from "./Pages/Events/bookedevents";
import PaymentHistory from "./Pages/PaymentHistory";
import Reviews from "./Pages/Reviews";
import Notification from "./Pages/Notification";

// Imports from react-router-dom for client‑side routing
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* Wrap the application in a router */}
      <BrowserRouter>
        {/* Define application routes */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />            {/* Landing page */}
          <Route path="/login" element={<Login />} />      {/* Login page */}

          {/* Protected/admin routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/category" element={<Category />} />
          <Route path="/events" element={<Events />} />
          <Route path="/bookedevents" element={<BookedEvents />} />
          <Route path="/paymenthistory" element={<PaymentHistory />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
