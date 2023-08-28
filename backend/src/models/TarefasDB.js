const mongoose = require('mongoose');

const TarefaSchema = new mongoose.Schema({
    title: String,
    tarefa: String,
    status: Boolean
});

module.exports = mongoose.model('tarefas', TarefaSchema);