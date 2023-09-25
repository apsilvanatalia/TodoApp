const express = require('express');
const routes = express.Router();

const DashboardController = require('../controllers/DashboardController');

// Consulta para contar tarefas concluídas e pendentes de um usuário específico
routes.get("/tasks/user/:userId", DashboardController.read);

routes.get("/tasks/months/:userId", DashboardController.porPeriodo);

module.exports = routes;
  