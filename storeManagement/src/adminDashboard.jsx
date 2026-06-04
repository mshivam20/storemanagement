import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ViewStores from "./viewStore";
import AddStore from "./addStore";
import AddUser from "./addUser";
import ViewUsers from "./viewUsers";

import { LogOut, KeyRound } from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("viewStores");

  const [totalStores, setTotalStores] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const response = await fetch("/api/dataCount");
      const data = await response.json();

      setTotalStores(data.totalStores);
      setTotalUsers(data.totalUsers);
      setTotalRatings(data.totalRatings);
    };

    fetchCounts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">

        <h1 className="text-2xl font-bold">
          Admin Dashboard
        </h1>

        <div className="flex items-center gap-4">

          <button
            onClick={() => navigate("/change-password")}
            className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-slate-200"
          >
            <KeyRound size={18} />
            Change Password
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-gray-500">Total Stores</h2>
          <p className="text-3xl font-bold text-slate-900">{totalStores}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-3xl font-bold text-slate-900">{totalUsers}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-gray-500">Total Ratings</h2>
          <p className="text-3xl font-bold text-slate-900">{totalRatings}</p>
        </div>

      </div>

      {/* NAV BUTTONS */}
      <div className="flex justify-center mt-8">
        <div className="bg-white shadow-md rounded-xl p-4 flex flex-wrap gap-4 justify-center">

          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeButton === "viewStores"
                ? "bg-slate-900 text-white"
                : "bg-slate-200"
            }`}
            onClick={() => setActiveButton("viewStores")}
          >
            View Stores
          </button>

          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeButton === "addStore"
                ? "bg-slate-900 text-white"
                : "bg-slate-200"
            }`}
            onClick={() => setActiveButton("addStore")}
          >
            Add Store
          </button>

          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeButton === "addUser"
                ? "bg-slate-900 text-white"
                : "bg-slate-200"
            }`}
            onClick={() => setActiveButton("addUser")}
          >
            Add User
          </button>

          <button
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeButton === "viewUsers"
                ? "bg-slate-900 text-white"
                : "bg-slate-200"
            }`}
            onClick={() => setActiveButton("viewUsers")}
          >
            View Users
          </button>

        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="max-w-6xl mx-auto mt-8 px-6 pb-10">

        <div className="bg-white rounded-xl shadow-md p-6">

          {activeButton === "viewStores" && <ViewStores />}
          {activeButton === "addStore" && <AddStore />}
          {activeButton === "addUser" && <AddUser />}
          {activeButton === "viewUsers" && <ViewUsers />}

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;