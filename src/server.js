// src/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import clientesRouter from "./routes/clientes.js";
import produtosRouter from "./routes/produtos.js";

// Carregar variáveis do .env
dotenv.config();

const app = express();

// CORS liberado
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));

// Middleware JSON
app.use(express.json());

// Rotas de autenticação (registro + login)
app.use("/auth", authRoutes);

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado!"))
  .catch(err => console.error("❌ Erro ao conectar MongoDB:", err));

// Rota raiz
app.get("/", (req, res) => {
  res.json({ message: "🚀 API Sistema de Vendas online!" });
});

// Rotas dos outros módulos
app.use("/clientes", clientesRouter);
app.use("/produtos", produtosRouter);

// Erro 404
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
