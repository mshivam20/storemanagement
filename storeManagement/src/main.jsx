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



ReactDOM.createRoot(document.getElementById("root")).render(
  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserPanel />} />
      <Route path="/addUser" element={<AddUser />} />
    </Routes>
  </BrowserRouter>,
)
