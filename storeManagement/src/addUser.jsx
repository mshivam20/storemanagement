import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser(){

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [address , setAddress] = useState("");
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

    const addUser =async (e)=>{
        e.preventDefault();
     
            const response =await fetch("/api/addUser",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    userName,
                    userEmail,
                    userPassword,
                    userRole,
                    address
                })
            })
                const data = await response.json();
                console.log(data);
                navigate("/addUser");

            
      
    }

    

    return(
        <div>
            <div className="p-10">
            <h1 className="text-xl font-bold ">Add User</h1>
            <form action="/api/addUser" method="POST" onSubmit={addUser}>
                <div className="inputFields flex flex-col gap-4 mt-4">
                    <input type="text" placeholder="User Name" className="w-1/3 h-10 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <input type="email" placeholder="User Email" className="w-1/3 h-10 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    <input type="password" placeholder="User Password" className="w-1/3 h-10 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
                    <input type="text" placeholder="Address" className="w-1/3 h-10 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <select name="role" id="role" className="w-1/3 h-10 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                        <option value="" disabled >Select User Role</option>
                        <option value="admin">Admin</option>
                        <option value="store_owner">Store Owner</option>
                        <option value="user">User</option>
                    </select>
                    <button className="w-fit h-fit p-2 text-md font-semibold bg-green-600 text-white rounded-xl" type="submit">Add User</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default AddUser; 