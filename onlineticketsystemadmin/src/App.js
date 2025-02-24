import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './Pages/Users';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path='/users' element={<Users/>}/>
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
