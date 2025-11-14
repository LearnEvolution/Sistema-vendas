// src/routes/auth.js
import express from "express";
import { registrar, login } from "../controllers/authController.js";

const router = express.Router();

// Registrar novo usuário
router.post("/registrar", registrar);

// Login
router.post("/login", login);

export default router;
