# How My SBA 9 Task Dashboard Works

A breakdown of how the app works, file by file, and how to explain the main concepts.

## The Project at Large

The dashboard is built around a main parent component called `Dashboard`. It manages the tasks, filters, sorting, editing, and theme. The other components each have their own responsibilities.

`TaskForm` handles adding and editing tasks. `TaskFilter` handles search and filters. `TaskList` displays the filtered and sorted tasks. `TaskItem` displays an individual task and handles actions like Edit, Delete, and changing the status.

`taskUtils.ts` contains reusable functions for filtering, sorting, validation, dates, and storage. `types/index.ts` defines the TypeScript types and interfaces.

The main concept to preserve is that the state lives in one parent component. Data gets passed down through props, & user actions get sent back up through callback functions.

## How Data Moves Through the App

There are two main directions:

**Props go down:** A parent passes information to a child component; the child can use that information, but it doesn't directly change the parent's state.

**Callbacks go up:** A parent passes a function to a child; when the user interacts with the child, it calls that function in question, and the parent handles the update.

Example, `Dashboard` passes tasks to `TaskList`, which passes individual tasks to `TaskItem`. When the user clicks Delete, `TaskItem` calls `onDelete(id)`. That function came from `Dashboard`, so the parent handles removing the task.

This is called **lifting state up**. When multiple components need the same information, it makes sense to keep that state in their closest common parent.

We also avoid changing arrays directly. Instead, we use methods like `.map()`, `.filter()`, and the spread operator to create updated copies. This lets React recognize that something has changed and re-render the screen.

## TypeScript: `types/index.ts`

This file defines the structure of the data used throughout the app. It doesn't contain application logic.

`TaskStatus`, `TaskPriority`, `Theme`, and `TaskSort` are union types. They restrict values to specific options, which help to prevent mistakes like using an invalid status.

The `Task` interface describes the properties of a task. `TaskFormData` uses `Omit<Task, "id">` because a new task doesn't have an ID until it's saved.

`TaskFormErrors` holds validation messages, and its properties are optional because only fields with problems need an error message. `TaskFilters` defines the search, status, and priority filters. `TaskStats` describes the numbers shown in the dashboard's stat cards.

The props interfaces define what information and callback functions each component receives. For example, `(id: string) => void` describes a function that takes a string and doesn't return anything.

## Utility Functions: `taskUtils.ts`

This file holds reusable functions that handle common tasks. They don't use React state.

`filterTasks()` filters tasks by search text, status, and priority. A task has to match all active filters to appear.

`sortTasks()` sorts tasks by due date or priority. It makes a copy first because `.sort()` changes the original array.

`validateTask()` checks that the title, description, and due date meet the form requirements.

`formatDate()` converts a date like `2026-11-06` into a readable format like `Nov 6, 2026`.

`getTaskStats()` counts all tasks and calculates how many are pending, in progress, or completed.

`createId()` uses `crypto.randomUUID()` to generate a unique ID for each new task.

`parseTasks()` converts saved JSON back into task data and handles invalid data with `try/catch`.

`loadTasks()` and `saveTasks()` read from and write to `localStorage`, so tasks stay saved after refreshing the page.

## Main Component: `Dashboard.tsx`

This is where the shared state lives and where most of the app's main logic happens.

### The Five Pieces of State

`tasks` stores the full task list. `filters` stores the search text, status, and priority. `sort` stores the current sorting option. `editingTask` stores the task currently being edited, or `null` when adding a new task. `theme` stores the current light or dark mode.

### React Hooks

`useState` stores the app's state. The task list starts with `loadTasks`, which reads saved tasks from localStorage.

`useEffect` saves the task list whenever `tasks` changes. The `[tasks]` dependency array controls when it runs.

`useMemo` remembers the filtered and sorted task list. It only recalculates when the tasks, filters, or sorting option change.

The order matters: the app filters the tasks first, then sorts the remaining results.

### Main Handlers

`handleSubmit()` adds a new task or updates an existing one. When editing, it uses `.map()` to replace the matching task. When adding, it creates a new ID and puts the task at the top of the list.

`handleStatusChange()` updates a task's status using `.map()`.

`handleDelete()` removes a task using `.filter()`. If that task was being edited, it also closes the form.

These handlers use `setTasks(previous => ...)` so the update is based on the latest state.

### Rendering the Dashboard

`Dashboard` also handles the overall layout, statistics, theme toggle, and component connections.

One detail worth knowing is the `key` on `Task