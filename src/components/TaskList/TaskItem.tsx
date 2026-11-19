import type { TaskItemProps, TaskStatus } from "../../types";
import { formatDate } from "../../utils/taskUtils";

// Displays one task and reports user actions back to the parent through callbacks.
// It never changes the task itself; the Dashboard owns the data.
export function TaskItem({
  task,
  theme,
  onStatusChange,
  onDelete,
  onEdit
}: TaskItemProps) {
  // Runs when the status dropdown changes.
  function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    // The dropdown only has valid statuses, so we tell TypeScript this text is a TaskStatus.
    onStatusChange(task.id, event.target.value as TaskStatus);
  }

  return (
    // The status, priority, and theme are added as CSS classes so each can be styled.
    <article className={`task-item ${task.status} ${task.priority} ${theme}`}>
      <div className="task-item-header">
        <h3>{task.title}</h3>
        <span className={`priority-badge ${task.priority}`}>
          {task.priority}
        </span>
      </div>

      {/* Conditional rendering: the description only appears if there is one. */}
      {task.description && <p>{task.description}</p>}

      <p className="due-date">Due: {formatDate(task.dueDate)}</p>

      {/* htmlFor and id are built from task.id so each label matches its own dropdown. */}
      <label htmlFor={`status-${task.id}`}>Status: </label>
      <select
        id={`status-${task.id}`}
        value={task.status}
        onChange={handleStatusChange}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <div className="task-actions">
        <button type="button" onClick={() => onEdit(task)}>
          Edit
        </button>

        {/* Arrow functions so each callback runs on click, not during render. */}
        <button
          type="button"
          className="danger"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}