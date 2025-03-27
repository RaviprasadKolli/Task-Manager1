import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/tasks/tasksSlice";

const FilterControls = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);

  const filters = ["all", "completed", "active"];

  return (
    <div className="filter-controls">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => dispatch(setFilter(f))}
          className={`filter-button ${filter === f ? "active" : ""}`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterControls;
