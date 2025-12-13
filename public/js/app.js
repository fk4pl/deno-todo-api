const API_URL = '/todos';

// Note: Initial fetch is handled by server-side rendering (EJS)
// document.addEventListener('DOMContentLoaded', fetchTodos);

async function fetchTodos() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    renderTodos(result.data);
  } catch (error) {
    console.error('Hata:', error);
  }
}

function renderTodos(todos) {
  const todoList = document.getElementById('todoList');
  const stats = document.getElementById('stats');

  if (todos.length === 0) {
    todoList.innerHTML = '<div class="empty-message">Henüz görev yok. Yeni bir görev ekleyin!</div>';
    stats.textContent = '';
    return;
  }

  const completedCount = todos.filter(t => t.completed).length;
  stats.textContent = `${completedCount} / ${todos.length} görev tamamlandı`;

  todoList.innerHTML = todos.map(todo => `
    <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
      <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id}, this.checked)">
      <span class="title">${escapeHtml(todo.title)}</span>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">Sil</button>
    </div>
  `).join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
}

async function addTodo() {
  const input = document.getElementById('todoInput');
  const title = input.value.trim();

  if (!title) return;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    if (response.ok) {
      input.value = '';
      fetchTodos();
    }
  } catch (error) {
    console.error('Hata:', error);
  }
}

async function toggleTodo(id, completed) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    fetchTodos();
  } catch (error) {
    console.error('Hata:', error);
  }
}

async function deleteTodo(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
  } catch (error) {
    console.error('Hata:', error);
  }
}
