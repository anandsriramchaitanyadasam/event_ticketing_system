/** @format */

import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./Pages/Users";

import Vendors from "./Pages/Vedors";
import Category from "./Pages/Category";
import Events from "./Pages/Events";
import BookedEvents from "./Pages/Events/bookedevents";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/category" element={<Category />} />
          <Route path="/events" element={<Events />} />
          <Route path="/bookedevents" element={<BookedEvents />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
