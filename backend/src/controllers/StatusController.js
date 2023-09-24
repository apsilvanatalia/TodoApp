const Tarefas = require('../models/TarefasDB');

module.exports = {

    //Verificar status
    async read(request, response){
        const query = request.query;

        const statusTarefas = await Tarefas.find(query);

        return response.json(statusTarefas);
    },

    //Alterar status
    async update(request, response){
        const {id} = request.params;
        
        const tarefa = await Tarefas.findOne({ _id: id});

        if(tarefa.status == "Concluido"){
            tarefa.status = "Pendente";
        }else{
            tarefa.status = "Concluido";
        }

        await tarefa.save();

        return response.status(200).json({message:"Status Alterado"});
    }
}