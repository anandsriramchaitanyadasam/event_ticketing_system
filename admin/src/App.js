<<<<<<< HEAD
/** @format */

=======
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./Pages/Users";
<<<<<<< HEAD

import Vendors from "./Pages/Vedors";
import Category from "./Pages/Category";
import Events from "./Pages/Events";
import BookedEvents from "./Pages/Events/bookedevents";
import PaymentHistory from "./Pages/PaymentHistory";
import Reviews from "./Pages/Reviews";
import Notification from "./Pages/Notification";
=======
import Plants from "./Pages/Plants";
import Tags from "./Pages/Tags";
import Vendors from "./Pages/Vedors";
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
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
<<<<<<< HEAD
          <Route path="/category" element={<Category />} />
          <Route path="/events" element={<Events />} />
          <Route path="/bookedevents" element={<BookedEvents />} />
          <Route path="/paymenthistory" element={<PaymentHistory />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/notification" element={<Notification />} />
=======
          {/* <Route path='/plants' element={<Plants/>}/>
          <Route path='/tags' element={<Tags/>}/> */}
>>>>>>> 4470dcc363f614e28f589f2214d595ce2d6d96a7
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
