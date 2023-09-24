const Tarefas = require('../models/TarefasDB');

module.exports = {
    
    //Retornar Tarefas
    async read(request, response){
        const userId = request.params.userId;

        const tarefasList = await Tarefas.find({
            userId
        });

        return response.json(tarefasList);
    },

    //Criar Tarefa
    async create(request, response){
        const {title, description, conclusion, status, userId} = request.body;

        if(!title || !description || !conclusion){
            return response.status(400).json({error: "Preencher os campos de Titulo e de Tarefa"});
        }

        const tarefaCreated = await Tarefas.create({
            title, 
            description,
            conclusion, 
            status,
            userId
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
        const{title,description} = request.body;

        const item = await Tarefas.findOne({_id: id});

        if(title){
            item.title = title;

            await item.save();
        }
        if(description){
            //item.tarefa = tarefa;
            item.description = description;

            await item.save();
        }

        return response.status(200).json(item);
    }
}