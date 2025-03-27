import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTasksAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data.slice(0, 10);
};

export const addTaskAPI = async (title) => {
  const response = await axios.post(API_URL, {
    title,
    completed: false,
    userId: 1,
  });
  return { ...response.data, id: Date.now() };
};

export const updateTaskAPI = async (task) => {
  await axios.put(`${API_URL}/${task.id}`, task);
  return task;
};

export const deleteTaskAPI = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};
