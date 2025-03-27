import React from "react";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "../features/tasks/tasksSlice";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <li className="task-item">
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleTask(task))}
      />
      <span className={`task-text ${task.completed ? "completed" : ""}`}>
        {task.title}
      </span>
      <button
        className="delete-button"
        onClick={() => dispatch(deleteTask(task.id))}
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
