import React from "react";

function Tarefas({data}){
    return(
        <>
          <li className="tarefa-info">
            <div>
              <strong>{data.title}</strong>
              <div>
                x
              </div>
            </div>  
            <textarea defaultValue={data.tarefa}></textarea> 
            <span>!</span>
          </li>
        </>
    )
}

export default Tarefas