import mongoose from "mongoose";

const userShema = new mongoose.Schema({
  email: String,
  password: String,
});
//Iniciando o model
const User = mongoose.model("User", userShema);
export default User;
