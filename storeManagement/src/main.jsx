import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css'
import Login from './login';
import AdminDashboard from './adminDashboard';
import UserPanel from './userPanel';
import AddUser from './addUser';
import Signup from './signup';
import OwnerPanel from './ownerPanel';



ReactDOM.createRoot(document.getElementById("root")).render(
  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login /> } />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserPanel />} />
      <Route path="/addUser" element={<AddUser />} />
      <Route path="/store-owner" element={<OwnerPanel />} />
    </Routes>
  </BrowserRouter>,
)
