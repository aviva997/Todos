import React from 'react'
import './styles.css'
import { ITodo } from '../models'
import SingleTodo from './SingleTodo'
import { Droppable } from 'react-beautiful-dnd';

interface Props{
    todos:ITodo[];
    setTodos:React.Dispatch<React.SetStateAction<ITodo[]>>;
    completedTodos:ITodo[];
    setcompletedTodos:React.Dispatch<React.SetStateAction<ITodo[]>>;



}
const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setcompletedTodos}) => {
  return (

    <div className="container">
        <Droppable droppableId='TodosList'>
            {(provided, snapshot)=>(
                <div className={`todos ${snapshot.isDraggingOver?'dragactive':''}`} ref={provided.innerRef} {...provided.droppableProps}>
                    <h2 className='todos_heading'>
                        Active Task
                    </h2>
                    {
                        todos.map((todo, index)=>(
                            <SingleTodo index={index} todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/>

                        ))
                    }
                    {provided.placeholder}
                </div>

                    )
                }
        
        </Droppable>
        <Droppable droppableId='TodosRemove'>
            {
                (provided, snapshot)=>(
                    <div className={`todos remove ${snapshot.isDraggingOver?'dragacomplete':''}` } ref={provided.innerRef} {...provided.droppableProps}>
                        <h2 className='todos_heading'> Completed Task</h2>
                        {
                            completedTodos.map((todo,index)=>(
                                <SingleTodo index={index} todo={todo} key={todo.id} todos={completedTodos} setTodos={setcompletedTodos}/>

                            ))
                        }
                    
                    {provided.placeholder}


                    </div>

                )
            }
        
        </Droppable>
        
   
    </div>

  )
}

export default TodoList;