# ✅ Todo App

A simple **React + TypeScript** Todo application with:

- **Create / Update / Delete / Complete** task actions
- **LocalStorage persistence** (tasks remain after reload)
- Optional **API integration** (using `json-server` or any REST API)
- **TailwindCSS** for styling

---

## 📸 Features

- Add a new task (title + description)
- Edit existing tasks
- Mark tasks as completed
- Delete tasks
- Stores all tasks in **localStorage** by default  
- (Optional) Syncs with **fake API** (`json-server`)

---

## 🛠 Tech Stack

- **React 18** (functional components + hooks)
- **TypeScript** (strict mode)
- **TailwindCSS** (utility-first styling)
- **json-server** (optional, for fake API)
- **localStorage** (caching & persistence)

---

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/todo-app.git
```
```bash
cd todo-app
```
### 2. Install dependencies

```bash
npm install
```
### 3. Run the app (LocalStorage mode only)
```bash
npm run dev
```
### 4. 🔥 Optional: Run with json-server (Fake API)
If you want to use a fake REST API instead of localStorage only:
1. Install json-server
```bash
npm install -g json-server
```
2. Create a db.json
```bash
{
  "tasks": [
    { "id": 1, "title": "First task", "description": "Example", "completed": false }
  ]
}
```
3. Run the fake API
```bash
json-server --watch db.json --port 3001
```
4. Switch the app to use API
Inside useTasks hook, replace localStorage logic with API functions (already included in api/tasksApi.ts).

```bash
src/
├── api/                # API calls (fetch, create, delete, update)
│   └── tasksApi.ts
├── components/         # UI components
│   ├── TaskForm.tsx    # Controlled form for add/edit
│   ├── ItemsList.tsx   # Renders tasks list
│   ├── Spinner.tsx
│   └── Button.tsx
├── hooks/
│   └── useTasks.ts     # State & logic (CRUD + localStorage sync)
├── types/              # TS types (Task, CreateTask, etc.)
├── utils/              # localStorage utils
│   └── localStorage.ts
└── App.tsx
```
