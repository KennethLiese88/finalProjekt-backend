import express from "express";
import cors from "cors";
import atlasConnect from "./config/atlasConnect.js";
import userRouter from "./routes/userRoutes.js";

atlasConnect(); 
// check wo und wie lange eine verbindung bestehen soll

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRouter);

app.listen(PORT, ()=>{
    console.log(`Server is litening on Port: ${PORT}`);
})