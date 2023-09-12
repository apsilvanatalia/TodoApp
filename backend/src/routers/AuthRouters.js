const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");

const dotenv = require('dotenv');
dotenv.config();

const AuthController = require('../controllers/AuthController');

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

routes.post("/auth/login", AuthController.login);
routes.get("/auth/userCheck/:id", checkToken, AuthController.userCheck);
routes.post("/auth/register", AuthController.register);
//routes.get("/auth/listUser/:username", AuthController.listUser);

module.exports = routes;