// src/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Configuração do caminho para o .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(express.json());

// 🔥 Permitir acesso da Vercel e localhost (para testes)
app.use(
  cors({
    origin: [
      "https://sistema-vendas-react.vercel.app", // Frontend hospedado
      "http://localhost:5173", // Ambiente local do Vite
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Importa rotas
import clientesRoutes from "./routes/clientes.js";
import produtosRoutes from "./routes/produtos.js";
app.use("/clientes", clientesRoutes);
app.use("/produtos", produtosRoutes);

// Conexão com o MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
