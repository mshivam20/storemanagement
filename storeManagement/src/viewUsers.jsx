import React from "react";
import { useState } from "react";

function ViewUsers(){
    const [users, setUsers] = useState([]);

    useState(()=>{
        const fetchUSers=async ()=>{
            const response = await fetch("/api/viewUsers");
            const data = await response.json();
            setUsers(data);
            console.log(data);
        }
        fetchUSers();
    })

    return(

        <div>
            <div className="p-10">
                <h1 className="text-2xl font-bold">View Users</h1>
                <div className="users">
                    {users.map((user)=>(
                        <div key={user.id} className="userCard w-3/4 p-4 mt-4 border border-gray-300 rounded-lg">
                            <h2 className="text-lg font-medium">user id: {user.user_id}</h2>
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p>Email: {user.email}</p>
                            <p>Address: {user.address}</p>
                            <p>Role: {user.role}</p>
                        </div>
                    )
                    )}
                </div>

            </div>
            
        </div>
    )
}   

export default ViewUsers;