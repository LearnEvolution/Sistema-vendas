import express from "express";
import { registrar, login } from "../controllers/authController.js";

const router = express.Router();

// Endpoints padronizados em inglês no frontend, mas chamando funções corretas do backend
router.post("/register", registrar); // usado no frontend
router.post("/login", login);

export default router;
