// State Management
let tasks = [];
let currentTab = 'all';

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const emptyTitle = document.getElementById('emptyTitle');
const emptySubtitle = document.getElementById('emptySubtitle');

// Tabs & Badges
const tabButtons = document.querySelectorAll('.tab-btn');
const badgeAll = document.getElementById('badgeAll');
const badgeActive = document.getElementById('badgeActive');
const badgeCompleted = document.getElementById('badgeCompleted');
const headerSummaryBadge = document.getElementById('headerSummaryBadge');
const activeCountText = document.getElementById('activeCountText');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// Storage Key
const STORAGE_KEY = 'todo_app_tasks';

// Initialize
function init() {
  loadTasks();
  setupEventListeners();
  render();
}

// Load tasks from LocalStorage
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      tasks = JSON.parse(saved);
    } else {
      // Default initial welcome tasks if empty
      tasks = [
        { id: '1', text: 'Welcome to TaskFlow! Click here to complete', completed: false, createdAt: Date.now() },
        { id: '2', text: 'Switch between All, Active, and Completed tabs', completed: true, createdAt: Date.now() - 1000 }
      ];
      saveTasks();
    }
  } catch (e) {
    console.error('Error loading tasks:', e);
    tasks = [];
  }
}

// Save tasks to LocalStorage
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Error saving tasks:', e);
  }
}

// Event Listeners
function setupEventListeners() {
  // Add task form submission
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
  });

  // Tab switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Clear completed tasks
  if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener('click', () => {
      clearCompleted();
    });
  }
}

// Add a new task
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const newTask = {
    id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
    text: text,
    completed: false,
    createdAt: Date.now()
  };

  tasks.unshift(newTask);
  saveTasks();
  taskInput.value = '';
  render();
}

// Toggle task completion
function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasks();
  render();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  render();
}

// Clear all completed tasks
function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  render();
}

// Switch Active Tab
function switchTab(tab) {
  currentTab = tab;

  tabButtons.forEach(btn => {
    const isSelected = btn.getAttribute('data-tab') === tab;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });

  render();
}

// Filter tasks based on current tab
function getFilteredTasks() {
  switch (currentTab) {
    case 'active':
      return tasks.filter(t => !t.completed);
    case 'completed':
      return tasks.filter(t => t.completed);
    case 'all':
    default:
      return tasks;
  }
}

// Update Badges & Counters
function updateCounters() {
  const totalCount = tasks.length;
  const activeCount = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  badgeAll.textContent = totalCount;
  badgeActive.textContent = activeCount;
  badgeCompleted.textContent = completedCount;

  headerSummaryBadge.textContent = `${totalCount} ${totalCount === 1 ? 'Task' : 'Tasks'}`;
  activeCountText.textContent = `${activeCount} ${activeCount === 1 ? 'item' : 'items'} left`;

  if (clearCompletedBtn) {
    clearCompletedBtn.style.display = completedCount > 0 ? 'inline-block' : 'none';
  }
}

// Render Empty State
function renderEmptyState(filteredTasks) {
  if (filteredTasks.length === 0) {
    emptyState.classList.add('visible');

    if (currentTab === 'active') {
      emptyTitle.textContent = 'No active tasks';
      emptySubtitle.textContent = 'All caught up! Create a new task or enjoy your free time.';
    } else if (currentTab === 'completed') {
      emptyTitle.textContent = 'No completed tasks yet';
      emptySubtitle.textContent = 'Complete some tasks to see them archived here.';
    } else {
      emptyTitle.textContent = 'No tasks yet';
      emptySubtitle.textContent = 'Add your first task above to get started!';
    }
  } else {
    emptyState.classList.remove('visible');
  }
}

// Render Task List
function renderTaskList(filteredTasks) {
  taskList.innerHTML = '';

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', task.id);

    const taskMain = document.createElement('div');
    taskMain.className = 'task-main';
    taskMain.setAttribute('role', 'checkbox');
    taskMain.setAttribute('aria-checked', task.completed ? 'true' : 'false');
    taskMain.setAttribute('tabindex', '0');

    // Checkbox icon
    const checkbox = document.createElement('div');
    checkbox.className = 'checkbox-custom';
    const checkIcon = document.createElement('span');
    checkIcon.className = 'check-icon';
    checkIcon.textContent = '✓';
    checkbox.appendChild(checkIcon);

    // Text
    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    taskMain.appendChild(checkbox);
    taskMain.appendChild(textSpan);

    // Toggle event on click & keyboard (Space/Enter)
    taskMain.addEventListener('click', () => toggleTask(task.id));
    taskMain.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleTask(task.id);
      }
    });

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.setAttribute('aria-label', `Delete task "${task.text}"`);
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(task.id);
    });

    li.appendChild(taskMain);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Main Render Function
function render() {
  const filteredTasks = getFilteredTasks();
  updateCounters();
  renderEmptyState(filteredTasks);
  renderTaskList(filteredTasks);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', init);
