import { useState, useEffect } from "react";
import { LogOut, Star, KeyRound, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OwnerPanel() {
  const navigate = useNavigate();

  const [avgRating, setAvgRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [ownerName, setOwnerName] = useState("");

  useEffect(() => {
    fetchStoreData();
  }, []);

  const fetchStoreData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/store-owner/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
     

     setAvgRating(Math.round(Number(data.overall_rating[0].avg) * 10) / 10);
      setRatings(data.ratingsHistory);
      setStoreName(data.storeData[0].store_name);
      setAddress(data.storeData[0].address);
      setOwnerName(data.storeData[0].name);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <div className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
        
        <div>
          <h1 className="text-2xl font-bold">
            Store Owner Dashboard
          </h1>
          <p className="text-sm text-gray-300">
            Welcome, {ownerName}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-slate-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-6">

        {/* Store Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {storeName}
          </h2>
          <p className="text-sm text-gray-500">
            {address}
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3">
            <Star className="text-yellow-500" size={28} />

            <div>
              <h2 className="text-lg font-semibold">
                Average Store Rating
              </h2>

              <p className="text-3xl font-bold text-slate-900">
                {avgRating}
              </p>
            </div>
          </div>
        </div>

        {/* Change Password Button Only */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound size={22} />
            <h2 className="text-xl font-bold">
              Change Password
            </h2>
          </div>

          <button
            onClick={() => navigate("/change-password")}
            className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-700"
          >
            Go to Change Password
          </button>
        </div>

        {/* Users Who Rated */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-5">
            <Users size={24} />
            <h2 className="text-xl font-bold">
              Users Who Rated Your Store
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-center">Rating</th>
                </tr>
              </thead>

              <tbody>
                {ratings.map((user) => (
                  <tr
                    key={user.user_id}
                    className="border-b hover:bg-slate-100"
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 text-center font-semibold text-yellow-500">
                      ⭐ {user.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {ratings.length === 0 && (
              <p className="text-center text-gray-500 mt-4">
                No ratings yet.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}