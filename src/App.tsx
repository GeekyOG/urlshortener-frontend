import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import Todolist from "./components/Todolist";
import { List } from "./model";
import Alert from "@mui/material/Alert";

const App: React.FC = () => {
  const [todo, usetodo] = useState<string>("");
  const [list, setList] = useState<List[]>([]);
  const [err, setErr] = useState<string>("");
  const [result, setResult] = useState<string>("");

  return (
    <>
      <div className="box" id="heading">
        <h1>
          <>URL SHORTENER </>
        </h1>
      </div>
      <div className="box">
        {err && (
          <Alert severity="error" className="err-container">
            {err}
            <button className="err-button" onClick={() => setErr("")}>
              x
            </button>
          </Alert>
        )}

        <InputField
          result={result}
          setResult={setResult}
          err={err}
          setErr={setErr}
          todo={todo}
          usetodo={usetodo}
          todos={list}
          setList={setList}
        />
      </div>
    </>
  );
};

export default App;
