import { useEffect, useMemo, useState } from "react";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskFilter } from "../TaskFilter/TaskFilter";
import { TaskList } from "../TaskList/TaskList";
import type {
    Task,
    TaskFilters,
    TaskFormData,
    TaskSort,
    TaskStatus,
    Theme
} from "../../types";
import {
    createId,
    filterTasks,
    getTaskStats,
    loadTasks,
    saveTasks,
    sortTasks
} from "../../utils/taskUtils";

// The main component. It owns all the shared state and passes data and
// callback functions down to the form, the filter, and the list.
export function Dashboard() {
    // Passing loadTasks as a function lets React use it to initialize
    // the task state from localStorage.
    // (loadTasks) only runs once to prevent unnecessary re-renders
    const [tasks, setTasks] = useState<Task[]>(loadTasks);

    // Stores the search text and the selected status and priority filters.
    const [filters, setFilters] = useState<TaskFilters>({ search: "" });

    // Stores how the list is sorted.
    const [sort, setSort] = useState<TaskSort>("default");

    // Stores the task being edited, or null when not editing
    // Empty on initial load
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // Stores the current color theme.
    const [theme, setTheme] = useState<Theme>("light");

    // Saves tasks to localStorage every time they change.
    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    // Creates a filtered list which is then sorted.
    // useMemo stores calculation and only recalculates when 
    // tasks, filters, or sort change.
    // List results are stored in visibleTasks
    const visibleTasks = useMemo(
        () => sortTasks(filterTasks(tasks, filters), sort),
    // Dependency Array of reactive values
        [tasks, filters, sort]
    );

    const stats = getTaskStats(tasks);

    // Lists the data for the statistics cards so they can be rendered with map().
    // Runs whenever Dashboard renders
    const statCards = [
        { label: "Total", value: stats.total },
        { label: "Pending", value: stats.pending },
        { label: "In Progress", value: stats.inProgress },
        { label: "Completed", value: stats.completed }
    ];

    // Adds a new task, or updates the one being edited.
    // TaskFormData contains user input
    function handleSubmit(data: TaskFormData) {
        if (editingTask) {
            // Replace the edited task with a copy that has the new values.
            // (previous) is the newest version of the task list, from React
            setTasks((previous) =>
                // map builds a new list
                previous.map((task) =>
                    // If this is the task being edited: ...task copies the old task & id,
                    // then ...data copies the form values over it.
                    // Otherwise (: task) keep it unchanged.
                    // Spread op. copies the values from task and data 
                    // A new 'task' object is created rather than modifying the original task
                    task.id === editingTask.id ? { ...task, ...data } : task
                )
            );
            // Return form to 'add' mode
            setEditingTask(null);
        } else {
            // Add the new task to the top of the list. And create new id
            // Functional State Update
            setTasks((previous) => [{ id: createId(), ...data }, ...previous]);
        }
    }

    // Finds a task by id and creates an updated copy with new status
    function handleStatusChange(id: string, status: TaskStatus) {
        setTasks((previous) =>
            previous.map((task) => (task.id === id ? { ...task, status } : task))
        );
    }

    // Removes a task by keeping every task except the matching/given ID using .filter()
    //.map() transforms every item in an array and returns a new array. 
    // creates an updated version of the matching task while leaving the others unchanged--in above code
    //.filter() tests every item against a condition and returns a 
    //new array containing only the items that pass.
    function handleDelete(id: string) {
        setTasks((previous) => previous.filter((task) => task.id !== id));

        // If the deleted task was open in the form, close the form.
        if (editingTask?.id === id) {
            setEditingTask(null);
        }
    }

    return (
        // The theme is added as a class on the outer element,
        // and the CSS changes the colors based on it.
        <div className={`dashboard ${theme}`}>
            <div className="dashboard-content">
                <header className="dashboard-header">
                    <h1>Task Dashboard</h1>

                    {/* The theme toggle: checking the box switches between light and dark. */}
                    <label className="theme-toggle">
                        <input
                            type="checkbox"
                            checked={theme === "dark"}
                            onChange={() =>
                                setTheme((previous) => (previous === "light" ? "dark" : "light"))
                            }
                        />
                        <span className="switch" />
                        Dark mode
                    </label>
                </header>

                {/* The statistics cards, rendered with map() and a unique key. */}
                <section className="stats" aria-label="Task statistics">
                    {statCards.map((card) => (
                        <div key={card.label} className="stat">
                            <span className="stat-number">{card.value}</span>
                            <span className="stat-label">{card.label}</span>
                        </div>
                    ))}
                </section>

                <div className="dashboard-body">
                    <aside className="sidebar">
                        {/* Changing the key makes React create a fresh form,
                so the fields reset when switching between adding and editing. */}
                        <TaskForm
                            // key will change when user switches from editing one task to another
                            // or from editing to creating a new task.
                            // React treats it as a new component instance and resets the form's internal state.
                            key={editingTask ? editingTask.id : "new"}
                            initialTask={editingTask}
                            onSubmit={handleSubmit}
                            onCancel={() => setEditingTask(null)}
                        />

                        {/* setFilters is passed down as the callback the filter calls. */}
                        <TaskFilter filters={filters} onFilterChange={setFilters} />
                    </aside>

                    <main>
                        {/* Passes the filtered and sorted tasks and all the callbacks to the list. 
                         --parent-to-child communication */}
                        <TaskList
                            tasks={visibleTasks}
                            sort={sort}
                            theme={theme}
                            onSortChange={setSort}
                            onStatusChange={handleStatusChange}
                            onDelete={handleDelete}
                            onEdit={setEditingTask}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}