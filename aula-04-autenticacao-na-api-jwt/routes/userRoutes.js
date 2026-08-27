import express from "express";

const userRoutes = express.Router();

import userController from "../controllers/userController.js";

userRoutes.post("/user", userController.createUser);
//endpoint para logar um usuario
userRoutes.post("/login", userController.loginUser);

export default userRoutes;
