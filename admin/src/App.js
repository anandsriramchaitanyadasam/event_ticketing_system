import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './Pages/Users';
import Plants from './Pages/Plants';
import Tags from './Pages/Tags';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/plants' element={<Plants/>}/>
          <Route path='/tags' element={<Tags/>}/>
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
