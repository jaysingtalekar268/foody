import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors())

app.get("/test",async (req:Request,res:Response)=>{
    res.json({message:"Server is working"});
    res.send();
});

app.listen(3001,()=>{
    console.info("Server started successfully on port 3001");
});