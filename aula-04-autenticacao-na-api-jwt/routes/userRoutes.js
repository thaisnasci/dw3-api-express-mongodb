import express from "express";

const userRoutes = express.Router();

import userController from "../controllers/userController.js";

// Endpoint (rota) para CADASTRAR um usuário
userRoutes.post("/user", userController.createUser);

// Endpoint (rota) para LOGAR um usuário
userRoutes.post("/login", userController.loginUser);

export default userRoutes;
