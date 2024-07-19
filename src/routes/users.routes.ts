import express from "express";
import {
  userCreate,
  userLogin,
  userLogout,
  veryfyToken,
} from "../controllers/user.controller";
import { isAuthenticatedUser } from "../middleware/auth";

const userRoutes = express.Router();

userRoutes.post("/register-user", userCreate);
userRoutes.post("/login-user", userLogin);

userRoutes.get("/logout-user", userLogout);
userRoutes.get("/validate-token", isAuthenticatedUser, veryfyToken);

export default userRoutes;
