import React from 'react';
import './App.css';

export default function todo({todo,Todotoggler}) {
    function handleTodo(){
        Todotoggler(todo.id)
    }
    return (
        <div className='card'>
            <input type='checkbox' checked={todo.complete} onChange={handleTodo}></input>
            {todo.name}
        
           
        </div>
    )
}