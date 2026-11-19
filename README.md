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

`validateTask()` checks that the title, description, and due date meet form requirements.

`formatDate()` converts a date like `2026-11-06` into a readable format like `Nov 6, 2026`.

`getTaskStats()` counts all tasks and calculates how many are pending, in prog, or completed.

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

The order MATTERS: the app filters the tasks first, then sorts the remaining results.

### Main Handlers

`handleSubmit()` adds a new task or updates an existing one. When editing, it uses `.map()` to replace the matching task. When adding, it creates a new ID and puts the task at the top of the list.

`handleStatusChange()` updates a task's status using `.map()`.

`handleDelete()` removes a task using `.filter()`. If that task was being edited, it also closes the form.

These handlers use `setTasks(previous => ...)` so the update is based on the latest state.

### Rendering the Dashboard

`Dashboard` also handles the overall layout, statistics, theme toggle, and component connections.

One detail worth knowing is the `key` on `TaskForm`. When the user switches between editing tasks or adding a new one, the key changes. React treats it as a new component and resets the form with the correct values.

## The Form: `TaskForm.tsx`

`TaskForm` handles both adding and editing tasks. It also validates the user's input.

The form uses controlled inputs. That means the input values come from React state, and every change updates that state. React keeps track of what's in each field.

`handleChange()` handles changes to the form fields. It uses the input's `name` and `value` to update the correct property.

`handleSubmit()` prevents the page from refreshing, validates the form, and sends the data to `Dashboard` if everything is valid.

The form uses `event.preventDefault()` to stop the browser's default submit behavior.

If validation fails, the error messages appear under the relevant fields. If the form is valid, `onSubmit()` sends the data to the parent component.

The form's heading and button also change depending on whether it's adding or editing a task. The Cancel button only appears when editing.

## Filters, Lists, and Task Cards

These components don't own shared task state. They display information and report user actions back to `Dashboard`.

### `TaskFilter.tsx`

This component displays the search field and status and priority dropdowns.

When a filter changes, it calls `onFilterChange()` and sends the updated filter values to `Dashboard`.

The Clear All button resets the filters. An active filters section also appears when one or more filters are being used.

### `TaskList.tsx`

This component displays the task count, sorting dropdown, and task cards.

It uses a ternary to check whether there are any tasks to display. If there aren't, it shows an empty-state message. Otherwise, `.map()` creates a `TaskItem` for each task.

Each item uses `key={task.id}`. This gives React a unique, stable identifier for tracking items when the list changes.

### `TaskItem.tsx`

This component displays one task card, including its title, description, priority, due date, and status.

It also includes Edit and Delete buttons and a status dropdown.

The CSS classes are based on the task's status, priority, and theme, which lets the card change its appearance depending on the data.

The buttons use callback functions like `onDelete(task.id)`. `TaskItem` doesn't directly change the task. It reports the action to `Dashboard`, which handles the update.

## What Happens When You Use the App?

### Adding a Task

The user fills out the form.

`handleChange()` updates the form state as they type.

When they submit, `validateTask()` checks the information.

If everything is valid, `onSubmit()` sends the data to `Dashboard`.

`Dashboard` creates an ID and adds the task to the list.

React re-renders the dashboard, updates the statistics, and displays the new task.

`useEffect` saves the updated list to localStorage.

### Editing a Task

The user clicks Edit on a task card.

`TaskItem` calls `onEdit(task)`.

`Dashboard` sets that task as `editingTask`.

The form receives the task's existing information.

After the user submits, `handleSubmit()` updates the matching task.

The form returns to add mode.

### Deleting a Task

The user clicks Delete.

`TaskItem` calls `onDelete(task.id)`.

`Dashboard` uses `.filter()` to remove that task.

React updates the list and saves the changes.

### Searching and Filtering

The user types in the search field or selects a filter.

`TaskFilter` sends the new values to `Dashboard`.

`useMemo` recalculates the visible tasks using `filterTasks()` and `sortTasks()`.

`TaskList` displays the matching results.

### Refreshing the Page

When the app loads, `loadTasks()` checks localStorage for saved tasks. If valid data exists, it loads that data. Otherwise, it uses the sample tasks.

The theme currently resets to light mode when the page refreshes.

## A Few Other Details

### Accessibility

Labels use `htmlFor` to connect to their inputs. Validation messages use `role="alert"` so screen readers can announce them. `aria-invalid` identifies fields with errors.

The CSS also includes a reduced-motion option for users who prefer less animation.

### Styling

`App.css` contains the dashboard and component styles. `index.css` handles global styles.

CSS variables control the colors for light and dark themes. Grid layouts make the dashboard responsive, and task status and priority classes control the colors of cards and badges.

### Running and Building the Project

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project and check for TypeScript errors:

```bash
npm run build
```

The project is tracked with Git and pushed to GitHub for submission.

## Questions an Instructor Might Ask

### Why is state in Dashboard?

Multiple components need the same data, so it lives in their closest common parent. This is called lifting state up.

### What's the difference between state and props?

State is owned and updated by a component. Props are passed down from a parent.

### How does a child update parent state?

It calls a callback function passed down through props.

### What is a controlled form?

Input values are managed by React state.

### Why use `.map()` and `.filter()`?

They create updated arrays without directly changing the original state.

### What does `key` do?

It gives React a stable way to identify each item in a list.

### What does `useEffect` do here?

It saves task changes to localStorage.

### What does `useMemo` do here?

It remembers the filtered and sorted list until its dependencies change.

### What is `Omit<Task, "id">`?

It creates a version of the Task type without the ID property.

### What is a union type?

A type that only allows a specific set of values.

### Why use `try/catch`?

It handles errors when reading or parsing saved data.

### Why use `crypto.randomUUID()`?

To give every new task a unique ID.

## What I'd Improve Next

I'd like to save the theme preference in localStorage and add a way to reorder tasks.

The biggest thing to remember when explaining this project is the data flow: Dashboard owns the state, props pass information down, and callbacks send user actions back up. Once that makes sense, the rest of the component structure is much easier to explain.

## References

### React Documentation

[Rendering Lists](https://react.dev/learn/rendering-lists)

[Conditional Rendering](https://react.dev/learn/conditional-rendering)

[useState](https://react.dev/reference/react/useState)

[Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)

[Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)

[useMemo](https://react.dev/reference/react/useMemo)

[useEffect](https://react.dev/reference/react/useEffect)

[Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)

[Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)

### TypeScript Documentation

[Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### MDN Web Docs

[Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

[Nullish Coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)

[Crypto.randomUUID()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)

[JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

[try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)

[Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/aside

Object Keys https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

### React Documentation

Rendering Lists https://react.dev/learn/rendering-lists

Conditional Rendering https://react.dev/learn/conditional-rendering

useState https://react.dev/reference/react/useState

updating objects in state https://react.dev/learn/updating-objects-in-state

Updating Arrays in State https://react.dev/learn/updating-arrays-in-state

Sharing State Between Components https://react.dev/learn/sharing-state-between-components

Preserving and resetting state https://react.dev/learn/preserving-and-resetting-state

Setter functions and Re-Rendering https://react.dev/learn/state-a-components-memory

Render and Commit https://react.dev/learn/render-and-commit

useMemo https://react.dev/reference/react/useMemo

useEffect https://react.dev/reference/react/useEffect

Synchronizing with Effects https://react.dev/learn/synchronizing-with-effects

Preserving and Resetting State https://react.dev/learn/preserving-and-resetting-state

### TypeScript Documentation

Utility Types https://www.typescriptlang.org/docs/handbook/utility-types.html

### MDN Web Docs

Optional Chaining https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

Nullish Coalescing https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing

Crypto.randomUUID() https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID

JSON.parse() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

try...catch https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch

spread syntax https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

Window.localStorage https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

Conditional Op https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator

Computed Poperty Name https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#computed_property_names

## etc.
Chips https://m2.material.io/components/chips