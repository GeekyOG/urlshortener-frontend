import React, { useState, useRef } from "react";
import axios from "axios";
import { List } from "../model";

interface props {
  todo: string;
  result: string;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  usetodo: React.Dispatch<React.SetStateAction<string>>;
  setList: React.Dispatch<React.SetStateAction<List[]>>;
  err: string;
  setErr: React.Dispatch<React.SetStateAction<string>>;
  todos: List[];
}

const InputField = ({
  todo,
  result,
  setResult,
  usetodo,
  setList,
  err,
  setErr,
  todos,
}: props) => {
  const [state, setState] = useState<boolean>(false);
  let handleAdd: (e: React.FormEvent) => void;
  const textAreaRef: any = useRef(null);
  handleAdd = async (e) => {
    e.preventDefault();
    if (err.length > 1) {
      setErr("");
    }
    if (todo == "") {
      setErr("Field cannot be left empty");
    } else {
      setState(true);
      let url = todo;
      if (todo.slice(0, 4) !== "http") {
        url = `http://${todo}`;
      }
      console.log(url);

      try {
        const response = await axios({
          method: "post",
          url: "https://vercel-text-six.vercel.app/api/",
          data: {
            url: url,
          },
        });

        const result = await response;

        if (response.data == "Request failed with status code 400") {
          setErr("Enter a valid URL");
        }
        setResult(result.data.result_url);
        setState(false);
        console.log(result);
      } catch (err) {
        setState(false);
        setErr("Oops something went wrong!!!");
      }
    }
  };
  let copy: (e: React.FormEvent) => any;

  copy = (e) => {
    e.preventDefault();

    // Get the text field
    var copyText: any = document.getElementById("myInput");

    // Select the text field

    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied the wallet: " + copyText.value);
  };

  return (
    <>
      <form className="input-form" onSubmit={handleAdd}>
        <h2>Enter your Long URL</h2>

        <input
          type="text"
          value={todo}
          onChange={(e) => {
            usetodo(e.target.value);
          }}
          placeholder="Example: google.com"
        />

        {state ? (
          <button className="button-spin" name="list">
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          </button>
        ) : (
          <button className="button" type="submit" name="list">
            Shorten Link
          </button>
        )}

        {result && (
          <div>
            <h2>Your generated URL is:</h2>

            <div className="link">
              <input id="myInput" type="text" value={result} readOnly />
              <button className="button copy" onClick={copy}>
                Copy
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default InputField;
