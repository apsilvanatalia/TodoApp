import React from "react";

/*import './sidebar.css'
import './app.css'
import './main.css'*/
import Notes from './Components/Tarefas/tarefa'

function App() {
  return (
    <div id="app">
      <aside>
        <strong>Tarefa</strong>
        <form>
          <div className="input-block">
            <label htmlFor="title">Titulo da Tarefa</label>
            <input/>
          </div>

          <div className="input-block">
            <label htmlFor="tarefa">Tarefa</label>
            <textarea></textarea>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <Notes />
          <Notes />
          <Notes />
          <Notes />
          <Notes />
        </ul>
      </main>
    </div>
  );
}

export default App;
