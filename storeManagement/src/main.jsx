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
import ProtectedRoute from './protectedRoute';
import HomeRedirect from './homeRedirect';



ReactDOM.createRoot(document.getElementById("root")).render(
  
  <BrowserRouter>
  <Routes>

    <Route
      path="/"
      element={<HomeRedirect />}
    />
    <Route
      path="/signup"
      element={<Signup />}
    />

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      }
    />

    <Route
      path="/user"
      element={
        <ProtectedRoute allowedRole="user">
          <UserPanel />
        </ProtectedRoute>
      }
    />

    <Route
      path="/store-owner"
      element={
        <ProtectedRoute allowedRole="store_owner">
          <OwnerPanel />
        </ProtectedRoute>
      }
    />

    <Route
      path="/addUser"
      element={
        <ProtectedRoute allowedRole="admin">
          <AddUser />
        </ProtectedRoute>
      }
    />

  </Routes>
</BrowserRouter>,
)
