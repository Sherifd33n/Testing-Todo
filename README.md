# TaskFlow - Project Overview & Documentation

TaskFlow is a responsive, modern task management web application built with vanilla HTML5, CSS3, and JavaScript satisfying the **50% Checkpoint (UI Layout & Core Functionality)** deliverables.

---

## 1. What Was Built
- **HTML skeleton** with accessible markup, header, form input, navigation tabs, and task container.
- **CSS styling** featuring a dark glassmorphic design system, animations, responsive layout, and custom UI components.
- **JavaScript application logic** managing task creation, 3-tab filtering (`All`, `Active`, `Completed`), status toggling, and `localStorage` persistence.

---

## 2. Feature Overview

### 🎨 UI & Layout
- **Glassmorphic Modern Dark Theme**: Built with subtle gradients, card elevation, soft borders, and custom typography (`Plus Jakarta Sans`).
- **3-Tab Navigation Bar**:
  - **All**: Displays every task (both active and completed).
  - **Active**: Displays pending tasks that require completion.
  - **Completed**: Displays finished tasks.
- **Dynamic Counters & Badges**:
  - Real-time task count badge on each tab button.
  - Header summary indicator (`X Tasks`).
  - Footer status tracking (`X items left`).
- **Contextual Empty States**: Custom empty state icons and helpful prompt messages tailored to each active tab view.

### ⚙️ Core Functionality
- **Task Creation**: Add tasks by typing in the input field and submitting via the "Add Task" button or the `Enter` key.
- **Task Toggling**: Toggle completion state by clicking on a task item or using keyboard navigation (`Space` / `Enter`). Completed tasks display a checked indicator and strike-through styling.
- **Task Deletion & Bulk Cleanup**: Remove individual items or clear all completed tasks at once.
- **Persistence**: Automatically syncs state to the browser's `localStorage` so tasks persist across page reloads.

---

## 3. Setup & Installation Instructions

No build steps or package managers (`npm`/`yarn`) are required.

### Quick Start (Direct File Access)
1. Clone or download the repository:
   ```bash
   git clone https://github.com/Sherifd33n/Testing-Todo.git
   ```
2. Navigate to the project folder:
   ```bash
   cd Testing-Todo
   ```
3. Open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Running via Local HTTP Server (Optional)
If you prefer running through a local development server:
```bash
# Using Python
python -m http.server 3000

# Using Node.js (npx)
npx serve .
```
Then open `http://localhost:3000` in your web browser.

---

## 4. Verification Notes

| Test / Scenario | Steps | Expected & Verified Outcome |
|---|---|---|
| **Initial Render** | Open `index.html` | Layout renders cleanly with header, input form, 3 tab buttons with count badges, and initial sample tasks. |
| **Add New Task** | Type a task description and submit via button or `Enter` | New task is prepended to the list, inputs reset, and counts for "All" and "Active" increment. |
| **Filter by Tabs** | Click **Active** and **Completed** tabs | Only matching tasks are displayed; inactive tabs hide non-matching items; empty state appears if no items match. |
| **Toggle Task** | Click checkbox on an active task | Checkbox turns green, text is strikethrough, item moves from "Active" to "Completed", and badges update. |
| **Delete Task** | Click the `×` button on any task item | Task is immediately removed from list and badge counts update. |
| **Persistence** | Refresh the browser | All tasks and their completion states remain intact. |

---

## 5. Project File Structure
- `index.html`: Semantic HTML5 structure and tab markup.
- `styles.css`: CSS3 styling, animations, responsive design tokens.
- `app.js`: Core application state management, event listeners, and filtering logic.
- `README.md`: Project overview, features, setup guide, and verification notes.
