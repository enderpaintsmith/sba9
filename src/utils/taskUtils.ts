
import type { Task, TaskFilters } from "../types";

export function filterTasks(
  tasks: Task[],
  filters: TaskFilters
): Task[] {
  return tasks.filter((task) => {
    const matchesStatus =
      !filters.status || task.status === filters.status;

    const matchesPriority =
      !filters.priority || task.priority === filters.priority;

    const matchesSearch =
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });
}
