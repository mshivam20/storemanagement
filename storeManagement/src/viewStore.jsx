import React from "react";
import { useState } from "react";

function ViewStores(){
    const [stores, setStores] = useState([]);
    useState(()=>{
        const fetchStores =async ()=>{
            const response =await fetch("/api/viewStore");
            const data = await response.json();
            setStores(data);
            console.log(data);
        }
        fetchStores();
    },[])

    return(
        <div>
                <div className="viewStores p-10">
                    {stores.map((store)=>(
                        <div key={store.id} className="storeCard w-3/4 p-4 mt-4 border border-gray-300 rounded-lg ml-40">
                            <h2 className="text-lg font-medium">Store id: {store.store_id}</h2>
                            <h2 className="text-xl font-semibold">{store.store_name}</h2>
                            <p>Location: {store.address}</p>
                            <p>overall rating: {store.overall_rating} ⭐</p>
                        </div>
                    ))}

                </div>
        </div>

    )
}

export default ViewStores;