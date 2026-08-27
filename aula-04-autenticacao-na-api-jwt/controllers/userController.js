import userService from "../services/userService.js";

// Função para cadastrar o usuário
const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    await userService.Create(email, password);

    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Erro interno do servidor.",
    });
  }
};
// funcao para logar o usuario
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getOne(email);
    res.status(200).json({ message: "Usuário logado com sucesso!" });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Erro interno do servidor.",
    });
  }
};

export default { createUser, loginUser };
