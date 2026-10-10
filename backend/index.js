import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import createUserRouter from "./routes/createUser.js";
import user from "./models/user.js";
import cors from "cors"
const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use("/api", createUserRouter);

const port = process.env.PORT || 8000;



app.get("/",  (req, res) => {
    res.send("hello world");
});

app.post("/api/user",async (req,res)=>{
    const {firstName,lastName,email,password,userName} = req.body;

    try {
        const newUser = await user.create({
            firstName,
            lastName,
            email,
            password,
            userName
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get("/api/user",async(req,res)=>{
    try{
        const users = await user.find();
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`server is listening on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB; server was not started.", error);
        process.exitCode = 1;
    }
};

startServer();
