## Reflection

### 1. What was the most challenging part of this project?

The most challenging part was managing application state across multiple components while keeping the task data consistent. I had to understand how state flows from the Dashboard to child components through props and callback functions. Working through this helped me better understand React's component architecture and state management.

### 2. What did you learn while completing this project?

I strengthened my understanding of React hooks, particularly `useState`, `useEffect`, and `useMemo`. I also gained more experience with TypeScript interfaces, controlled forms, event handling, and using Local Storage to persist application data.

### 3. What would you improve or add in the future?

I would like to expand the dashboard with additional features, improve the user experience, and explore more advanced state management techniques. I would also like to add automated tests to improve reliability and make future changes easier to maintain.

### 4. How did this project prepare you for building larger applications?

This project helped me understand how to break an application into smaller, reusable components and organize logic into separate files. It reinforced the importance of maintainable code, clear data flow, type safety, and separating responsibilities within a React application.


# Task Dashboard

A task management dashboard built with React, TypeScript, and Vite. This application allows users to organize tasks, track progress, manage priorities, and monitor productivity through a centralized dashboard.

## Features

- **Task Management:** Create, edit, and delete tasks.
- **Task Status:** Track tasks as pending, in progress, or completed.
- **Task Priorities:** Assign low, medium, or high priority levels.
- **Search:** Find tasks by searching their content.
- **Filtering:** Filter tasks by status and priority.
- **Sorting:** Organize tasks using available sorting options.
- **Dashboard Statistics:** View task totals and completion progress.
- **Data Persistence:** Save and retrieve tasks using browser Local Storage.
- **Theme Toggle:** Switch between light and dark themes.

## Technologies

- React 19
- TypeScript
- Vite
- CSS
- Browser Local Storage

## Project Structure

```text
src/
├── components/
│   ├── Dashboard/
│   ├── TaskForm/
│   ├── TaskFilter/
│   ├── TaskList/
│   └── TaskItem/
├── types/
│   └── index.ts
├── utils/
│   └── taskUtils.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## Getting Started

### Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate into the project directory:

```bash
cd SBA9
```

Install dependencies:

```bash
npm install
```

### Development Server

Start the local development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

### Production Build

Create an optimized production build:

```bash
npm run build
```

## Implementation

### Component Architecture

The application uses reusable React components to separate responsibilities and organize the interface.

The Dashboard component manages application state and coordinates the task management interface. Child components receive data and callback functions through props.

### TypeScript

TypeScript interfaces and types define the structure of tasks, form data, filters, sorting options, and component props. This provides type safety and improves maintainability.

### State Management

React hooks manage task data, filtering, sorting, editing, and theme selection. Derived task lists and dashboard statistics are calculated from application state.

### Form Handling and Validation

Controlled form inputs manage task creation and editing. Validation checks user input before tasks are added or updated.

### Data Persistence

Task data is stored in browser Local Storage and retrieved when the application initializes. Saved data is validated before being used.

## Learning Objectives

This project demonstrates:

- Building reusable React components.
- Passing data and callback functions through props.
- Managing application state with React hooks.
- Implementing controlled forms and input validation.
- Working with TypeScript interfaces and types.
- Implementing search, filtering, and sorting functionality.
- Persisting application data with Local Storage.
- Separating application logic into reusable utility functions.

## Author

Developed as part of the Per Scholas Full-Stack Developer program.

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

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator


## etc.
Chips https://m2.material.io/components/chips