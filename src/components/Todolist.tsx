import React, { useEffect, useState } from "react";
import { List } from "../model";
import axios from "axios";
import SingleTodo from "./SIngleTodo";

interface props {
  setList: React.Dispatch<React.SetStateAction<List[]>>;
  todos: List[];
  err: string;
  setErr: React.Dispatch<React.SetStateAction<string>>;
}

const Todolist = ({ setList, todos, err, setErr }: props) => {
  const [todo, usetodo] = useState<string>("");
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    setState(!state);
    axios({
      method: "get",
      url: "https://todo-backend-eqq7.onrender.com/",
    })
      .then((response) => {
        setList(response.data);
        setState(false);
      })
      .catch((err) => {
        usetodo("");
        setState(false);
        setErr(err.message);
      });
  }, []);

  return (
    <div>
      {/* {state?<div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div> : todos.map(item=>{
        return(
          
          <SingleTodo todos={todos} id={item._id}  todo={item.name} setList={setList} completed={item.commpleted} err={err} setErr={setErr}  /> 
        )
    }) } */}
    </div>
  );
};

export default Todolist;
