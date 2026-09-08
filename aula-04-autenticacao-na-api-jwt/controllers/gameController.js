// Controller de Games
// O controller tratará as requisições do cliente
// Importando o service
import gameService from "../services/gameService.js";

// Importando o ObjectID do MongoDB
import { ObjectId } from "mongodb";

// Função que irá tratar a requisição para LISTAR os jogos
const getAllGames = async (req, res) => {
  try {
    const games = await gameService.getAll();
    res.status(200).json({ games: games });
    // Código 200 - OK -> Requisição feita com sucesso
  } catch (error) {
    console.log(error);
    // Tratando a resposta que api irá enviar em caso de erro
    res.status(500).json({
      error: "Ocorreu um erro ao listar os jogos. Erro interno do servidor",
    });
  }
};

// Função que irá tratar a requesição para Cadastrar os jogos
const createGame = async (req, res) => {
  try {
    // const title = req.body.title
    // Coletando os dados enviados (Formularios, da requisições, etc) e gravando nas variáveis
    const { title, year, price, descriptions } = req.body;

    // Enviando dados para o Service cadastrar
    await gameService.Create(title, year, price, descriptions);
    res.status(201).json({ message: "Jogo cadastrado com sucesso!" });
    // Cod. 201 (Created) -> Recurso criado com sucesso no servidor
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor!" });
  }
};

// Função que trata a requesição para EXCLUIR um jogo
const deleteGame = async (req, res) => {
  try {
    const id = req.params.id;

    // Fazendo a validação do ObjectID
    if (ObjectId.isValid(id)) {
      await gameService.Delete(id);
      res.sendStatus(204);
      // Cod. 204 - No content -> Requisição bem sucedida, porém não há conteúdo para retornar
    } else {
      res.status(400).json({ error: "Requisição mal formada, ID inválido." });
      // Cod. 400 - BAD REQUEST
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função que trata a requisição  para ALTERAR um jogo
const updateGame = async (req, res) => {
  try {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
      // Coletando os dados que serão alterados
      const { title, year, price, descriptions } = req.body;

      await gameService.Update(id, title, year, price, descriptions);
      res.status(200).json({ message: "Jogo atualizado com sucesso." });
    } else {
      res.status(400).json({ error: "Requisição mal formada, ID inválido." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Função que trata a requisição para LISTAR um jogo ÚNICO
const getOneGame = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const game = await gameService.getOne(id);
      // Verificando se houve retorno na busca
      if (!game) {
        res.status(404).json({ error: "Jogo não encontrado." });
        // Cod. 404 - NOT FOUND
      } else {
        res.status(200).json({ game });
      }
      // Se o ID não for válido
    } else {
      res.status(400).json({ error: "O ID informado é inválido" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// Exportando as funções
export default { getAllGames, createGame, deleteGame, updateGame, getOneGame };
