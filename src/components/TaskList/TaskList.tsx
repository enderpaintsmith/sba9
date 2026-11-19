import { TaskItem } from "./TaskItem";
import type { TaskListProps, TaskSort } from "../../types";

// Displays the sort dropdown and the list of tasks. It has no state of its own:
// the tasks (already filtered and sorted) and all callbacks come from the Dashboard.
export function TaskList({
  tasks,
  sort,
  theme,
  onSortChange,
  onStatusChange,
  onDelete,
  onEdit,
  onMove
}: TaskListProps) {
  // Runs when the sort dropdown changes and reports the choice to the parent.
  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onSortChange(event.target.value as TaskSort);
  }

  return (
    <section className="task-list">
      <div className="task-list-header">
        <h2>Tasks ({tasks.length})</h2>

        <div className="sort-control">
          <label htmlFor="sort">Sort by </label>
          <select id="sort" value={sort} onChange={handleSortChange}>
            <option value="manual">Manual order</option>
            <option value="due-asc">Due date (earliest first)</option>
            <option value="due-desc">Due date (latest first)</option>
            <option value="priority">Priority (high first)</option>
          </select>
        </div>
      </div>

      {/* Conditional rendering: show a message when there is nothing to display,
          otherwise render the list. */}
      {tasks.length === 0 ? (
        <p className="empty-message">No tasks to display.</p>
      ) : (
        <div className="task-cards">
          {/* map() turns each task into a TaskItem.
              The key is the task's unique id so React can track each item. */}
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              theme={theme}
              showReorder={sort === "manual"}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onEdit={onEdit}
              onMove={onMove}
            />
          ))}
        </div>
      )}
    </section>
  );
}