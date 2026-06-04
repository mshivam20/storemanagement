import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import pg from 'pg';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import verifyToken from './middleware/auth.js';

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

const db= new pg.Client({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT
});
const saltRound=10;

db.connect();
app.post("/api/signup", async(req,res)=>{
    const {name, email, password, address, role} = req.body;
    
    try{
        const checkResult= await db.query("SELECT * FROM users WHERE email=$1",[email]);
        if(checkResult.length>0){
            return res.status(400).json({message:"Email already exists"});

        }else{
            bcrypt.hash(password, saltRound, async(err, hash)=>{
                if(err){
                    console.error("Error hashing password:", err);
                    return res.status(500).json({message:"Internal server error"});
                }else{
                    await db.query("INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5)",[name, email, hash, address, role   ]);
                    res.status(200).json({success:"true", message:"User created successfully"});
                }
                
            })
        }
    }catch(error){
        console.error("Error during signup:", error);
        res.status(500).json({message:"Internal server error"});
    }
})

app.post ("/api/login", async (req,res)=>{
    const {email, password} = req.body;
    console.log(email, password);
    try{
        const result =await db.query("SELECT * FROM users WHERE email=$1",[email]);
        console.log(result.rows);
        if(result.rows.length===0){
            return res.status(400).json({message:"Invalid email or password"});
        }else{
            const user = result.rows[0];
            console.log(user);
           
            console.log(user.user_id);
            bcrypt.compare(password, user.password, (err,isMatch)=>{
                if(err){
                    console.error("Error comparing passwords:", err);
                    return res.status(500).json({message:"Internal server error"});
                }else if(isMatch){
                    const token = jwt.sign(
                        {
                            id: user.user_id,
                            name:user.name,
                            email: user.email,
                            role: user.role,
                        },
                            process.env.JWT_SECRET,
                {
                    expiresIn: "1d",
                }
        );
                    res.status(200).json({success:"true", message:"Login successful", role: user.role, token});
                }else{
                    res.status(400).json({message:"Invalid email or password"});
                }
            })
        }
    }catch(error){
        console.error("Error during login:", error);
        res.status(500).json({message:"Internal server error"});
    }
})

app.get("/api/dataCount",async(req,res)=>{
    try{
        const totalStores=await db.query("SELECT COUNT(*) FROM store");
        const totalUsers=await db.query("SELECT COUNT(*) FROM users");
        const totalRatings=await db.query("SELECT COUNT(*) FROM ratings");
        res.status(200).json({totalStores: totalStores.rows[0].count, totalUsers: totalUsers.rows[0].count, totalRatings: totalRatings.rows[0].count});
        
    }catch(error){
        console.error("Error fetching data count:", error);
        res.status(500).json({error:"Failed to fetch data count"});
    }
})
app.get("/api/storeOwners", async(req,res)=>{
    try{
        const result = await db.query("SELECT user_id, name FROM users WHERE role='store_owner' AND user_id NOT IN(SELECT owner_id FROM store);");
        const storeOwners = result.rows;
        console.log(result.rows);
        res.status(200).json(storeOwners);
        
        
    }catch(error){
        console.error("Error fetching store owners:", error);
        res.status(500).json({error:"Failed to fetch store owners"});
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
// app.get(
//   "/api/admin",
//   verifyToken,
//   (req, res) => {
//     res.json(products);
//   }
// );

app.get("/api/getStores", verifyToken, async (req, res) => {
  const userId = req.user.id;
  console.log(userId)
  

  const result = await db.query(
    `
    SELECT
      s.store_id,
      s.store_name,
      s.address,

      COALESCE(AVG(r.rating),0) AS overall_rating,

      (
        SELECT rating
        FROM ratings
        WHERE store_id = s.store_id
        AND user_id = $1
      ) AS user_rating

    FROM store s
    LEFT JOIN ratings r
      ON s.store_id = r.store_id

    GROUP BY s.store_id
    `,
    [userId]
  );
  console.log(result.rows);

  res.json(result.rows);
});
app.post(
  "/api/userRating/:id/rating",
  verifyToken,
  async (req, res) => {
    const storeId = req.params.id;
    const userId = req.user.id;
    console.log(userId);
    const { rating } = req.body;

    try {
      await db.query(
        `
        INSERT INTO ratings
        (user_id, store_id, rating)
        VALUES ($1, $2, $3)

        ON CONFLICT (user_id, store_id)
        DO UPDATE
        SET rating = EXCLUDED.rating
        `,
        [userId, storeId, rating]
      );

      res.status(200).json({
        success: true,
        message: "Rating saved",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);
app.get("/api/store-owner/dashboard",verifyToken, async(req,res)=>{
    const user_id= req.user.id;
    console.log(user_id);
    try{
        const storeData= await db.query(`SELECT store.store_id, store.store_name,store.address,store.overall_rating,users.name
FROM store
JOIN users
ON store.owner_id= users.user_id
WHERE store.owner_id=$1`,[user_id]);



const ratingsHistory = await db.query(`
    SELECT users.name,users.email , ratings.rating 
FROM ratings
JOIN users
ON users.user_id= ratings.user_id
WHERE store_id=$1
`,[storeData.rows[0].store_id]);

console.log(storeData.rows);
console.log(ratingsHistory.rows)
res.status(200).json({
  storeData: storeData.rows,
  ratingsHistory: ratingsHistory.rows,
});

    }catch(error){
        console.error(error)
        res.status(500).json({
        message: "Server Error",
      });
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
