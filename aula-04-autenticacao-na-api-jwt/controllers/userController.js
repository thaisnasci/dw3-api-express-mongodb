// Importando o Service
import userService from "../services/userService.js";

// Importando o JSONWEBTOKEN
import jwt from "jsonwebtoken";

// Criando um segredo para o TOKEN
const JWTSecret = "apigamessecret";

// Função para CADASTRAR um usuário
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await userService.Create(email, password);
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função para LOGAR um usuário
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validar o email enviado
    if (email != undefined) {
      // Buscando o usuário pelo e-mail
      const user = await userService.getOne(email);
      // Verificando se o Usuário existe
      if (user != undefined) {
        // Verificando se a senha está correta
        if (user.password == password) {
          // Se a senha estiver correta, gera o TOKEN
          jwt.sign(
            { id: user._id, email: user.email },
            JWTSecret,
            { expiresIn: "48h" },
            (error, token) => {
              // Tratando o erro durante a geração do token
              if (error) {
                res.status(400).json({
                  error: "Não foi possível gerar o token de autenticação.",
                });
              } else {
                // Caso sucesso
                res.status(200).json({ token });
              }
            },
          );
        } else {
          // Caso SENHA Incorreta
          res.status(401).json({ error: "Credenciais inválidas. Tente novamente!" });
          // Cod. 401 (Unauthorized) -> Não autorizado
        }
      } else {
        res.status(404).json({ error: "O usuário informado não existe." });
        //  Cod. 404 (NOT FOUND)
      }
    } else {
      // Caso o e-mail não preenchido
      res.status(400).json({ error: "O e-mail enviado é inválido." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
export default { createUser, loginUser, JWTSecret };
