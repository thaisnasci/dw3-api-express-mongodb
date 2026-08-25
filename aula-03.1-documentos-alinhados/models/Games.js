// MODEL DE GAMES
// Importando o mongoose
import mongoose from "mongoose";

//SCHEMA para documento alinhado (descriptions)
const descriptionsSchema = new mongoose.Schema({
  genre: String,
  platform:String,
  rating:String
})

// Criando o schema de Games
const gameSchema = new mongoose.Schema({
  title: String,
  year: Number,
  price: Number,
  descriptions: descriptionsSchema
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
