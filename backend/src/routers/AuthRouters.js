const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");

const dotenv = require('dotenv');
dotenv.config();

const AuthController = require('../controllers/AuthController');

// Middleware para verificar o token antes de permitir acesso às rotas protegidas
function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;
  
    jwt.verify(token, secret);
  
    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
}

  // Rota para autenticar o usuário (login)
  routes.post("/auth/login", AuthController.login);
  
  // Rota para verificar o usuário com base em seu ID (rota protegida com autenticação de token)
  routes.get("/auth/userCheck/:id", checkToken, AuthController.userCheck);
  
  // Rota para registrar um novo usuário
  routes.post("/auth/register", AuthController.register);
  
  // Rota comentada (não utilizada)
  // routes.get("/auth/listUser/:username", AuthController.listUser);
  
  module.exports = routes;