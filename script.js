
let tasks = [];

const taskInput   = document.getElementById('taskInput');
const addBtn      = document.getElementById('addBtn');
const taskList    = document.getElementById('taskList');
const errorMsg    = document.getElementById('errorMsg');
const taskCount   = document.getElementById('taskCount');
const emptyMessage = document.getElementById('emptyMessage');

function saveTasks() {
 
}

function renderTasks() {
  taskList.innerHTML = '';


  if (tasks.length === 0) {
    emptyMessage.style.display = 'block';
  } else {
    emptyMessage.style.display = 'none';
  }


  taskCount.textContent = tasks.length;


  tasks.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = 'task-item';
    if (task.completed) div.classList.add('completed');

    div.innerHTML = `
      <span class="task-text">${task.text}</span>
      <button class="btn-complete">${task.completed ? 'Undo' : 'Complete'}</button>
      <button class="btn-delete">Delete</button>
    `;

    const completeBtn = div.querySelector('.btn-complete');
    const deleteBtn   = div.querySelector('.btn-delete');

    completeBtn.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(div);
  });
}


function addTask() {
  const text = taskInput.value.trim();

  if (text === '') {
    errorMsg.style.display = 'block';
    taskInput.focus();
    return;
  }

  errorMsg.style.display = 'none';

  tasks.push({
    text: text,
    completed: false
  });

  saveTasks();
  renderTasks();

  taskInput.value = '';
  taskInput.focus();
}


addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});


renderTasks();

