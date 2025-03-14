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
          <Route
            path="/userevents/:category_name/:event_date/:city"
            element={<UserEvents />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
