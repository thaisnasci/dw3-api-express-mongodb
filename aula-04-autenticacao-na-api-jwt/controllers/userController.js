// userController.js:
// Importando o Service
import userService from "../services/userService.js";

// FUNÇÃO PARA CADASTRAR UM USUÁRIO
const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        await userService.Create(email, password);
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        // Cod. 201: CREATED
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

// FUNÇÃO PARA LOGAR UM USUÁRIO
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Buscando o usuário pelo e-mail
        const user = await userService.getOne(email)
        res.status(200).json({ message: 'Usuário logado com sucesso!' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro interno do servidor.' })
    }
}
export default { createUser, loginUser }