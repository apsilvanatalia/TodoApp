import React, {useState, useEffect} from "react";

import Notes from './Components/Tarefas/tarefa'
import api from "./Services/api";
import FilterRadioButton from "./Components/Filter/filter-radio-button";

import './global.css'
import './sidebar.css'
import './app.css'
import './main.css'

function App() {
  
  const [title, setTitles] = useState('');
  const [tarefa, setTarefas] = useState('');
  const [allTarefas, setAllTarefas] = useState([]);
  const [selectValue, setSelectValue] = useState('all');

  useEffect(()=>{
    getTarefas();

  },[]);

  async function getTarefas(){
    const response = await api.get('/tarefas',);

    setAllTarefas(response.data);
  }

  async function loadTarefas(option){
    const params = {status: option};
    const response = await api.get('/status', {params});

    if (response){
      setAllTarefas(response.data);
    }
  }

  function handleFilter(e){
    setSelectValue(e.value);

    if(e.checked && e.value !== 'all'){
      loadTarefas(e.value);
    }else{
      getTarefas();
    }
  }

  async function handleDelete(id){
    const deletedTarefa = await api.delete(`/tarefas/${id}`);

    if(deletedTarefa){
      setAllTarefas(allTarefas.filter(tarefa => tarefa._id !== id));
    }
  }

  async function handleChangeStatus(id){
    const changedStatus = await api.patch(`/status/${id}`);

    if(changedStatus && selectValue !== 'all'){
      loadTarefas(selectValue);
    }else if(changedStatus){
      getTarefas();
    }
  }

  async function handleSubmit(e){
    e.preventDefault();

    const response = await api.post('/tarefas', {
      title,
      tarefa,
      status:false
    });

    setTitles('');
    setTarefas('');
    
    if(selectValue !== 'all'){
      getTarefas();
      setSelectValue('all');
    }else{
      setAllTarefas([...allTarefas, response.data]);
    }
    
  }

  useEffect(()=>{
    function enableSubmitButton(){
      let btn = document.getElementById('bnt-submit-form');
      btn.style.background = '#ffd3ca';
      if(title && tarefa){
        btn.style.background = '#eb8f7a';
      }
    }
    enableSubmitButton();
  },[title,tarefa]);

  return (
    <div id="app">
      <aside>
        <strong>Tarefa</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title">Titulo da Tarefa</label>
            <input 
              require
              maxLength="30"
              value={title}
              onChange={e => setTitles(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="tarefa">Tarefa</label>
            <textarea
              require
              value={tarefa}
              onChange={e => setTarefas(e.target.value)}
            />
          </div>

          <button id="bnt-submit-form" type="submit">Salvar</button>
        </form>
        <FilterRadioButton
          selectValue={selectValue}
          handleFilter={handleFilter}
        />
      </aside>
      <main>
        <ul>
          {allTarefas.map(data =>(
            <Notes 
              key={data._id}
              data={data}
              handleDelete={handleDelete}
              handleChangeStatus={handleChangeStatus}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
