const Tarefas = require('../models/TarefasDB');

module.exports = {
    
    //Retornar Tarefas
    async read(request, response){
        const tarefasList = await Tarefas.find();

        return response.json(tarefasList);
    },

    //Criar Tarefa
    async create(request, response){
        const {title, tarefa, conclusion, status} = request.body;

        if(!title || !tarefa){
            return response.status(400).json({error: "Preencher os campos de Titulo e de Tarefa"});
        }

        const tarefaCreated = await Tarefas.create({
            title, 
            tarefa,
            conclusion, 
            status
        });

        //return response.status(200).json({success: "Tarefa criada"});
        return response.status(200).json(tarefaCreated);
    },

    //Deletar Tarefa
    async delete(request, response){
        const{id} = request.params;

        const tarefaDeleted = await Tarefas.findOneAndDelete({
            _id: id
        });

        if(tarefaDeleted){
            return response.status(200).json({success:"Tarefa deletada"});
        }

        return response.status(401).json({error:'Tarefa não encontrada'});
    },

    //Modificar Tarefa
    async update(request, response){
        const{id} = request.params;
        const{title,tarefa} = request.body;

        const item = await Tarefas.findOne({_id: id});

        if(title){
            item.title = title;

            await item.save();
        }
        if(tarefa){
            item.tarefa = tarefa;

            await item.save();
        }

        return response.status(200).json(item);
    }
}