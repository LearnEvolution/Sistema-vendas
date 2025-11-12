import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Configura caminho para .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

app.use(cors());
app.use(express.json());

// Importa as rotas
import clientesRoutes from "./routes/clientes.js";
import produtosRoutes from "./routes/produtos.js";
app.use("/produtos", produtosRoutes);
app.use("/clientes", clientesRoutes);


// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.error("Erro ao conectar:", err));

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
