const Tarefas = require('../models/TarefasDB');

module.exports = {

    //Verificar status
    async read(request, response){
        const status = request.query;

        const statusTarefas = await Tarefas.find(status);

        return response.json(statusTarefas);
    },

    //Alterar status
    async update(request, response){
        const {id} = request.params;
        
        const tarefa = await Tarefas.findOne({ _id: id});

        if(tarefa.status){
            tarefa.status = false;
        }else{
            tarefa.status = true;
        }

        await tarefa.save();

        return response.status(200).json({message:"Status Alterado"});
    }
}