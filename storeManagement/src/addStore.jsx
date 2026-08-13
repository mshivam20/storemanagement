import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddStore(){
    const [storeName, setStoreName] = useState("");
    const [storeLocation, setStoreLocation] = useState("");
    const [storeOwner, setStoreOwner] = useState("");
    const [ownerOptions, setOwnerOptions] = useState([]);
    useEffect(()=>{
        const fetchStoreOwners = async()=>{
            const response = await fetch("/api/storeOwners");
            const data = await response.json();
            setOwnerOptions(data);
        }
        fetchStoreOwners();
    }, []);

    const navigate = useNavigate();
    
   const addStore = async () =>{
         const response =await fetch("/api/addStore",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                storeName,
                storeLocation,
                storeOwner
            })
        } )
            const data = await response.json();
            console.log(data);
            navigate("/addStore");
            
   };

  

    

    return (

        <div>
            <div className="addStore p-10">
            <h1 className="text-xl  font-bold ">Add Store</h1>
            <form action="" onSubmit={addStore}>
                <div className="inputFields flex flex-col gap-4 mt-4">
                    <input type="text" placeholder="Store Name" className="w-1/3 h-10 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                    <input type="text" placeholder="Store Location" className="w-1/3 h-10 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={storeLocation} onChange={(e) => setStoreLocation(e.target.value)} />
                    <select name="owner" id="owner" className="w-1/3 h-10 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value={storeOwner} onChange={(e) => setStoreOwner(e.target.value)}>
                        <option value="" disabled >Select Store Owner</option>
                        {ownerOptions.map((owner)=>(
                            <option key={owner.id} value={owner.user_id}>{owner.name}</option>
                        ))}
                    </select>
                    <button className="w-fit h-fit p-2 text-md font-semibold bg-green-600 text-white rounded-xl" type="submit">Add Store</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default AddStore;