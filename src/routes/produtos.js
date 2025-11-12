import express from "express";
import Produto from "../models/Produto.js";

const router = express.Router();

// Listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

// Adicionar novo produto
router.post("/", async (req, res) => {
  try {
    const novoProduto = new Produto(req.body);
    await novoProduto.save();
    res.json({ mensagem: "Produto cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao cadastrar produto:", err);
    res.status(500).json({ erro: "Erro ao cadastrar produto" });
  }
});

export default router;
