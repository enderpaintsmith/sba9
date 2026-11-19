import type { TaskFilterProps, TaskPriority, TaskStatus } from "../../types";

// Displays the search box and the status and priority dropdowns.
// It has no state of its own: the current filters come from the parent,
// and every change is sent back up through onFilterChange.
export function TaskFilter({ filters, onFilterChange }: TaskFilterProps) {
  // Each handler copies the existing filters ({ ...filters }) and changes one value,
  // so the other filters are kept.

  // ChangeEvent is one of React’s types, and React tells TypeScript where to find it.
  // Like surnmame, christian name convention: React.ChangeEvent means 
  // “the ChangeEvent that belongs to React.”
  // value takes current search text
  // copy filters with spread op and update search property
  // onFilterChange sends the new object to Dashboard
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>)
  //update filters without losing the data from the original object
  {
    onFilterChange({ ...filters, search: event.target.value });
  }

  // event.target.value grabs seleced drodown value
  // TaskStatus | "" validates with TS that this is a valid input
  // value || undefined changes an empty slection into undefined--no filter is active
  function handleStatusChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value as TaskStatus | "";

    // "" means "All Statuses", and "|| undefined" turns it into undefined (no filter).
    onFilterChange({ ...filters, status: value || undefined });
  }

  function handlePriorityChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value as TaskPriority | "";
    onFilterChange({ ...filters, priority: value || undefined });
  }

  // Turns off every filter and clears the search field
  function clearFilters() {
    onFilterChange({ search: "" });
  }

  // Is true when at least one filter is turned on. Used to show the indicators.
  const hasActiveFilters = Boolean(
    filters.status || filters.priority || filters.search.trim() !== ""
  );

  return (
    <section className="task-filter">
      <h2>Search &amp; Filter</h2>

      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="search"
        placeholder="Search title or description"
        value={filters.search}
        onChange={handleSearchChange}
      />

      {/* "?? ''" shows the "All" option when no status is selected. */}
      <label htmlFor="status-filter">Status</label>
      <select
        id="status-filter"
        value={filters.status ?? ""}
        onChange={handleStatusChange}
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>


      <label htmlFor="priority-filter">Priority</label>
      <select
        id="priority-filter"
        value={filters.priority ?? ""}
        onChange={handlePriorityChange}
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Active filter indicators: only shown while a filter is turned on with &&  */}
      {hasActiveFilters && (
        <div className="active-filters">
          <span className="active-label">Active filters:</span>

          {filters.search.trim() !== "" && (
            <span className="chip">Search: {filters.search}</span>
          )}
          {filters.status && (
            <span className="chip">Status: {filters.status}</span>
          )}
          {filters.priority && (
            <span className="chip">Priority: {filters.priority}</span>
          )}
          // 'Secondary' applies styling 
          // Type button removes default type = submit 
          <button type="button" className="secondary" onClick={clearFilters}>
            Clear all
          </button>
        </div>
      )}
    </section>
  );
}