import type {
  Task,
  TaskFilters,
  TaskFormData,
  TaskFormErrors,
  TaskPriority,
  TaskSort,
  TaskStats
} from "../types";

// Defines the key used to save and load tasks in localStorage.
const STORAGE_KEY = "task-dashboard-tasks";

// Provides the tasks shown the first time the app loads.
export const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Finish the dashboard",
    description: "Build the components and connect them.",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-11-20"
  },
  {
    id: "2",
    title: "Write the README",
    description: "Explain setup and how each component works.",
    status: "pending",
    priority: "medium",
    dueDate: "2026-11-22"
  },
  {
    id: "3",
    title: "Push to GitHub",
    description: "Make sure the repository is public.",
    status: "completed",
    priority: "low",
    dueDate: "2026-11-18"
  }
];

// Returns only the tasks that match the selected filters and search text.
// A filter that is not selected lets every task through.
export function filterTasks(tasks: Task[], filters: TaskFilters): Task[] {
  const search = filters.search.trim().toLowerCase();

  return tasks.filter((task) => {
    const matchesStatus = !filters.status || task.status === filters.status;
    const matchesPriority =
      !filters.priority || task.priority === filters.priority;
    const matchesSearch =
      search === "" ||
      task.title.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search);

    // A task must match every filter to appear in the list.
    return matchesStatus && matchesPriority && matchesSearch;
  });
}

// Ranks priorities so a lower number is shown first ("high" before "low").
const priorityRank: Record<TaskPriority, number> = {
  high: 0,
  medium: 1,
  low: 2
};

// Returns a sorted copy of the tasks without changing the original array.
// Due dates are stored as "YYYY-MM-DD", so comparing them as text sorts them by date.
export function sortTasks(tasks: Task[], sort: TaskSort): Task[] {
  // Copy first because .sort() changes the array it is called on.
  const sorted = [...tasks];

  if (sort === "due-asc") {
    sorted.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  } else if (sort === "due-desc") {
    sorted.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
  } else if (sort === "priority") {
    sorted.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
  }

  // "manual" keeps the order the user arranged.
  return sorted;
}

// Checks the form data and returns an object of error messages.
// An empty object means the data is valid.
export function validateTask(data: TaskFormData): TaskFormErrors {
  const errors: TaskFormErrors = {};
  const title = data.title.trim();

  if (title === "") {
    errors.title = "Title is required.";
  } else if (title.length < 3) {
    errors.title = "Title must be at least 3 characters.";
  } else if (title.length > 50) {
    errors.title = "Title must be 50 characters or fewer.";
  }

  if (data.description.length > 200) {
    errors.description = "Description must be 200 characters or fewer.";
  }

  if (data.dueDate === "") {
    errors.dueDate = "Due date is required.";
  }

  return errors;
}

// Formats a date like "2026-11-06" as "Nov 6, 2026".
// The date is built from its parts because new Date("2026-11-06") is read as UTC
// and can show the previous day in US time zones.
export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const [year, month, day] =