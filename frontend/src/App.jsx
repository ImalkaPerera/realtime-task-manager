import { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';
import { connectWebSocket, disconnectWebSocket } from './websocket';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'TODO' });

  useEffect(() => {
    // Initial fetch of all tasks
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));

    // Connect to WebSocket for real-time updates
    connectWebSocket((event) => {
      const { type, task } = event;
      if (type === 'CREATED') {
        setTasks((prev) => [...prev, task]);
      } else if (type === 'UPDATED') {
        setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
      } else if (type === 'DELETED') {
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
      }
    });

    // Cleanup on unmount
    return () => {
      disconnectWebSocket();
    };
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    try {
      await createTask(newTask);
      setNewTask({ title: '', description: '', status: 'TODO' });
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const taskToUpdate = tasks.find(t => t.id === id);
      if(taskToUpdate) {
        await updateTask(id, { ...taskToUpdate, status: newStatus });
      }
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Real-Time Task Manager</h1>
      
      {/* Create Task Form */}
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px', marginBottom: '30px', background: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <input 
          type="text" 
          placeholder="Task Title" 
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
          style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input 
          type="text" 
          placeholder="Description (optional)" 
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          style={{ flex: 2, padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <select 
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {tasks.map((task) => (
          <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e0e0e0', padding: '15px', borderRadius: '8px', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div>
              <h3 style={{ margin: '0 0 8px 0', color: '#222' }}>{task.title}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>{task.description}</p>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <select 
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: task.status === 'DONE' ? '#e6ffe6' : task.status === 'IN_PROGRESS' ? '#fffae6' : '#fff' }}
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="DONE">DONE</option>
              </select>
              <button 
                onClick={() => handleDelete(task.id)} 
                style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>No tasks found. Add a new task above!</p>
        )}
      </div>
    </div>
  );
}

export default App;
