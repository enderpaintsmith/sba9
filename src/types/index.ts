
export type TaskStatus = "pending" | "in-progress" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

export type TaskFormData = Omit<Task, "id">;

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  search: string;
}

export type TaskSort = "due-asc" | "due-desc" | "priority";

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export interface TaskItemProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export interface TaskFormProps {
  initialTask?: Task | null;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}

export interface TaskFilterProps {
  filters: TaskFilters;
  onFilterChange: (filters: TaskFilters) => void;
}
