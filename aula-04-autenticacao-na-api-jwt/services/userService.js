// Importando o Model
import User from "../models/User.js";

class userService {
  async Create(email, password) {
    try {
      const newUser = new User({
        email: email,
        password: password,
      });
      await newUser.save();
    } catch (error) {
      console.log(error);
    }
  }
  // Método para LISTAR um usuário
  async getOne(email) {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new userService();
