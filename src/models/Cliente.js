import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: String,
  telefone: String,
  dataCadastro: { type: Date, default: Date.now }
});

export default mongoose.model("Cliente", clienteSchema);
