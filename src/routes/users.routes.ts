import express from "express";
import { userCreate, userLogin } from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.post("/register-user", userCreate);
userRoutes.post("/login-user", userLogin);

export default userRoutes;
