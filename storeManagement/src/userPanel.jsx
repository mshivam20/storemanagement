import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Search, Star, LogOut } from "lucide-react";
export default function UserPanel() {
    
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [stores, setStores] = useState([
  ]);

  useEffect(()=>{
    

    const fetchStores = async()=>{
        const token = localStorage.getItem("token");
        const response = await fetch("/api/getStores", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const data = await response.json();

console.log("Response:", data);
console.log("Is Array:", Array.isArray(data));
        setStores(
  data.map((store) => ({
    id: store.store_id,
    name: store.store_name,
    address: store.address,
    overallRating: store.overall_rating,
    userRating: store.user_rating,
  }))
);
    }
    fetchStores();
  }, []);

const handleRating = async (storeId, rating) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `/api/userRating/${storeId}/rating`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setStores((prev) =>
        prev.map((store) =>
          store.id === storeId
            ? { ...store, userRating: rating }
            : store
        )
      );
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
   
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      store.address
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}
      <div className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">
          Store Ratings
        </h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-slate-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-6">

        {/* Search */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center border rounded-lg px-3">
            <Search
              size={20}
              className="text-gray-500"
            />

            <input
              type="text"
              placeholder="Search by Store Name or Address..."
              className="w-full p-3 outline-none"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>

        {/* Store Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-slate-900">
                {store.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {store.address}
              </p>

              <div className="mt-4 space-y-2">

                <div>
                  <span className="font-semibold">
                    Overall Rating:
                  </span>{" "}
                  <span className="text-yellow-500">
                    ⭐ {store.overallRating}
                  </span>
                </div>

                <div>
                  <span className="font-semibold">
                    Your Rating:
                  </span>{" "}
                  {store.userRating ? (
                    <span className="text-blue-600">
                      ⭐ {store.userRating}
                    </span>
                  ) : (
                    <span className="text-red-500">
                      Not Rated
                    </span>
                  )}
                </div>

              </div>

              {/* Rating Buttons */}
              <div className="mt-5">
                <p className="font-medium mb-2">
                  Rate this store:
                </p>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() =>
                        handleRating(
                          store.id,
                          rating
                        )
                      }
                      className={`w-10 h-10 rounded-full border flex items-center justify-center
                      ${
                        store.userRating === rating
                          ? "bg-slate-900 text-white"
                          : "bg-white hover:bg-slate-200"
                      }`}
                    >
                      <Star size={16} />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
