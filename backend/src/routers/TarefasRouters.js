const express = require('express');
const routes = express.Router();

const TarefasController = require('../controllers/TarefasController');
const StatusControle = require('../controllers/StatusController');

// Rota para retornar todas as tarefas de um usuário específico
routes.get('/tarefas/:userId', TarefasController.read);

// Rota para criar uma nova tarefa
routes.post('/tarefas', TarefasController.create);

// Rota para deletar uma tarefa por ID
routes.delete('/tarefas/:id', TarefasController.delete);

// Rota para modificar o conteúdo de uma tarefa por ID
routes.patch('/tarefas/:id', TarefasController.update);

// Rota para verificar tarefas próximas à data de conclusão para um usuário específico
routes.get('/tarefas/nearCompletion/:userId', TarefasController.nearCompletionTasks);

// Rota para verificar status de tarefas
routes.get('/status', StatusControle.read);

// Rota para modificar o status de uma tarefa por ID
routes.patch('/status/:id', StatusControle.update);

module.exports = routes;