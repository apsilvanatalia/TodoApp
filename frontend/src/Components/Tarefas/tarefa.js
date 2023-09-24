import React, {useState} from "react";
import {AiTwotoneDelete, AiOutlineCheckCircle} from "react-icons/ai";
import api from '../../Services/api'

import './style.css'
import './style-status.css'

function Tarefas({data, handleDelete, handleChangeStatus}){
  const [changedTitle, setChangedTitle] = useState('');
  const [changedTarefa, setChangedTarefa] = useState('');

  function handleEdit(e){
    e.style.cursor = 'text';
    e.style.borderRadius = '5px';
    e.style.boxShadow = '0px 0px 1.5px 0px inset gray';
  }

  async function handleSaveTitle(e, title){
    e.style.cursor = 'default';
    e.style.boxShadow = 'none';

    if(changedTitle && changedTitle !== title){
      await api.patch(`tarefas/${data._id}`,{
        title: changedTitle,
      });
    }
  }

  async function handleSaveDescription(e, tarefa){
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
      <li className={data.status === "Concluido"  ? "tarefa-info-status" : "tarefa-info"}>
        <div>
          {/*<strong onClick={e => handleEdit(e.target)}>
            {data.title}
          </strong>*/}

          <textarea id="title"
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

        <textarea id="description"
          defaultValue={data.description}
          disabled={data.status === "Concluido" ? true : false}
          onClick={e => handleEdit(e.target, data.status)}
          onChange={e => setChangedTarefa(e.target.value)}
          onBlur={e => handleSaveDescription(e.target, data.description)}
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