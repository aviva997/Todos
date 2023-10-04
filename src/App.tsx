import React, { useEffect, useState } from 'react';
import './App.css';
import { ITodo } from './models';
import InputFeild from './components/InputFeild';
import TodoList from './components/TodoList';
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
const App: React.FC = ()=> {

  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>( JSON.parse(localStorage.getItem('todos') ?? '[]'));
  const [completedTodos, setcompletedTodos] = useState<ITodo[]>(JSON.parse(localStorage.getItem('completedTask') ?? '[]'));

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos))
    localStorage.setItem('completedTask', JSON.stringify(completedTodos))
  },[todos, completedTodos])

  const handleAdd = (e: React.FormEvent)=>{
    e.preventDefault()
    if(todo){
      setTodos([...todos,{id:Date.now(), todo,isDone:false } ])
      setTodo("")
    }

  }

  const OnDragEnd = (result:DropResult)=>{
    const {source, destination} = result;
    if(!destination) return
    if(destination.droppableId === source.droppableId && destination.index === source.index) return

    let add, active = todos, complete =completedTodos ; 
    if(source.droppableId === 'TodosList'){
      add = active[source.index];
      active.splice(source.index, 1);
    
    }else{
      add = complete[source.index];
      complete.splice(source.index, 1);

    }

    if(destination.droppableId === 'TodosList'){
      active.splice(destination.index, 0, add)
    
    }else{
      complete.splice(destination.index, 0, add)
    }

    setcompletedTodos(complete);
    setTodos(active)
    localStorage.setItem('todos', JSON.stringify(todos))
    localStorage.setItem('completedTask', JSON.stringify(completedTodos))
  }
  return (
    <DragDropContext onDragEnd={OnDragEnd}>
      <div className="App">
      <h1 className='heading'>Tasks</h1>
      <InputFeild todo={todo} setTodo={setTodo} handleAdd ={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setcompletedTodos={setcompletedTodos}
      />
    </div>

    </DragDropContext>
  );
}

export default App;
