// MIDDLEWARE de Autenticação
import jwt from "jsonwebtoken";
import userController from "../controllers/userController.js";

// Função que irá verificar se o usuário possui um token válido
const Authorization = (req, res, next) => {
  const authToken = req.headers["authorization"];
  // se o token não for vazio
  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    // Capturando somente o token
    const token = bearer[1];
    // Validando o token o com o JWT
    jwt.verify(token, userController.JWTSecret, (error, data) => {
      // Se o token for inválido
      if (error) {
        res.status(401).json({ error: "Token inválido" });
      } else {
        // Se o token for válido
        req.token = token;
        req.loggedUser = {
          id: data.id,
          email: data.email,
        };
        // Permite prosseguir com a requisição
        next();
      }
    });
  } else {
    // Se token estiver vazio
    res.status(401).json({ error: "Token não informado." });
  }
};

export default { Authorization };
