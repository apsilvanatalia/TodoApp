const express = require('express');
const routes = express.Router();

const TarefasController = require('../controllers/TarefasController');
const StatusControle = require('../controllers/StatusController');

//Retornar Tarefas
routes.get('/tarefas/:userId', TarefasController.read);

//Criar Tarefa
routes.post('/tarefas', TarefasController.create);

//Deletar Tarefa
routes.delete('/tarefas/:id', TarefasController.delete);

//Modificar Conteudo
routes.patch('/tarefas/:id', TarefasController.update);

//Verificar Status
routes.get('/status', StatusControle.read);

//Modificar Status
routes.patch('/status/:id', StatusControle.update);

module.exports = routes;