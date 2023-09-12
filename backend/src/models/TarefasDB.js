const mongoose = require('mongoose');

/*const TarefaSchema = new mongoose.Schema({
    title: String,
    tarefa: String,
    start: Date,
    conclusion: Date,
    status: Boolean,
    userId: String
});*/

const TarefaSchema = new mongoose.Schema({
    title: String,
    description: String,
    conclusion: Date,
    status: String,
    userId: String,
});

//module.exports = mongoose.model('tarefas', TarefaSchema);
module.exports = mongoose.model('tasks', TarefaSchema);