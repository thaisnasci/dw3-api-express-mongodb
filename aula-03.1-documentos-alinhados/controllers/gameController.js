// Controller de games
// O controller tratará as requisições do cliente
// Importando o service
import gameService from "../services/gameService.js";
//Importando o object id do mongodb
import { ObjectId } from "mongodb";

// Função que irá tratar a requisição para LISTAR os jogos
const getAllGames = async (req, res) => {
  try {
    const games = await gameService.getAll();
    res.status(200).json({ games: games });
    // Cod. 200 - OK - Requisição feita com sucesso
  } catch (error) {
    console.log(error);
    // Tratando a resposta que api irá enviar em caso de erro
    res.status(500).json({
      error: "Ocorreu um erro ao listar os jogos. Erro interno do servidor.",
    });
  }
};
//Função que irá tratar a requisição para cadastrar os jogos
const createGame = async (req, res) => {
  try {
    //const title = req.body.title
    const { title, year, price, descriptions } = req.body;
    await gameService.Create(title, year, price, descriptions);
    res.status(201).json({ message: "Jogo cadastrado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error interno do servidor." });
  }
};
//funcao que trata a requisicao para Excluir um jogo
const deleteGame = async (req, res) => {
  try {
    //coletando a id
    const id = req.params.id;
    //Fazendo a validacao do objectId
    if (ObjectId.isValid(id)) {
      await gameService.Delete(id);
      res.sendStatus(204);
      //Cod.204(NO CONTENT):requisicao bem sucedida,porem nao tem conteudo para retornar
    } else {
      res.status(400).json({ error: "Requisição mal-formada, ID inválido." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno no servidor" });
  }
};
//funcao que trata as requisiscoes de alteracoes do jogo

const updateGame = async (req, res) => {
  try {
    const id = req.params.id;

    if (ObjectId.isValid(id)) {
      const { title, year, price, descriptions } = req.body;
      await gameService.Update(id, title, year, price, descriptions);
      res.status(200).json({ message: "Jogo alterado com sucesso" });
    } else {
      res.status(400).json({
        error: "Requisição mal-formada, ID inválido.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno no servidor" });
  }
};
//funcao que trata a requisicao para LISTAR um jogo unico
const getOneGame = async (req, res) => {
  try {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
      const game = await gameService.getOne(id);
      if (!game) {
        res.status(404).json({ error: "Jogo nao encontrado" });
      } else {
        res.status(200).json({ game });
      }
      //se o id nao for valido
    } else {
      res.status(400).json({ error: "O ID informado é inválido." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
// Exportando as funções
export default { getAllGames, createGame, deleteGame, updateGame, getOneGame};
 