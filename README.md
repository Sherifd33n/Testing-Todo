# Todo App — Milestone 2: Core Todo Functionality – Add & Display (50% Checkpoint)

---

## 1. Executive Summary & What Was Built
This project delivers **Milestone 2 (50% Checkpoint: Core Todo Functionality – Add & Display)** for the **Simple Frontend Todo App**. The implementation builds upon the foundational layout by adding interactive task creation and dynamic DOM rendering using vanilla HTML5, CSS3, and JavaScript without external frameworks.

The deliverable includes:
- **Input field & Add button UI**: Accessible `<input>` and submit `<button>` styled with focus states and responsive layouts.
- **Task creation & append logic**: Event-driven JavaScript handling `submit` events (mouse click and `Enter` key), whitespace trimming, validation, and in-memory list tracking.
- **Dynamic DOM rendering**: Dynamic generation of `.task-item` elements appended to `#taskList` with automatic toggling of the `#emptyListArea` placeholder.
- **Error-free execution**: Confirmed 0 browser console errors during load and task addition operations.

---

## 2. Feature Overview

### 🎨 UI & Layout Components
1. **[`index.html`](file:///c:/Users/jamiu/Documents/Todo/index.html)**
   - Form section (`.task-input-section`) with text input (`#taskInput`), placeholder, and submit button (`#addTaskBtn`).
   - Dynamic task list (`#taskList`) with `aria-live="polite"` for accessibility.
   - Empty state placeholder (`#emptyListArea`) displaying contextual guidance when zero tasks exist.

2. **[`styles.css`](file:///c:/Users/jamiu/Documents/Todo/styles.css)**
   - Input field styles with blue focus highlights (`box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15)`).
   - Primary button styling with hover/active states.
   - Task item cards (`.task-item`) with subtle background colors, hover transitions, and clean typography (`.task-text`).
   - Hidden state utility (`.empty-list-area.hidden { display: none; }`) for smooth zero-state transitions.
   - Responsive breakpoints for mobile screens.

3. **[`app.js`](file:///c:/Users/jamiu/Documents/Todo/app.js)**
   - In-memory `tasks` array.
   - `handleAddTask()` capturing, validating, and inserting tasks.
   - `createTaskElement()` generating semantic `<li>` DOM nodes.
   - `updateEmptyState()` automatically toggling empty list guidance.
   - Auto-clearing input field and retaining focus after submission.

---

## 3. Setup & Installation Instructions

This static web application requires no dependencies or build steps.

### Option 1: Direct File Launch
1. Clone or download the repository:
   ```bash
   git clone https://github.com/Sherifd33n/Testing-Todo.git
   ```
2. Navigate into the directory:
   ```bash
   cd Testing-Todo
   ```
3. Double-click or open `index.html` in any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server
```bash
# Using Python 3
python -m http.server 3000

# Using Node.js
npx serve .
```
Navigate to `http://localhost:3000`.

---

## 4. Acceptance Criteria & Verification Matrix

| Acceptance Criteria | Verification Method | Status |
|---|---|---|
| **User can type a task and click Add to see it appear in the list** | Tested via click and `Enter` key submissions | ✅ **Passed** |
| **New tasks persist in the UI until page refresh** | In-memory DOM state retains multiple added items | ✅ **Passed** |
| **No console errors during add operation** | Console log and runtime inspection | ✅ **Passed (0 errors)** |
| **Empty list placeholder toggles dynamically** | Verified hiding upon 1st task addition | ✅ **Passed** |

---

## 5. File Manifest & Checksums

```
Testing-Todo/
├── index.html              (HTML5 skeleton, input form, task list container)
├── styles.css              (CSS reset, input styling, task item layout)
├── app.js                  (Task capture, DOM append, empty state toggle)
├── README.md               (Comprehensive project documentation)
└── todo-app-archive.zip    (Complete project ZIP deliverable)
```
