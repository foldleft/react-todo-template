import dayjs from "dayjs";
import { useState } from "react";

import "./styles.css";

/*
Hooks reference: https://reactjs.org/docs/hooks-intro.html
Hooks API reference: https://reactjs.org/docs/hooks-reference.html

CORS-friendly sample data: https://jsonplaceholder.typicode.com/users/1/todos
*/

export function TodoItem({ title, completed, created, onClick }) {
  return (
    <li>
      <button className="checkButton" onClick={onClick}>
        {completed ? "☑" : "☐"}
      </button>
      <div className="item">
        <span>{title}</span>
        <span className="created">
          {created && dayjs(created).format("dddd HH:mm")}
        </span>
      </div>
    </li>
  );
}

export default function App() {
  const [items, setItems] = useState([
    { title: "Example item", completed: false, created: new Date() }
  ]);
  const [input, setInput] = useState("");

  const updateItem = (index) => () => {
    setItems(
      items.map((item, i) => {
        if (index === i) {
          return { ...item, completed: !item.completed };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <div className="App">
      <h2>Todo</h2>
      <ul>
        {items.map((item, i) => (
          <TodoItem {...item} key={i} onClick={updateItem(i)} />
        ))}
        <li>
          <input
            type="text"
            onChange={(event) => {
              setInput(event.target.value);
            }}
            onKeyUp={({ key }) => {
              if (key === "Enter") {
                if (input === "") return;
                const item = {
                  title: input,
                  completed: false,
                  created: new Date()
                };
                setItems([...items, item]);
                setInput("");
              }
            }}
            value={input}
          />
        </li>
      </ul>
    </div>
  );
}
