import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute"
mongoose.connect(process.env.MONGODB_URL as string)
.then(()=>console.info("Mongodb connected successfully"))
.catch((e)=>console.error("Error while connecting to mongodb",e))

const app = express();
app.use(express.json());
app.use(cors())

app.get("/test",async (req:Request,res:Response)=>{
    res.json({message:"Server is working"});
    res.send();
});

app.use("/api/my/user",myUserRoute);

app.listen(3001,()=>{
    console.info("Server started successfully on port 3001");
});