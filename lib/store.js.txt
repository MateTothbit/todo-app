let todos = [];

export function getTodos() {
  return todos;
}

export function addTodo(text) {
  const todo = {
    id: Date.now(),
    text,
    done: false
  };
  todos.push(todo);
  return todo;
}

export function toggleTodo(id) {
  todos = todos.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  );
}

export function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
}