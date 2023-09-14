import React, {useState} from "react";
import {AiTwotoneDelete, AiOutlineCheckCircle} from "react-icons/ai";
import api from '../../Services/api'

import './style.css'
import './style-status.css'

function Tarefas({data, handleDelete, handleChangeStatus}){
  //const [changedTitle, setChangedTitle] = useState('');
  const [changedTarefa, setChangedTarefa] = useState('');

  function handleEdit(e, status){
    e.style.cursor = 'text';
    e.style.borderRadius = '5px';
    e.style.boxShadow = '0px 0px 1.5px 0px inset gray';
    
  }

  /*async function handleSaveTitle(e, title){
    if(changedTitle && changedTitle !== title){
      await api.patch(`tarefas/${data._id}`,{
        title: changedTitle,
      });
    }
  }*/

  async function handleSaveTarefa(e, tarefa){
    e.style.cursor = 'default';
    e.style.boxShadow = 'none';

    if(changedTarefa && changedTarefa !== tarefa){
      await api.patch(`tarefas/${data._id}`,{
        description: changedTarefa,
      });
    }
  }

  return(
    <>
      <li className={data.status == "Concluido"  ? "tarefa-info-status" : "tarefa-info"}>
        <div>
          <strong>
            {data.title}
          </strong>
            
          <div>
            <AiTwotoneDelete 
              size='20'
              onClick={() => handleDelete(data._id)}
            />
          </div>
        </div>  

        <textarea 
          defaultValue={data.description}
          disabled={data.status == "Concluido" ? true : false}
          onClick={e => handleEdit(e.target, data.status)}
          onChange={e => setChangedTarefa(e.target.value)}
          onBlur={e => handleSaveTarefa(e.target, data.description)}
        />
        
        <span>
          <AiOutlineCheckCircle 
            size='23'
            onClick={() => handleChangeStatus(data._id)}
          />
        </span>
      </li>
    </>
  )
}

export default Tarefas