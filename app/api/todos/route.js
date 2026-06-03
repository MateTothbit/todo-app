import { getTodos, addTodo, toggleTodo, deleteTodo } from "@/lib/store";

export async function GET() {
  return Response.json(getTodos());
}

export async function POST(req) {
  const { text } = await req.json();
  const todo = addTodo(text);
  return Response.json(todo);
}

export async function PATCH(req) {
  const { id } = await req.json();
  toggleTodo(id);
  return Response.json({ ok: true });
}

export async function DELETE(req) {
  const { id } = await req.json();
  deleteTodo(id);
  return Response.json({ ok: true });
}