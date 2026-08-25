// Serviços de Games
// Aqui será inserido os métodos para Ler, cadastrar, Alterar e Excluir games

// Importando o Model
import Game from "../models/Games.js";

class gameService {
  // Serviço para ler os jogos
  async getAll() {
    // Tentativa da promessa (sucesso)
    try {
      //  o método .find() do mongoose busca registros
      const games = await Game.find();
      return games;
      // Caso ocorra um erro será executado o catch
    } catch (error) {
      console.log(error);
    }
  }
  //Metodo para cadastrar jogos
  async Create(title, year, plataform, price) {
    try {
      const newGame = new Game({
        title: title,
        year: year,
        platform: plataform,
        price,
        price,
      });
      //Aguardar a operação de cadastro
      await newGame.save(); //.save() é o metodo do mongosee para cadastrar
    } catch (error) {
      console.log(error);
    }
  }
  //Metódo para excluir o jogo
  async Delete(id) {
    try {
      await Game.findByIdAndDelete(id);
      //O metodo FindByIdandDelete() mongoose busca um registro pela Id e Deleta
      console.log(`Ò jogo com a id ${id} foi deletado.`);
    } catch (error) {
      console.log(error);
    }
  }

  //Metodo para alterar um jogo
  async Update(id, title, year, plataform, price) {
    try {
      await Game.findByIdAndUpdate(id, {
        title,
        year,
        plataform,
        price,
      });
      console.log(`O jogo com a id ${id} foi alterado.`);
    } catch (error) {
      console.log(error);
    }
  }

  //Metodo para listar um registro unico
  async getOne(id){
    try{
      const game = await Game.findOne({_id:id})
      return game
    }catch(error){
      console.log(error)
    }
  }

  //Encerra a classe
}
// Exportando a classe
export default new gameService();
