import { Router } from "@oak/oak";
import type { Todo } from "./types.ts";

// In-memory veri
const todos: Todo[] = [
  { id: 1, title: "Deno öğren", completed: false },
  { id: 2, title: "Oak framework kullan", completed: true },
];
let nextId = 3;

export const router = new Router();

// GET /todos - Tüm todoları listele
router.get("/todos", (ctx) => {
  ctx.response.body = { success: true, data: todos };
});

// GET /todos/:id - Tek todo getir
router.get("/todos/:id", (ctx) => {
  const id = Number(ctx.params.id);
  const todo = todos.find((t) => t.id === id);
  
  if (todo) {
    ctx.response.body = { success: true, data: todo };
  } else {
    ctx.response.status = 404;
    ctx.response.body = { success: false, message: "Todo bulunamadı" };
  }
});

// POST /todos - Yeni todo ekle
router.post("/todos", async (ctx) => {
  const body = await ctx.request.body.json();
  const { title } = body;

  if (!title) {
    ctx.response.status = 400;
    ctx.response.body = { success: false, message: "Title gerekli" };
    return;
  }

  const newTodo: Todo = {
    id: nextId++,
    title,
    completed: false,
  };

  todos.push(newTodo);
  ctx.response.status = 201;
  ctx.response.body = { success: true, data: newTodo };
});

// PUT /todos/:id - Todo güncelle
router.put("/todos/:id", async (ctx) => {
  const id = Number(ctx.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    ctx.response.status = 404;
    ctx.response.body = { success: false, message: "Todo bulunamadı" };
    return;
  }

  const body = await ctx.request.body.json();
  const { title, completed } = body;

  if (title !== undefined) todos[todoIndex].title = title;
  if (completed !== undefined) todos[todoIndex].completed = completed;

  ctx.response.body = { success: true, data: todos[todoIndex] };
});

// DELETE /todos/:id - Todo sil
router.delete("/todos/:id", (ctx) => {
  const id = Number(ctx.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    ctx.response.status = 404;
    ctx.response.body = { success: false, message: "Todo bulunamadı" };
    return;
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  ctx.response.body = { success: true, data: deletedTodo };
});
