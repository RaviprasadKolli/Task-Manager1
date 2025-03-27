import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchTasksAPI,
  addTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
} from "./tasksAPI";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filter: "all",
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  return await fetchTasksAPI();
});

export const addTask = createAsyncThunk("tasks/addTask", async (title) => {
  return await addTaskAPI(title);
});

export const toggleTask = createAsyncThunk("tasks/toggleTask", async (task) => {
  const updatedTask = { ...task, completed: !task.completed };
  await updateTaskAPI(updatedTask);
  return updatedTask;
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await deleteTaskAPI(id);
  return id;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const { setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
