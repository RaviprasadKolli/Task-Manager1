import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterControls from "./components/FilterControls";
import "./styles.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Task Manager</h1>
      <TaskForm />

      <FilterControls />

      <TaskList />
    </div>
  );
}

export default App;
