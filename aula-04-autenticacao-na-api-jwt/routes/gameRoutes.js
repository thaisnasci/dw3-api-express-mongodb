// Endpoints (rotas) de Games
import express from "express";

const gameRoutes = express.Router();

// Importando o controller
import gameController from "../controllers/gameController.js";

// Immportando o middleware de Autenticação
import Auth from "../middlewares/Auth.js"

// Endpoint (rota) para LISTAR todos os jogos
gameRoutes.get("/games", Auth.Authorization, gameController.getAllGames);

// Endpoint (rota) para LISTAR um jogo único
gameRoutes.get("/games/:id", Auth.Authorization, gameController.getOneGame);

// Endpoint (rota) para CADASTRAR um jogo
gameRoutes.post("/games", Auth.Authorization, gameController.createGame);

// Endpoint (rota) para DELETAR um jogo
gameRoutes.delete("/games/:id", Auth.Authorization, gameController.deleteGame);

// Endpoint (rota) para ALTERAR um jogo
gameRoutes.put("/games/:id", Auth.Authorization, gameController.updateGame);

export default gameRoutes;
