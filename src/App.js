import { useState } from "react";

import "./styles.css";

/*
Hooks reference: https://reactjs.org/docs/hooks-intro.html
Hooks API reference: https://reactjs.org/docs/hooks-reference.html

CORS-friendly sample data: https://jsonplaceholder.typicode.com/users/1/todos
*/

export function TodoItem({ title, completed, onClick }) {
  return (
    <li>
      <button className="checkButton" onClick={onClick}>
        {completed ? "☑" : "☐"}
      </button>
      <span>{title}</span>
    </li>
  );
}

export default function App() {
  const [items, setItems] = useState([
    { title: "Example item", completed: false }
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
                const item = { title: input, completed: false };
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
