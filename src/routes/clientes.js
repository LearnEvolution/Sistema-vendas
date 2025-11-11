import express from "express";
import Cliente from "../models/Cliente.js";

const router = express.Router();

// Rota para listar todos os clientes
router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    console.error("Erro ao buscar clientes:", err);
    res.status(500).json({ erro: "Erro ao buscar clientes" });
  }
});

// Rota para adicionar cliente
router.post("/", async (req, res) => {
  try {
    const novoCliente = new Cliente(req.body);
    await novoCliente.save();
    res.json({ mensagem: "Cliente cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao cadastrar cliente:", err);
    res.status(500).json({ erro: "Erro ao cadastrar cliente" });
  }
});

export default router;
