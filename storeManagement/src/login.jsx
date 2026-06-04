import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch(
        "/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store JWT
         
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Redirect to dashboard
        if (data.role === "admin") {
          navigate("/admin");
        } else if (data.role === "user") {
          navigate("/user");
        } else if (data.role === "store_owner") {
          navigate("/store-owner");
        } else {
          setError("Unknown user role");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }

    const token = localStorage.getItem("token");



  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-slate-900 text-white p-8">
            <h1 className="text-3xl font-bold">
              Welcome Back
            </h1>

            <p className="text-slate-300 mt-2">
              Login to continue
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-800"
                />
              </div>

              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800 transition duration-200"
              >
                Login
              </button>
            </form>

            <p className="text-center text-slate-600 mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-slate-900 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}