// Todo App - Milestone 2: Core Todo Functionality – Add & Display

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const emptyListArea = document.getElementById('emptyListArea');

  // In-memory Task State
  const tasks = [];

  /**
   * Updates empty list visibility based on task count
   */
  function updateEmptyState() {
    if (tasks.length === 0) {
      emptyListArea.classList.remove('hidden');
    } else {
      emptyListArea.classList.add('hidden');
    }
  }

  /**
   * Creates a DOM element for a task item
   * @param {string} taskText 
   * @returns {HTMLElement}
   */
  function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = taskText;

    li.appendChild(span);
    return li;
  }

  /**
   * Handles adding a new task
   */
  function handleAddTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    // Add to in-memory state
    tasks.push(text);

    // Create and append DOM element
    const taskElement = createTaskElement(text);
    taskList.appendChild(taskElement);

    // Update empty state view
    updateEmptyState();

    // Reset input field and refocus
    taskInput.value = '';
    taskInput.focus();
  }

  // Form submission handler (captures click on submit button and Enter key)
  if (taskForm) {
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleAddTask();
    });
  }

  // Initial state check
  updateEmptyState();
  console.log('Todo App Milestone 2 initialized successfully.');
});
