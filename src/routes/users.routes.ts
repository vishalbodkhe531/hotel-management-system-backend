import express from "express";
import { userCreate } from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.post("/register", userCreate);

export default userRoutes;
