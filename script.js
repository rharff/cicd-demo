const API_URL = '/api/todos';

async function checkHealth() {
  try {
    const res = await fetch('/api/health');
    const data = await res.json();
    const statusEl = document.getElementById('db-status');
    statusEl.innerText = data.message;
    statusEl.style.color = res.ok ? 'green' : 'red';
  } catch (err) {
    document.getElementById('db-status').innerText = 'Gagal terhubung ke API';
  }
}

async function fetchTodos() {
  try {
    const res = await fetch(API_URL);
    const todos = await res.json();
    const list = document.getElementById('todo-list');
    list.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.task;
      list.appendChild(li);
    });
  } catch (err) {
    console.error('Gagal mengambil data:', err);
  }
}

async function addTodo() {
  const input = document.getElementById('task-input');
  if (!input.value.trim()) return;

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: input.value })
    });
    input.value = '';
    fetchTodos();
  } catch (err) {
    console.error('Gagal menyimpan data:', err);
  }
}

checkHealth();
fetchTodos();