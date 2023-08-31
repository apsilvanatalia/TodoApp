import React, {useState, useEffect} from "react";

import './global.css'
import './sidebar.css'
import './app.css'
import './main.css'
import Notes from './Components/Tarefas/tarefa'
import api from "./Components/services/api";

function App() {
  
  const [title, setTitles] = useState('');
  const [tarefa, setTarefas] = useState('');
  const [allTarefas, setAllTarefas] = useState([]);

  useEffect(()=>{
    async function getTarefas(){
      const response = await api.get('/tarefas',);

      setAllTarefas(response.data);
    }

    getTarefas();

  },[setAllTarefas]);

  /*const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const response = await api.post('/tarefas', {
        title,
        tarefa,
        status:false
      });
      setAllTarefas(prev =>[...prev,response.data]);
      setTitles('');
      setTarefas('');
    }catch(err){
      console.log(err);
    }
    

    setTitles('');
    setTarefas('');

    setAllTarefas([...allTarefas, response.data]);
  }*/

  /*
  useEffect(()=>{
    const getTarefas = async()=>{
      try{
        const response = await api.get('/tarefas',);
        setAllTarefas(response.data);
      }catch(err){
        console.log(err);
      }
    }

    getTarefas();

  },[]);*/

  async function handleSubmit(e){
    e.preventDefault();

    const response = await api.post('/tarefas', {
      title,
      tarefa,
      status:false
    });

    setTitles('');
    setTarefas('');

    setAllTarefas([...allTarefas, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Tarefa</strong>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title">Titulo da Tarefa</label>
            <input 
              require 
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

          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {allTarefas.map(data =>(
            <Notes data={data}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
