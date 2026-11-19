// Defines the only three valid task statuses.
// restrict the possible values and help TypeScript catch invalid values before runtime
export type TaskStatus = "pending" | "in-progress" | "completed";

// Defines the three valid priority levels.
export type TaskPriority = "low" | "medium" | "high";

// Defines the two color themes the dashboard supports.
export type Theme = "light" | "dark";

// Defines the structure of an individual task.
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

// Defines the data collected by the form.
// The id is left out because it is created when the task is saved.
export type TaskFormData = Omit<Task, "id">;

// Defines the validation messages for the form.
// A field only has a message when something is wrong with it.
export interface TaskFormErrors {
  title?: string;
  description?: string;
  dueDate?: string;
}

// Defines the current filters.
// The status and priority filters are optional so either filter can be used independently.
export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  search: string;
}

// Defines the ways the list can be sorted.
// "default" keeps the order the tasks were added.
export type TaskSort = "default" | "due-asc" | "due-desc" | "priority";

// Defines the numbers shown in the statistics cards.
export interface TaskStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

// Defines the props required by the TaskList component.
export interface TaskListProps {
  tasks: Task[];
  sort: TaskSort;
  theme: Theme;
  onSortChange: (sort: TaskSort) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

// Defines the props required by an individual TaskItem.
export interface TaskItemProps {
  task: Task;
  theme: Theme;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

// Defines the props required by the TaskForm component.
// initialTask is only provided when editing an existing task.
export interface TaskFormProps {
  initialTask?: Task | null;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}

// Defines the props required by the TaskFilter component.
export interface TaskFilterProps {
  filters: TaskFilters;
  onFilterChange: (filters: TaskFilters) => void;
}