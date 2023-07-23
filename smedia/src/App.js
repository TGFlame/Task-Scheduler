import React, { useState, useRef, useEffect } from 'react';
import Todolist from './Todolist';
import { v4 as uuidv4 } from 'uuid';
import todo from './Todo';
import './App.css';
import Calendar from 'react-calendar';
const local_key = 'todoApp.todos'
function App() {
  const [task, setTask] = useState([]);
  const [date, setDate] = useState(new Date());
  const Todoref = useRef();
  function Todohandler(e) {
    const name = Todoref.current.value;
    setTask(prevTask => {
      return [...prevTask, { id: uuidv4(), name: name, complete: false }]
    })
    Todoref.current.value = null;
  }
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(local_key))
    if (storedTodos) setTask(storedTodos)
  }, [])
  useEffect(() => {
    localStorage.setItem(date.toDateString(), JSON.stringify(task))
  }, [task])
  function Todotoggler(id) {
    const newtodos = [...task]
    const todo = newtodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTask(newtodos)
  }
  function HandleClear() {
    const newtodos = task.filter(task => !task.complete)
    setTask(newtodos)
  }
  return (
    <>
      <div className='center'>
        <h1>Calendar</h1>
        <Calendar onChange={setDate} value={date} />
        <br></br>

        <div className='adjust'>
          <h1>{date.toDateString()}</h1>
<input ref={Todoref} type="textarea" placeholder="Enter Task" className='heading'></input>
          <br></br><br></br><br></br>
          <button onClick={Todohandler} className='button'>Add Task</button>
          <button onClick={HandleClear} className='button'>Clear Task</button>
          <div>{task.filter(todo => !todo.complete).length} left right now</div>

        </div>

      </div>
      <br></br><br></br>
      <div className='horizontal'><Todolist todos={task} Todotoggler={Todotoggler} /></div>

    </>
  );
}

export default App;
