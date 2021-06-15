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
      <button className="deleteButton" onClick={onDelete}>
        ×
      </button>
    </li>
  );
}

export default function App() {
  const [items, setItems] = useState([
    { text: "Example item", complete: false }
  ]);
  const [input, setInput] = useState("");

  const updateItem = (index) => () => {
    // Implement me
  };

  const deleteItem = (index) => () => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className="App">
      <h2>Todo</h2>
      <ul>
        {items.map((item, i) => (
          <TodoItem
            {...item}
            key={i}
            onClick={updateItem(i)}
            onDelete={deleteItem(i)}
          />
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
