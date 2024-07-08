import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRoutes from "./routes/users.routes";

//Database Connection
mongoose
  .connect(process.env.MONGO_CONNECTION_URI as string)
  .then(() => console.log(`Database successfully connected`))
  .catch((e) => console.log(`error while connection database : ${e}`));

const server = express();

server.use(express.json());

server.use(cors());

server.use("/api/user", userRoutes);

server.listen(5400, () => {
  console.log(`Server is working on http://localhost:5400`);
});
