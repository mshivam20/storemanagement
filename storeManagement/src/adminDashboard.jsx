import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ViewStores from "./viewStore";
import AddStore from "./addStore";
import AddUser from "./addUser";
import ViewUsers from "./viewUsers";

function AdminDashboard(){
    const [activeButton, setActiveButton] = useState("viewStores");

    return(
        <div>
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