import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


    
    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await fetch("/api/changePassword", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Password updated successfully");
      navigate("/login");
    } else {
      setError(data.message);
    }
  } catch (error) {
    console.error(error);
    setError("Something went wrong");
  }
};

  return (
    <div className="min-h-screen bg-slate-100">

      {/* HEADER */}
      <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">

        <div className="flex items-center gap-2">
          <KeyRound size={20} />
          <h1 className="text-xl font-bold">
            Change Password
          </h1>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-slate-200"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      {/* FORM CONTAINER */}
      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-xl p-8">

        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Update Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>

          {/* CURRENT PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition"
          >
            Update Password
          </button>

        </form>
      </div>

    </div>
  );
}