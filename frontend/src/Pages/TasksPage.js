import React, { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Notes from '../Components/Tarefas/tarefa';
import Menu from '../Components/Menu/menu';
import api from "../Services/api";
import FilterRadioButton from "../Components/Filter/filter-radio-button";
import EndDatePicker from "../Components/DatePicker/date-picker";
import showToast from '../Components/Toast/Toast'
import {msgCreateSucess,msgDeletedSucess,msgCreateError} from '../Components/Toast/messages'

import './global.css'
import './sidebar.css'
import './tasks.css'
import './main.css'
import '../Components/DatePicker/style.css'

function Tasks() {

  const [title, setTitles] = useState('');
  const [description, setTarefas] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [allTarefas, setAllTarefas] = useState([]);
  const [selectValue, setSelectValue] = useState('all');
  const userId = localStorage.getItem("userId");

  var today = new Date().toISOString().split('T')[0];

  //const msgCreateSucess = 'Tarefa adicionada com sucesso.';
  //const msgDeletedSucess = 'Tarefa excluida com sucesso.';
  const messageWarn = 'Não foi possível criar tarefa. Tente novamente.';
  const messageError = 'Não foi possível criar tarefa. Tente novamente.';

  useEffect(() => {
    getTarefas();
    today = new Date().toISOString().split('T')[0];
    
  }, []);

  async function getTarefas() {
    const response = await api.get(`/tarefas/${userId}`,);

    setAllTarefas(response.data);

    console.log(userId)
  }

  async function loadTarefas(option,userId) {
    const params = { status: option, userId:userId };
    const response = await api.get('/status', { params });

    if (response) {
      setAllTarefas(response.data);
    }
  }

  function handleFilter(e) {
    setSelectValue(e.value);

    if (e.checked && e.value !== 'all') {
      loadTarefas(e.value,userId);
    } else {
      getTarefas();
    }
  }

  async function handleDelete(id) {
    const deletedTarefa = await api.delete(`/tarefas/${id}`)
      .then(function (response){
        if (response) {
          setAllTarefas(allTarefas.filter(tarefa => tarefa._id !== id));
          
          showToast({
            type: 'success',
            message: response.data.success
          })
        }
      })
      .catch(function (error){
        if (error.response.status >= 400 || error.response.status < 500) {
          return showToast({
            type: 'warn',
            message: error.response.data.error
          })
        } if(error.response.status >= 500){
          return showToast({
            type: 'error',
            message: msgCreateError
          })
        }
      });

    
  }

  async function handleChangeStatus(id) {
    const changedStatus = await api.patch(`/status/${id}`);

    if (changedStatus && selectValue !== 'all') {
      loadTarefas(selectValue);
    } else if (changedStatus) {
      getTarefas();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/tarefas', {
      title,
      description,
      conclusion,
      status: "Pendente",
      userId,
    })
      .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);

        setTitles('');
        setTarefas('');
        setConclusion('');
        
        showToast({
          type: 'success',
          message: msgCreateSucess
        })
        
        if (selectValue !== 'all') {
          getTarefas();
          setSelectValue('all');
        } else {
          setAllTarefas([...allTarefas, response.data]);
        }
      })
      .catch(function (error) {
        if (error.response.status >= 400 || error.response.status < 500) {
          return showToast({
            type: 'warn',
            message: error.response.data.error
          })
        } if(error.response.status >= 500){
          return showToast({
            type: 'error',
            message: msgCreateError
          })
        }
      });
  }

  useEffect(() => {
    function enableSubmitButton() {
      let btn = document.getElementById('bnt-submit-form');
      btn.style.background = '#ffd3ca';
      if (title && description && conclusion) {
        btn.style.background = '#eb8f7a';
        
      }
    }
    enableSubmitButton();
  }, [title, description, conclusion]);
  
  return (
    <div id="app">
      
      <Menu/>
      <ToastContainer />
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
            <label htmlFor="description">Tarefa</label>
            <textarea
              require
              value={description}
              onChange={e => setTarefas(e.target.value)}
            />
          </div>

          {/*<EndDatePicker/>*/}
          <div className='datePickerOp'>
            <label htmlFor="date">Conclusão</label>
            <div className='inputDate' >
              <div className='aaa'>
                <input type="date"
                  require
                  min={today}
                  value={conclusion}
                  onChange={e => setConclusion(e.target.value)}
                />
              </div>
            </div>
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
          {allTarefas.map(data => (
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

export default Tasks;