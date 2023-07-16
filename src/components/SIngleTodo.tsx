import React, {useEffect, useState, useRef } from 'react'
import { List } from '../model';
import axios from 'axios';
import { BsFillTrashFill } from "react-icons/bs";
import { BsPencil} from "react-icons/bs";
import Checkbox from '@mui/material/Checkbox';




interface props{
  id:  string,
  todo: string,
  setList:  React.Dispatch<React.SetStateAction<List[]>>,
  todos: List[],
  err: string,
    setErr: React.Dispatch<React.SetStateAction<string>>,
  completed: boolean
}

let newlist : List[]

const SingleTodo = ({id, todo, setList, todos, err, setErr,completed}: props) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(completed);
  const [itemtodo, setTodo] = useState<string>(todo)
  

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);


  let handleDelete :(e: React.FormEvent, id: string) => void


  handleDelete = (e, id)=>{
    e.preventDefault()
    axios({
    method: 'post',
    url: 'https://todo-backend-eqq7.onrender.com/delete',
    data:{
      id : id
    } 
  })
  .then((response)=>{
    newlist = todos.filter( el => el._id !== id ); 
    setList(newlist)  
  })
  .catch(err=>{
    setErr(err.message)
  })
  }



  let handleChange :(e: React.FormEvent) => void

  let handleComplete :(completed: boolean) => void


  handleChange=(e)=>{
    e.preventDefault()
    axios({
        method: 'post',
        url: 'https://todo-backend-eqq7.onrender.com/update',
        data:{
          id : id,
          item: itemtodo
        } 
      })
      .then(()=>{
        setList(
            todos.map((todo) => (todo._id === id ? { ...todo, name: itemtodo } : todo))
          );
        setEdit(!edit)
      })
      .catch(err=>{
        setErr(err.message)
        setEdit(!edit)
      })
  }

  handleComplete=(complete)=>{

    
    axios({
        method: 'post',
        url: 'https://todo-backend-eqq7.onrender.com/complete',
        data:{
          id : id,
          completed: !complete
        } 
      })
      .then(()=>{
        setList(
            todos.map((todo) => (todo._id === id ? { ...todo, commpleted: !complete } : todo))
          );
          setCheck(!complete)        
      })
      .catch(err=>{
        setErr(err.message)
      })

  }




  


  

  
  return (
    <div >
          <div>
          <form  className='item-container' onSubmit={handleChange} >
          <div className="item">
        
          <Checkbox checked={check} onClick={()=>{handleComplete(completed) }}/>
          {edit? <input type="text" value={itemtodo}  onChange= {(e)=> setTodo(e.target.value)}  ref={inputRef}        
           /> : (completed ? <p className='decorated'>{todo}</p> : <p >{todo}</p> )}
          
          </div>
          <div className='button-contain'>

          <span className="button" onClick={(e)=> handleDelete(e, id)}>
          <BsFillTrashFill fontSize={15}/>
            </span>

          <span className="button">
            <BsPencil fontSize={15} onClick={()=> setEdit(!edit)}/>
          </span>
          </div>
         
        </form>
        </div>
          
            
        
    </div>
  )
}

export default SingleTodo

  