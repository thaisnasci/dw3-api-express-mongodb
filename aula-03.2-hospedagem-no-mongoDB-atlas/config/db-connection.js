import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = () => {

    mongoose.connect(process.env.MONGO_URI);

    const connection = mongoose.connection;

    connection.on("error", () => {
        console.log("Erro ao conectar com o MongoDB.");
    });

    connection.on("open", () => {
        console.log("Conectado ao MongoDB com sucesso!");
    });
};

connect();

export default mongoose;