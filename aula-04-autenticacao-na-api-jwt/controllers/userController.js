// userController.js:
// Importando o Service
import userService from "../services/userService.js";
//importando o jsonwebtoken
import jwt from "jsonwebtoken";
//criando um segredo para o token
const JWTSecret = "apigamessecret";

// FUNÇÃO PARA CADASTRAR UM USUÁRIO
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await userService.Create(email, password);
    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    // Cod. 201: CREATED
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// FUNÇÃO PARA LOGAR UM USUÁRIO
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validar o email enviado
    if (email != undefined) {
      // Buscando o usuário pelo e-mail
      const user = await userService.getOne(email);
      //verificando se o usuáiro existe
      if (user != undefined) {
        //verificando se a senha está correta
        if (user.password == password) {
          // se a senha estiver correta, gera o token
          //gerando o token, o token pode ser sucesso ou erro
          jwt.sign(
            { id: user._id, email: user.email },
            JWTSecret,
            { expiresIn: "48h" },
            (error, token) => {
              //tratando o erro durante a geração do token
              if (error) {
                res
                  .status(400)
                  .json({
                    error: "Não foi possível gerar um token de autenticação.",
                  });
                //caso sucesso
              } else {
                res.status(200).json({ token });
              }
            },
          );
          //Caso Senha Incorreta
        } else {
          res.status(401)
            .json({ error: "Credenciais inválidas. Tente Novamente!" });
        }
        //caso o usuario nao seja encontrado
      } else {
        res.status(404).json({ error: "Usuario informado não existe" });
      }
      res.status(200).json({ message: "Usuário logado com sucesso!" });
      //caso email nao seja preenchido
    }else{
      res.status(400).json({ error: "O email enviado invalido!" });


    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
export default { createUser, loginUser };
