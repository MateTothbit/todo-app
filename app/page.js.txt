"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  async function loadTodos() {
    const res = await fetch("/api/todos");
    setTodos(await res.json());
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function addTodo() {
    if (!text) return;

    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ text })
    });

    setText("");
    loadTodos();
  }

  async function toggle(id) {
    await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id })
    });

    loadTodos();
  }

  async function remove(id) {
    await fetch("/api/todos", {
      method: "DELETE",
      body: JSON.stringify({ id })
    });

    loadTodos();
  }

  return (
    <main style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Todo App</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Új feladat..."
      />
      <button onClick={addTodo}>Hozzáadás</button>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span
              onClick={() => toggle(t.id)}
              style={{
                textDecoration: t.done ? "line-through" : "none",
                cursor: "pointer",
                marginRight: 10
              }}
            >
              {t.text}
            </span>

            <button onClick={() => remove(t.id)}>X</button>
          </li>
        ))}
      </ul>
    </main>
  );
}