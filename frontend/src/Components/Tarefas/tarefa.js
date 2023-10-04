import React, { useState, useRef } from "react";
import { AiTwotoneDelete, AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import api from '../../Services/api';
import moment from 'moment';

import './style.css';
import './style-status.css';

function Tarefas({data, handleDelete, handleChangeStatus}){
  // Estados para controlar as informações da tarefa e a edição
  const [changedTitle, setChangedTitle] = useState(data.title || '');
  const [changedTarefa, setChangedTarefa] = useState(data.description || '');
  const [changedCompletionDate, setChangedCompletionDate] = useState(
    formatCompletionDate(data.conclusion) || ''
  );

  // Referências para os elementos textarea de título e descrição
  const titleTextareaRef = useRef(null);
  const descriptionTextareaRef = useRef(null);

  // Função para lidar com a edição dos campos de texto
  async function handleEdit(e, status) {
    
      e.style.cursor = 'text';
      e.style.borderRadius = '5px';
      e.style.boxShadow = '0px 0px 1.5px 0px inset gray';
    
  }

  // Função para formatar a data de conclusão da tarefa
  function formatCompletionDate(date) {
    if (!date) return '';
    return moment(date).format('YYYY-MM-DD');
  }

  // Função para atualizar uma tarefa no servidor
  async function updateTask(dataToUpdate) {
    try {
      await api.patch(`tarefas/${data._id}`, dataToUpdate);
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  }

  // Função para salvar o título da tarefa editado
  async function handleSaveTitle(e, title){
    e.style.cursor = 'default';
    e.style.boxShadow = 'none';

    if(changedTitle && changedTitle !== title){
      await updateTask({ title: changedTitle });
    }
  }

  // Função para salvar a descrição da tarefa editada
  async function handleSaveDescription(e, tarefa){
    e.style.cursor = 'default';
    e.style.boxShadow = 'none';

    if(changedTarefa && changedTarefa !== tarefa){
      await updateTask({ description: changedTarefa });
    }
  }

  // Função para salvar a data de conclusão da tarefa editada
  async function handleSaveCompletionDate() {
    if (changedCompletionDate !== formatCompletionDate(data.conclusion)) {
      await updateTask({ conclusion: changedCompletionDate });
    }
  }

  // Função para marcar uma tarefa como concluída
  async function handleCompleteTask() {
    const currentDate = moment().format('YYYY-MM-DD');
    setChangedCompletionDate(currentDate);

    await handleChangeStatus(data._id) && updateTask({ conclusion: currentDate });
  }

  return(
    <>
      <li className={data.status === "Concluido"  ? "tarefa-info-status" : "tarefa-info"}>
        <div>
          {/* Campo de texto para o título */}
          <textarea 
            id="title"
            maxLength="30"
            defaultValue={data.title}
            disabled={data.status === "Concluido" ? true : false}
            onClick={e => handleEdit(e.target, data.status)}
            onChange={e => setChangedTitle(e.target.value)}
            onBlur={e => handleSaveTitle(e.target, data.description)}
          />
            
          <div>
            <AiTwotoneDelete 
              size='20'
              onClick={() => handleDelete(data._id)}
            />
          </div>
        </div>  

        {/* Campo de texto para a descrição */}
        <textarea 
          id="description"
          defaultValue={data.description}
          disabled={data.status === "Concluido" ? true : false}
          onClick={e => handleEdit(e.target, data.status)}
          onChange={e => setChangedTarefa(e.target.value)}
          onBlur={e => handleSaveDescription(e.target, data.description)}
        />
        <div className="conclusion">
          <label htmlFor="date">Data de Conclusão</label>
          {/* Campo de entrada de data */}
          <input
            type="date"
            min={changedCompletionDate}
            value={changedCompletionDate}
            disabled={data.status === "Concluido" ? true : false}
            onChange={(e) => setChangedCompletionDate(e.target.value)}
            onBlur={handleSaveCompletionDate}
          />
          {/* Botões para completar e descompletar a tarefa */}
          {data.status === "Concluido" ? (
            <span>
              <AiOutlineCloseCircle 
                size='23'
                onClick={() => handleCompleteTask()}
              />
            </span>
          ) : (
            <span>
              <AiOutlineCheckCircle 
                size='23'
                onClick={() => handleCompleteTask()}
              />
            </span>
          )}
        </div>
      </li>
    </>
  )
}

export default Tarefas