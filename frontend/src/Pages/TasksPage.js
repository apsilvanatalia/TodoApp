import React, { useState, useEffect } from 'react';
import Notes from '../Components/Tarefas/tarefa';
import Menu from '../Components/Menu/menu';
import api from "../Services/api";
import FilterRadioButton from "../Components/Filter/filter-radio-button";
import Modal from 'react-modal';
import { AiOutlineWarning } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import showToast from '../Components/Toast/Toast'

import './global.css'
import './sidebar.css'
import './tasks.css'
import './main.css'
import '../Components/DatePicker/style.css'

Modal.setAppElement('#root');

function Tasks() {
  const [title, setTitles] = useState('');
  const [description, setTarefas] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [allTarefas, setAllTarefas] = useState([]);
  const [selectValue, setSelectValue] = useState('all');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [tarefasProximas, setTarefasProximas] = useState([]);
  const userId = localStorage.getItem("userId");

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 1); // Define a data mínima como um dia antes do dia atual

  const msgCreateSucess = 'Tarefa adicionada com sucesso.';

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/tarefas/nearCompletion/${userId}`);
        const tarefasProximas = response.data;

        if (tarefasProximas.length > 0) {
          setTarefasProximas(tarefasProximas);
          setIsPopupOpen(true);
        }
      } catch (error) {
        console.error("Erro ao buscar tarefas próximas à conclusão:", error);
      }
    }

    fetchData();
  }, [userId]);

  useEffect(() => {
    getTarefas();
  }, []);

  async function getTarefas() {
    const response = await api.get(`/tarefas/${userId}`,);
    setAllTarefas(response.data);
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
            message: error.response.data.error
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
            message: error.response.data.error
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
      <Menu />
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
          <div className='datePickerOp'>
            <label htmlFor="date">Conclusão</label>
            <div className='inputDate' >
              <div className='aaa'>
                <input 
                  type="date"
                  require
                  min={minDate.toISOString().split('T')[0]}
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

      <Modal
        isOpen={isPopupOpen}
        onRequestClose={() => setIsPopupOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '8px',
          },
          overlay: {
            background: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <AiOutlineWarning size={30} style={{ marginRight: '10px', color: '#eb8f7a' }} />
          <h3>Atenção: Tarefas próximas à data de conclusão!</h3>
        </div>
        {tarefasProximas.map(tarefa => (
          <div key={tarefa._id} style={{ marginBottom: '10px' }}>
            <p><strong>Tarefa:</strong> {tarefa.title}</p>
            <p><strong>Data de Conclusão:</strong> {new Date(tarefa.conclusion).toLocaleDateString()}</p>
          </div>
        ))}
        <button style={{ background: '#eb8f7a', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer' }} onClick={() => setIsPopupOpen(false)}>Fechar</button>
      </Modal>

    </div>
  );
}

export default Tasks;