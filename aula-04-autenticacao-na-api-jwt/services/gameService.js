// Serviços de Games
// Aqui será inserido os métodos para Ler, Cadastrar, Alterar e Excluir games

// Importando o Model
import Game from "../models/Games.js";

class gameService {
  // Serviço para ler os jogos
  async getAll() {
    // Tentativa da promessa (sucesso)
    try {
      // O metodo .find() -> Buscar Registros
      const games = await Game.find();
      return games;
      // Caso ocorra um erro será executado o catch
    } catch (error) {
      console.log(error);
    }
  }

  // Método para cadastrar jogos
  async Create(title, year, price, descriptions) {
    try {
      // Enviando os dados a sere cadastrados para o Model
      const newGame = new Game({
        // title: title,
        // year: year,
        // platform: platform,
        // price: price
        title,
        year,
        price,
        descriptions,
      });
      // Aguardar a operação de cadastro
      await newGame.save(); // .save() -> É o método de mongoose para cadastrar
    } catch (error) {
      console.log(error);
    }
  }

  // Métodos para EXCLUIR o jogo
  async Delete(id) {
    try {
      // findByIdAndDelete() -> O mongoose busca um registro pela ID e deleta
      await Game.findByIdAndDelete(id);
      console.log(`O jogo com a id ${id} foi deletado.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Método para ALTERAR um jogo
  async Update(id, title, year, price, descriptions) {
    try {
      await Game.findByIdAndUpdate(id, {
        title,
        year,
        price,
        descriptions,
      });
      console.log(`O jogo com a id ${id} foi alterado.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Método para LISTAR um REGISTRO ÚNICO
  async getOne(id) {
    try {
      const game = await Game.findOne({ _id: id });
      // findOne -> Método do Mongoose para selecionar um registro único
      return game;
    } catch (error) {
      console.log(error);
    }
  }
}

// Exportando a classe
export default new gameService();
