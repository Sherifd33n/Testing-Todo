// Application State
let tasks = [];
let currentTab = 'all';

// DOM Selectors
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const emptyTitle = document.getElementById('emptyTitle');
const emptySubtitle = document.getElementById('emptySubtitle');

// Tabs & Counters
const tabButtons = document.querySelectorAll('.tab-btn');
const badgeAll = document.getElementById('badgeAll');
const badgeActive = document.getElementById('badgeActive');
const badgeCompleted = document.getElementById('badgeCompleted');
const headerSummaryBadge = document.getElementById('headerSummaryBadge');
const activeCountText = document.getElementById('activeCountText');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// Storage Identifier
const STORAGE_KEY = 'todo_flow_app_tasks';

/**
 * Initialize application lifecycle
 */
function init() {
  loadTasks();
  setupEventListeners();
  render();
}

/**
 * Load tasks from LocalStorage
 */
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      tasks = JSON.parse(saved);
      if (!Array.isArray(tasks)) {
        tasks = [];
      }
    } else {
      // Default starter tasks
      tasks = [
        { id: '1', text: 'Explore the 3 tabs: All, Active, and Completed', completed: false, createdAt: Date.now() },
        { id: '2', text: 'Click on a task checkbox to mark it as completed', completed: false, createdAt: Date.now() - 1000 },
        { id: '3', text: 'Finished sample task (view in Completed tab)', completed: true, createdAt: Date.now() - 2000 }
      ];
      saveTasks();
    }
  } catch (err) {
    console.error('Failed to load tasks from localStorage:', err);
    tasks = [];
  }
}

/**
 * Persist tasks to LocalStorage
 */
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('Failed to save tasks to localStorage:', err);
  }
}

/**
 * Bind DOM Event Listeners
 */
function setupEventListeners() {
  // Form submission
  if (taskForm) {
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addTask();
    });
  }

  // Tab switching
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab) {
        switchTab(targetTab);
      }
    });
  });

  // Bulk clear completed
  if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener('click', () => {
      clearCompleted();
    });
  }
}

/**
 * Create a new task item
 */
function addTask() {
  if (!taskInput) return;
  const text = taskInput.value.trim();
  if (!text) return;

  const newTask = {
    id: Date.now().toString() + '-' + Math.random().toString(36).substring(2, 7),
    text: text,
    completed: false,
    createdAt: Date.now()
  };

  tasks.unshift(newTask);
  saveTasks();
  taskInput.value = '';
  render();
}

/**
 * Toggle task completion status
 * @param {string} id - Task identifier
 */
function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasks();
  render();
}

/**
 * Delete a specific task
 * @param {string} id - Task identifier
 */
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  render();
}

/**
 * Clear all completed tasks
 */
function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  render();
}

/**
 * Switch active navigation tab
 * @param {string} tab - 'all' | 'active' | 'completed'
 */
function switchTab(tab) {
  currentTab = tab;

  tabButtons.forEach((btn) => {
    const isSelected = btn.getAttribute('data-tab') === tab;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
  });

  render();
}

/**
 * Filter tasks matching the active tab view
 * @returns {Array} Filtered task list
 */
function getFilteredTasks() {
  switch (currentTab) {
    case 'active':
      return tasks.filter((t) => !t.completed);
    case 'completed':
      return tasks.filter((t) => t.completed);
    case 'all':
    default:
      return tasks;
  }
}

/**
 * Update dynamic badge counters and labels
 */
function updateCounters() {
  const totalCount = tasks.length;
  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  if (badgeAll) badgeAll.textContent = totalCount;
  if (badgeActive) badgeActive.textContent = activeCount;
  if (badgeCompleted) badgeCompleted.textContent = completedCount;

  if (headerSummaryBadge) {
    headerSummaryBadge.textContent = `${totalCount} ${totalCount === 1 ? 'Task' : 'Tasks'}`;
  }

  if (activeCountText) {
    activeCountText.textContent = `${activeCount} ${activeCount === 1 ? 'item' : 'items'} left`;
  }

  if (clearCompletedBtn) {
    clearCompletedBtn.style.display = completedCount > 0 ? 'inline-block' : 'none';
  }
}

/**
 * Render empty state visuals
 * @param {Array} filteredTasks 
 */
function renderEmptyState(filteredTasks) {
  if (!emptyState) return;

  if (filteredTasks.length === 0) {
    emptyState.classList.add('visible');

    if (currentTab === 'active') {
      emptyTitle.textContent = 'No active tasks';
      emptySubtitle.textContent = 'All caught up! Create a new task or enjoy your free time.';
    } else if (currentTab === 'completed') {
      emptyTitle.textContent = 'No completed tasks yet';
      emptySubtitle.textContent = 'Mark tasks as done to see them archived here.';
    } else {
      emptyTitle.textContent = 'No tasks yet';
      emptySubtitle.textContent = 'Add your first task above to get organized!';
    }
  } else {
    emptyState.classList.remove('visible');
  }
}

/**
 * Render task list elements into DOM
 * @param {Array} filteredTasks 
 */
function renderTaskList(filteredTasks) {
  if (!taskList) return;
  taskList.innerHTML = '';

  filteredTasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', task.id);

    const taskMain = document.createElement('div');
    taskMain.className = 'task-main';
    taskMain.setAttribute('role', 'checkbox');
    taskMain.setAttribute('aria-checked', task.completed ? 'true' : 'false');
    taskMain.setAttribute('tabindex', '0');
    taskMain.setAttribute('aria-label', `Toggle task: ${task.text}`);

    // Custom check indicator
    const checkbox = document.createElement('div');
    checkbox.className = 'checkbox-custom';
    const checkIcon = document.createElement('span');
    checkIcon.className = 'check-icon';
    checkIcon.textContent = '✓';
    checkbox.appendChild(checkIcon);

    // Text label
    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    taskMain.appendChild(checkbox);
    taskMain.appendChild(textSpan);

    // Interaction handlers: click & keyboard
    taskMain.addEventListener('click', () => toggleTask(task.id));
    taskMain.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleTask(task.id);
      }
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('aria-label', `Delete task: "${task.text}"`);
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

/**
 * Main application render cycle
 */
function render() {
  const filteredTasks = getFilteredTasks();
  updateCounters();
  renderEmptyState(filteredTasks);
  renderTaskList(filteredTasks);
}

// Initial boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
