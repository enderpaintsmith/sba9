import { useState } from "react";
import type { TaskFormData, TaskFormErrors, TaskFormProps } from "../../types";
import { validateTask } from "../../utils/taskUtils";

// Defines what an empty form looks like when adding a new task.
const emptyForm: TaskFormData = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: ""
};

// Displays a form for adding a new task or editing an existing one.
// When initialTask is provided, the form starts with that task's values 
// 'edit mode'.
// initialTask through props in dashboard
export function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  // Stores what the user has typed. Every input gets its value from this state,
  // which makes the form a "controlled" form.
  // Ternary op. checks whether initialTask exists
  // Does initialTask exist? useState Populates form with that task's values
  // ONLY when the component first renders
  // Else initialize empty form

  // Inputs use formData as their value, so they display whatever is stored in state.
  const [formData, setFormData] = useState<TaskFormData>(
    initialTask
      ? {
        title: initialTask.title,
        description: initialTask.description,
        status: initialTask.status,
        priority: initialTask.priority,
        dueDate: initialTask.dueDate
      }
      : emptyForm
  );

  // Stores the validation errors shown under the fields that have problem(s)
  const [errors, setErrors] = useState<TaskFormErrors>({});

  // Handles every field with one function.
  // Each input's name matches a key in formData, so [name]: value updates only that field.
  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    //event.target input element triggering the event
    // { name, value } pair extract input's current value
    // [name] uses the input's name as a dynamic object property
    // this single handler manages all form fields
    const { name, value } = event.target;
    // [name] computed property names (or computed keys).
    // Refers to the input field that triggered the change
    // ...previous includes the data from the prior object
    // [name]: value updates only the changed property
    setFormData((previous) => ({ ...previous, [name]: value }));
  }

  // Runs when the form is submitted; Validates first, then Sends the data to the Parent
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {

    // Stops the browser from native form submission behavior
    event.preventDefault();

    // call the function from task utils
    const newErrors = validateTask(formData);
    setErrors(newErrors);

    // If there is at least one error message, stop here so the messages can show.
    // setErrors() updates state, and JSX displays them
    if (Object.keys(newErrors).length > 0) return;

    //send valid data to dashboard using onSubmit, a callback from the Dashboard
    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim()
    });

    // If this is a new task--not an edit--clear the form
    if (!initialTask) {
      setFormData(emptyForm);
    }
  }

  return (
    <section className="task-form">
      <h2>{initialTask ? "Edit Task" : "Add Task"}</h2>

      {/* noValidate turns off the browser's own popups so our messages are used. */}
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          aria-invalid={Boolean(errors.title)}
        />
        {/* Conditional rendering: the message only appears when there is an error. */}
        {errors.title && (
          <p className="error-message" role="alert">
            {errors.title}
          </p>
        )}

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          aria-invalid={Boolean(errors.description)}
        />
        {errors.description && (
          <p className="error-message" role="alert">
            {errors.description}
          </p>
        )}

        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          aria-invalid={Boolean(errors.dueDate)}
        />
        {errors.dueDate && (
          <p className="error-message" role="alert">
            {errors.dueDate}
          </p>
        )}

        <div className="form-actions">
          <button type="submit">
            {initialTask ? "Save Changes" : "Add Task"}
          </button>

          {/* The Cancel button only appears while editing. */}
          {initialTask && (
            <button type="button" className="secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}