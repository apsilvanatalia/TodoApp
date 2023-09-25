const Task = require('../models/TarefasDB');

module.exports = {
    async read(request, response){
        const userId = request.params.userId;

        try {
            // Consulta para contar tarefas concluídas e pendentes de um usuário específico
            const tasksCount = await Task.aggregate([
                { $match: { 
                    userId: userId } }, // Filtra tarefas por userId
                { $group: {
                    _id: "$status", // Agrupa por status
                    count: { $sum: 1 } // Conta o número de tarefas em cada grupo
                }}
            ]);

            const responseArray = tasksCount.map((result) => ({
                name: result._id === "Concluida" ? "Concluida(s)" : "Pendente(s)",
                value: result.count
            }));

            response.json(responseArray);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
            response.status(500).json({ msg: "Erro interno do servidor" });
        }
    },

    async porPeriodo(request, response){
        const { userId } = request.params;
        
        try {
          // Encontre todas as tarefas do usuário com datas de conclusão em 2023
          const tasks = await Task.find({
            userId,
            conclusion: {
              $gte: new Date("2023-01-01T00:00:00.000Z"),
              $lte: new Date("2023-12-31T23:59:59.999Z")
            }
          });
        
          // Crie um objeto para armazenar as informações por mês
          const monthlyTasks = {};
        
          // Defina um array de nomes de meses
          const monthNames = [
            "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
            "Jul", "Ago", "Set", "Out", "Nov", "Dez"
          ];
        
          // Preencha o objeto monthlyTasks com todos os meses de 2023
          for (let month = 0; month < 12; month++) {
            const monthYearKey = `${month + 1}`.padStart(2, '0'); // Formato "MM"
            monthlyTasks[monthYearKey] = {
              mes: monthNames[month],
              pendente: 0,
              concluida: 0
            };
          }
        
          // Atualize o objeto com as tarefas encontradas
          tasks.forEach(task => {
            const taskMonth = task.conclusion.getMonth() + 1; // Mês começa em 0 (janeiro)
            const monthYearKey = `${taskMonth}`.padStart(2, '0'); // Formato "MM"
            if (task.status === 'Pendente') {
              monthlyTasks[monthYearKey].pendente++;
            } else if (task.status === 'Concluida') {
              monthlyTasks[monthYearKey].concluida++;
            }
          });
        
          // Converta o objeto em um array
          const monthlyTasksArray = Object.values(monthlyTasks);
        
          // Ordene o array por ordem cronológica
          monthlyTasksArray.sort((a, b) => {
            const monthA = monthNames.indexOf(a.mes);
            const monthB = monthNames.indexOf(b.mes);
            return monthA - monthB;
          });
        
          response.status(200).json(monthlyTasksArray);
        } catch (error) {
          response.status(500).json({ msg: error });
        }
          
    }
}