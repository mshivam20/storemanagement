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

app.get("/api/dataCount",async(req,res)=>{
    try{
        const totalStores=await db.query("SELECT COUNT(*) FROM store");
        const totalUsers=await db.query("SELECT COUNT(*) FROM users");
        const totalRatings=await db.query("SELECT COUNT(*) FROM ratings");
        res.status(200).json({totalStores: totalStores.rows[0].count, totalUsers: totalUsers.rows[0].count, totalRatings: totalRatings.rows[0].count});
        console.log(totalStores.rows[0].count, totalUsers.rows[0].count, totalRatings.rows[0].count);
    }catch(error){
        console.error("Error fetching data count:", error);
        res.status(500).json({error:"Failed to fetch data count"});
    }
})

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

app.get("/api/viewUsers", async(req,res)=>{
    try{
        const result=await db.query("SELECT *FROM users");
        const users=result.rows;
        res.status(200).json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        res.status(500).json({error:"Failed to fetch users"});
    }
});

app.get("/api/viewStore", async(req,res)=>{
    try{
        const result =await db.query("SELECT * FROM store");
        const stores = result.rows;
        res.status(200).json(stores);
    }catch(error){
        console.error("Error fetching stores:", error);
        res.status(500).json({error:"Failed to fetch stores"});
    }
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
