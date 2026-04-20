import axios from 'axios';

// Pointing directly to the backend URL since there is no proxy
const API_BASE_URL = 'http://localhost:8080/api/tasks';

export const fetchTasks = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
};

export const createTask = async (taskData) => {
    const response = await axios.post(API_BASE_URL, taskData);
    return response.data;
};

export const updateTask = async (id, taskData) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, taskData);
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
};
