// Importar o Express
import express from "express";

// Importar o Model
import Game from "./models/Games.js";

// Importar as rotas
import gameRoutes from "./routes/gameRoutes.js";

// Importar conexão com MongoDB Atlas
import mongoose from "./config/db-connection.js";

// Carregando o Express
const app = express();

// Configurações do Express
app.use(express.json());

// Carregando as rotas
app.use("/", gameRoutes);

// Iniciando o servidor da API
const port = 4000;

app.listen(port, (error) => {

    if (error) {

        console.log("Ocorreu um erro ao iniciar a API!" + error);

    } else {

        console.log("API iniciada com sucesso na porta " + port);

    }

});