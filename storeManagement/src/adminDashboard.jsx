import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ViewStores from "./viewStore";
import AddStore from "./addStore";
import AddUser from "./addUser";
import ViewUsers from "./viewUsers";

function AdminDashboard(){
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

        console.log("Total Stores:", data.totalStores);
        console.log("Total Users:", data.totalUsers);
        console.log("Total Ratings:", data.totalRatings);
    };

    fetchCounts();
}, []);

    return(
        <div>
            <div className="dataCount flex gap-10 justify-center items-center h-30 bg-blue-950 text-white">
                <h1>Total Stores: {totalStores}</h1>
                <h1>Total Users: {totalUsers}</h1>
                <h1>Total Ratings: {totalRatings}</h1>
            </div>
             <div className="buttons flex w-full h-20 justify-center items-center gap-6 ">
                <button className="w-fit h-fit p-2 text-md font-semibold bg-blue-800 text-white rounded-xl " onClick={() => setActiveButton("viewStores")}>View Stores</button>
                <button className="w-fit h-fit p-2 text-md font-semibold bg-blue-800 text-white rounded-xl" onClick={() => setActiveButton("addStore")}>Add Store</button>
                <button className="w-fit h-fit p-2 text-md font-semibold bg-blue-800 text-white rounded-xl" onClick={() => setActiveButton("addUser")}>Add New User</button>
                <button className="w-fit h-fit p-2 text-md font-semibold bg-blue-800 text-white rounded-xl" onClick={() => setActiveButton("viewUsers")}>View Users</button>
                

             </div>
             <div className="display w-full h-screen">
                {activeButton === "viewStores" && <ViewStores />}
                {activeButton === "addStore" && <AddStore />}
                {activeButton === "addUser" && <AddUser />}
                {activeButton === "viewUsers" && <ViewUsers />}
             </div>


        </div>
    )
}

export default AdminDashboard;