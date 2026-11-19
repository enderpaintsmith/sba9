# Task Dashboard (SBA 9)

This is a task dashboard I built with React, TypeScript, and Vite. You can add, edit, delete, search, filter, and sort tasks. It also shows task counts, saves your tasks in the browser, and has a light and dark theme.

## Features

### Tasks

Every task has a title, description, status, priority, and due date. You can add, edit, and delete tasks, and change the status from a dropdown on the card.

### Form Validation

The form checks the fields when you submit it and shows an error under any field that has a problem.

- The title is required and has to be 3 to 50 characters.
- The description can be up to 200 characters.
- The due date is required.

### Search and Filters

The search box looks at the title and description. The status and priority dropdowns narrow the list more, and a task has to match every filter to show up.

An **Active Filters** row shows what is turned on, and **Clear All** resets it.

### Sorting

You can keep the default order (the order tasks were added), or sort by due date or priority.

### Statistics

Four cards show the total, pending, in-progress, and completed tasks.

### Saving

Tasks are saved in `localStorage`, so they are still there after a refresh.

### Theme and Layout

A toggle switches between light and dark mode, and the layout changes for smaller screens.

---

## Setup

Install the dependencies:

```bash
npm install
```

Start the app and open the link shown in the terminal:

```bash
npm run dev
```

Check for TypeScript errors and create a production build:

```bash
npm run build
```

## Project Structure

| File | What it does |
|---|---|
| `src/main.tsx` | Starts the app and renders App |
| `src/App.tsx` | Renders the Dashboard |
| `src/types/index.ts` | All the TypeScript types and props interfaces |
| `src/utils/taskUtils.ts` | Filtering, sorting, validation, dates, stats, and saving |
| `src/components/Dashboard/Dashboard.tsx` | Holds the state and connects the components |
| `src/components/TaskForm/TaskForm.tsx` | The form for adding and editing tasks |
| `src/components/TaskFilter/TaskFilter.tsx` | The search box and filter dropdowns |
| `src/components/TaskList/TaskList.tsx` | The sort dropdown and the list of tasks |
| `src/components/TaskList/TaskItem.tsx` | One task card |
| `src/App.css` | Layout, themes, and animations |
| `src/index.css` | Global styles |

---

## How It Works

The state lives in `Dashboard` because the form, the filter, and the list all need the same tasks. Data goes down to the components through props, and actions go back up through functions that the parent passes down.

For example, when you click Delete, `TaskItem` calls `onDelete(task.id)`. That function came from `Dashboard`, so `handleDelete` runs there, removes the task from state, and React updates the screen.

Before the list is shown, `Dashboard` runs the tasks through `filterTasks` and then `sortTasks`. `TaskList` then uses `.map()` to show a `TaskItem` for each one, with the task's ID as the key.

## State Management

`Dashboard` keeps five pieces of state with `useState`:

- The tasks
- The filters
- The sort option
- The task being edited (or `null` when adding)
- The theme

I never change state directly. Every update makes a new array with `.map()`, `.filter()`, or a copy.

`useEffect` saves the tasks to `localStorage` whenever they change. `useMemo` works out the filtered and sorted list and only does it again when the tasks, filters, or sort option change.

`TaskForm` has its own state for the text being typed and the error messages. It also gets a key from `Dashboard`, so React makes a fresh form when you switch between adding and editing.

`TaskFilter`, `TaskList`, and `TaskItem` have no state of their own.

## TypeScript Types

All the types are in `src/types/index.ts`.

- `TaskStatus`, `TaskPriority`, `TaskSort`, and `Theme` are union types, so they only allow certain strings.
- The `Task` interface describes a task.
- `TaskFormData` uses `Omit<Task, "id">` because the ID is created when the task is saved.
- `TaskFormErrors` holds the error messages, and each field is optional because only a field with a problem gets a message.
- `TaskFilters` has an optional status and priority, where empty means no filter, plus a search string.
- `TaskStats` describes the numbers in the stat cards.

Every component has a props interface, and the callback props use function types like `(id: string, status: TaskStatus) => void`.

## Components and Props

### Dashboard

The main component. It takes no props because it holds the state. It shows the header with the theme toggle, the stat cards, the form, the filter, and the task list.

### TaskForm

A controlled form for adding and editing. One change handler updates every field using the input's name. The submit handler checks the data with `validateTask` before sending it up to the parent.

| Prop | Type | Description |
|---|---|---|
| `initialTask` | `Task` or `null`, optional | The task to edit. If empty, the form adds a new task |
| `onSubmit` | `(data: TaskFormData) => void` | Called with the form values after they pass validation |
| `onCancel` | `() => void` | Called when the user cancels editing |

### TaskFilter

Shows the search box and the status and priority dropdowns. It has no state of its own, so it always shows the filters it gets from the parent. Each change is sent up with the other filters kept.

| Prop | Type | Description |
|---|---|---|
| `filters` | `TaskFilters` | The current search text, status, and priority |
| `onFilterChange` | `(filters: TaskFilters) => void` | Called with the new filters |

### TaskList

Shows the sort dropdown and the tasks. If there are no tasks, it shows "No tasks to display."

| Prop | Type | Description |
|---|---|---|
| `tasks` | `Task[]` | The tasks to show, already filtered and sorted |
| `sort` | `TaskSort` | The current sort option |
| `theme` | `Theme` | The current theme, passed on to each task |
| `onSortChange` | `(sort: TaskSort) => void` | Called when the sort dropdown changes |
| `onStatusChange` | `(id: string, status: TaskStatus) => void` | Called when a task's status changes |
| `onDelete` | `(id: string) => void` | Called when a task is deleted |
| `onEdit` | `(task: Task) => void` | Called when Edit is clicked |

### TaskItem

Shows one task with its title, priority badge, description, due date, status dropdown, and the Edit and Delete buttons. The card's class names include the status, priority, and theme so the CSS can style each one.

| Prop | Type | Description |
|---|---|---|
| `task` | `Task` | The task to show |
| `theme` | `Theme` | The current theme, used for styling |
| `onStatusChange` | `(id: string, status: TaskStatus) => void` | Called when the status dropdown changes |
| `onDelete` | `(id: string) => void` | Called when Delete is clicked |
| `onEdit` | `(task: Task) => void` | Called when Edit is clicked |

## Utility Functions

These are all in `src/utils/taskUtils.ts` and have no React code in them.

| Function | What it does |
|---|---|
| `filterTasks` | Returns the tasks that match the search, status, and priority |
| `sortTasks` | Returns a sorted copy without changing the original |
| `validateTask` | Returns error messages, or an empty object if the data is fine |
| `formatDate` | Turns `2026-11-06` into `Nov 6, 2026` |
| `getTaskStats` | Counts the tasks for the stat cards |
| `createId` | Makes a unique ID for a new task |
| `parseTasks` | Turns JSON text into tasks, or returns `null` if it is not valid |
| `loadTasks` and `saveTasks` | Read and write the tasks in `localStorage` |

`formatDate` builds the date from its year, month, and day. If I used `new Date("2026-11-06")` directly, it would be read as UTC and could show the day before in US time zones.

## Data Persistence

Tasks are saved in `localStorage` under the key `task-dashboard-tasks` whenever they change, and they load when the app starts.

The first time you open the app, it shows three sample tasks. Saved data goes through `parseTasks`, which uses a `try` and `catch` and checks that the data is an array of items with a text ID and title. That way, bad data never gets into the app.

## Styling and Accessibility

All the styles are plain CSS in `App.css` and `index.css`, with no inline styles.

The light and dark themes are sets of CSS variables, and `Dashboard` adds a light or dark class to switch between them. Cards lift a little on hover and fade in when they show up.

- The left border shows the status.
- The badge shows the priority.
- Below 800px, the layout becomes one column.
- Below 480px, the headers stack.

Every input has a label, focus shows an outline, invalid fields use `aria-invalid`, and error messages use `role="alert"`. Animations are turned off for people who prefer reduced motion.

## Known Limitations

- The theme goes back to light when you refresh the page.
- You can't reorder tasks by hand or export and import them.

## Reflection

### React and TypeScript Features I Used

I built the dashboard out of small components that each do one job and get what they need through props. I used `useState` for the data that changes, `useEffect` to save the tasks, and `useMemo` so the filtered and sorted list is only worked out again when something changes.

I used `.map()` with a key to show the list and conditional rendering for the empty message and the Cancel button.

In TypeScript, I used union types so only valid statuses, priorities, sort options, and themes are allowed. I used interfaces for the task and for every component's props, `Omit` to make the form type from the task type, and function types for the callbacks so TypeScript warns me if I pass the wrong thing.

### How I Handled State and Composition

I kept the shared state in `Dashboard` because the form, the filter, and the list all work on the same tasks. The data goes down through props, and when the user does something, the child calls a function the parent passed down, like `onDelete` or `onFilterChange`.

That means the tasks only change in one place, so the screen always matches the data. `TaskFilter`, `TaskList`, and `TaskItem` have no state of their own, which made them easy to follow. Only `TaskForm` keeps its own state, because the text being typed does not matter to anyone else until the form is submitted.

### Challenges

The hardest part was keeping track of the file structure. The build failed once saying Dashboard had no exported member, and the cause was that the file was empty, so I learned to check that every component file really has its code.

I also had to figure out which files go in `src`, `src/types`, and `src/utils`.

Another challenge was keeping the project at a level I can explain. The first version had extra features like exporting and reordering tasks, so I took them out until every part was something I understand.

I also learned that the date `2026-11-06` can show up as the day before in my time zone, so the date formatting builds the date from its parts.

### Use of AI

I used Claude as a tutor and drafting assistant. I reviewed the code, ran the build, and tested the app in the browser myself.

### What I Would Do Next

I would save the theme in `localStorage` so it does not reset on refresh, and I would add a way to reorder tasks once I have learned how.

## Testing

I checked the app with `npm run build` and by trying each feature in the browser:

- Validation
- Adding tasks
- Editing tasks
- Deleting tasks
- Search
- Filters
- Sorting
- Status changes
- Saving after a refresh
- Dark mode
- Narrow layout

## References

### React Documentation

- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [useState](https://react.dev/reference/react/useState)
- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [useMemo](https://react.dev/reference/react/useMemo)
- [useEffect](https://react.dev/reference/react/useEffect)
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)

### TypeScript Documentation

- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### MDN Web Docs

- [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- [Nullish Coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
- [Crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)
- [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
- [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)