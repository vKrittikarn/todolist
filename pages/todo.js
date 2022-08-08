import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = () => {
    axios
      .get("/todo", {
        baseURL: "http://localhost:3456",
        method: "GET",
        headers: { "Content-Type": "application/json" },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })
      .then((res) => {
        console.log(res);
        setTodoList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addTodo = () => {
    axios
      .post(
        "/todo",
        { todo: todo },
        {
          baseURL: "http://localhost:3456",
          headers: { "Content-Type": "application/json" },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchTodo();
      });
  };

  const deleteTodo = (delTodo) => {
    axios
      .delete(`/todo?todo=${delTodo}`, {
        baseURL: "http://localhost:3456",
        headers: { "Content-Type": "application/json" },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchTodo();
      });
  };

  return (
    <>
      <input
        name="todo"
        value={todo}
        onChange={(event) => {
          event.preventDefault();
          setTodo(event.target.value);
        }}
      />
      <button
        onClick={(event) => {
          event.preventDefault();
          if (todo !== "") {
            addTodo();
            setTodo("");
          }
        }}
      >
        Send
      </button>
      <br />

      <ul>
        {todoList.map((element) => {
          return (
            <li>
              <font color="white">{element}</font>{" "}
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  deleteTodo(element);
                }}
              >
                ลบ
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Todo;
