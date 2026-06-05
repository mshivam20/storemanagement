import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Search } from "lucide-react";

function ViewUsers(){
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(()=>{
        const fetchUSers=async ()=>{
            const response = await fetch("/api/viewUsers");
            const data = await response.json();
            setUsers(data);
            console.log(data);
        }
        fetchUSers();
    })

    
  const filteredUser = users.filter(
  (user) =>
    user.name?.toLowerCase().includes(search.toLowerCase()) ||
    user.address?.toLowerCase().includes(search.toLowerCase())
);

    return(

        <div>
            <div className="p-10">
                <h1 className="text-2xl font-bold">View Users</h1>
                 <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center border rounded-lg px-3">
            <Search
              size={20}
              className="text-gray-500"
            />

            <input
              type="text"
              placeholder="Search by User Name or Address..."
              className="w-full p-3 outline-none"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>
        </div>
                <div className="users">
                    {filteredUser.map((user)=>(
                        <div key={user.id} className="userCard w-3/4 p-4 mt-4 border border-gray-300 rounded-lg">
                            <h2 className="text-lg font-medium">user id: {user.user_id}</h2>
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p>Email: {user.email}</p>
                            <p>Address: {user.address}</p>
                            <p>Role: {user.role}</p>
                            <p>Store Rating:{user.overall_rating}</p>
                        </div>
                    )
                    )}
                </div>

            </div>
            
        </div>
    )
}   

export default ViewUsers;