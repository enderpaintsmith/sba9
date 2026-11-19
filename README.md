Reflection (SBA 9)
React and TypeScript features I used

I built the dashboard out of small components: Dashboard, TaskForm, TaskFilter, TaskList, and TaskItem. Each one does one job and gets what it needs through props. I used useState for the data that changes, like the tasks, the filters, and the theme. I used useEffect to save the tasks to localStorage, and useMemo so the filtered and sorted list is only recalculated when something it depends on changes. I also used .map() with a key to show the list, and conditional rendering to show an empty message or the Cancel button.

In TypeScript I used union types for the status, priority, sort option, and theme so only valid values are allowed. I used interfaces for the task and for every component's props, and Omit to make the form type from the task type without the ID. Callback props have function types, so TypeScript warns me if I pass the wrong thing.

How I handled state and composition

I kept all the shared state in Dashboard because the form, the filter, and the list all need to work on the same tasks. The data goes down to the children through props, and when the user does something, the child calls a function that Dashboard passed down, like onDelete or onFilterChange. That means there is one place where the tasks change, so the screen always matches the data. TaskFilter, TaskList, and TaskItem have no state of their own, which made them easy to follow. Only TaskForm keeps its own state, because the text being typed does not matter to anyone else until the form is submitted.

Challenges

The hardest part for me was keeping track of the file structure. At one point the build failed with a message that Dashboard had no exported member, and the cause was that the file was empty, so I learned to check that each component file really has its code in it. I also had trouble at first knowing which files go in src, src/types, and src/utils. Another challenge was keeping the project at a level I understand. The first version had extra features, like exporting and reordering tasks, and I took them out so that every part of the code is something I can explain. I also learned that the date "2026-11-06" can show up as the day before in my time zone, so the date formatting builds the date from its parts instead.

Use of AI

I used Claude as a tutor and drafting assistant while building this project. I reviewed the code, ran the build, and tested the app in the browser myself.

What I would do next

I would save the theme in localStorage so it does not reset on refresh, and I would add a way to reorder tasks once I have learned how to do it.