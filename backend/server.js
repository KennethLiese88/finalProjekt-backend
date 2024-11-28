import express from "express";
import cors from "cors";
import atlasConnect from "./config/atlasConnect.js";
import apiRouter from "./routes/apiRoutes.js";

atlasConnect();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`);
});
