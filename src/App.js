import { useState } from "react";

import "./styles.css";

/*
Hooks reference: https://reactjs.org/docs/hooks-intro.html
Hooks API reference: https://reactjs.org/docs/hooks-reference.html
*/

export function TodoItem({ text, complete, onClick, onDelete }) {
  return (
    <li>
      <button className="checkButton" onClick={onClick}>
        {complete ? "☑" : "☐"}
      </button>
      <span>{text}</span>
    </li>
  );
}

export default function App() {
  const [items, setItems] = useState([
    { text: "Example item", complete: false }
  ]);
  const [input, setInput] = useState("");

  const updateItem = (index) => () => {
    setItems(
      items.map((item, i) => {
        if (index === i) {
          return { ...item, complete: !item.complete };
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
                const item = { text: input, complete: false };
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
