const moment = require('moment');
const Tarefas = require('../models/TarefasDB');

module.exports = {
    
    // Rota para retornar todas as tarefas de um usuário
    async read(request, response){
        const userId = request.params.userId;

        const tarefasList = await Tarefas.find({
            userId
        });

        return response.json(tarefasList);
    },

    // Rota para criar uma nova tarefa
    async create(request, response){
        try {
            const {title, description, conclusion, status, userId} = request.body;

            if(!title || !description || !conclusion){
                return response.status(400).json({error: "Preencher os campos de título, tarefa e data de conclusão."});
            }

            // Use o Moment.js para analisar a data de conclusão
            const momentDate = moment(conclusion, 'YYYY-MM-DD');

            if (momentDate.isValid()) {
                const tarefaCreated = await Tarefas.create({
                    title, 
                    description,
                    conclusion: momentDate.toDate(), // Converta a data para objeto Date antes de armazenar no banco de dados, 
                    status,
                    userId
                });
                return response.status(200).json(tarefaCreated);
            }else{
                return response.status(400).json({ error: 'Data de conclusão inválida' });
            }
        } catch (error) {
            return response.status(500).json({error: "Não foi possível criar tarefa. Tente novamente."});
        }
    },

    // Rota para deletar uma tarefa
    async delete(request, response){
        try {
            const{id} = request.params;

            // Procura e deleta a tarefa com base no ID
            const tarefaDeleted = await Tarefas.findOneAndDelete({
                _id: id
            });

            if(tarefaDeleted){
                return response.status(200).json({success:"Tarefa excluida com sucesso."});
            }

            return response.status(401).json({error:'Tarefa não encontrada.'});
        } catch (error) {
            return response.status(500).json({error: "Erro ao excluir tarefa. Tente novamente."});
        }  
    },

    // Rota para modificar uma tarefa
    async update(request, response){
        const{id} = request.params;
        const{title, description, conclusion} = request.body;
        try {
            const item = await Tarefas.findById(id);
            
            if (!item) {
                return response.status(404).json({ error: 'Tarefa não encontrada' });
            }

            if (title) {
                item.title = title;
            }
            if (description) {
                item.description = description;
            }
            if (conclusion) {
                // Use o Moment.js para analisar a data de conclusão
                const momentDate = moment(conclusion, 'YYYY-MM-DD');
                if (momentDate.isValid()) {
                    item.conclusion = momentDate.toDate();
                } else {
                    return response.status(400).json({ error: 'Data de conclusão inválida' });
                }
            }

            await item.save();

            // Use o Moment.js para formatar a data antes de retorná-la
            item.conclusion = moment(item.conclusion).format('YYYY-MM-DD');

            return response.status(200).json(item);
        } catch (error) {
            return response.status(500).json({ error: "Erro ao atualizar a tarefa" });
        }
    },

    // Rota para buscar tarefas próximas à conclusão para um usuário específico
    async nearCompletionTasks(request, response) {
        try {
            const userId = request.params.userId;
            const currentDate = moment().startOf('day'); // Obtém o início do dia atual
    
            // Consulta tarefas agendadas para hoje para o usuário
            const tarefasHoje = await Tarefas.find({
                userId,
                conclusion: {
                    $gte: currentDate.toDate(),
                    $lt: moment(currentDate).endOf('day').toDate() // Fim do dia atual
                },
                status: { $ne: 'Concluido' } // Status diferente de 'Concluída'
            }, 'title conclusion status');
    
            if (tarefasHoje.length === 0) {
                return response.json({ message: "Nenhuma tarefa agendada para hoje encontrada para este usuário." });
            }
    
            return response.json(tarefasHoje);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao buscar tarefas agendadas para hoje." });
        }
    }
}