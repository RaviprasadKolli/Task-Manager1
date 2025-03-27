import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskItem from "./TaskItem";
import { fetchTasks } from "../features/tasks/tasksSlice";

const TaskList = () => {
  const { tasks, filter, loading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    return !task.completed;
  });

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <ul className="task-list">
      {filteredTasks.length === 0 ? (
        <li className="task-item">No tasks found</li>
      ) : (
        filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </ul>
  );
};

export default TaskList;
