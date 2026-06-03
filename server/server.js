import express from 'express';
import cors from 'cors';

import pg from 'pg';

const app = express();
const port=3000;

app.use(cors());
app.use(express.json());

const db= new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"storeManagement",
    password:"isbm@123",
    port:5432
});

db.connect();

app.post("/api/addStore", async(req,res)=>{
    const {storeName, storeLocation, storeOwner} = req.body;
    console.log(storeName, storeLocation, storeOwner);
    try{
        await db.query("INSERT INTO store (store_name, address, owner_id) VALUES ($1, $2, $3)",[storeName, storeLocation, storeOwner]);
        res.status(200).json({message:"Store added successfully"});
    }catch(error){
        console.error("Error adding store:", error);
        res.status(500).json({error:"Failed to add store"});
    }
})

app.post("/api/addUser",async(req,res)=>{
    const {userName, userEmail, userPassword, userRole, address} = req.body;
    console.log(userName, userEmail, userPassword, userRole, address);
    try{
        await db.query("INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5)",[userName, userEmail, userPassword, address, userRole]);
        res.status(200).json({message:"User added successfully"});  
    }catch(error){
        console.error("Error adding user:", error);
        res.status(500).json({error:"Failed to add user"});
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
