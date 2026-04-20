package com.senesh.taskmanager.service;

import com.senesh.taskmanager.model.Task;
import com.senesh.taskmanager.repository.TaskRepository;
import com.senesh.taskmanager.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.List;

// Handles task CRUD logic and broadcasts WebSocket events after each change.
@Service
public class TaskService {

    private final TaskRepository repo;
    private final SimpMessagingTemplate messagingTemplate; // sends messages to WebSocket subscribers

    public TaskService(TaskRepository repo, SimpMessagingTemplate messagingTemplate) {
        this.repo = repo;
        this.messagingTemplate = messagingTemplate;
    }

    // Returns all tasks (no WebSocket event — read-only).
    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    // Saves a new task and notifies subscribers with a CREATED event.
    public Task createTask(Task task) {
        Task saved = repo.save(task);
        messagingTemplate.convertAndSend("/topic/tasks", java.util.Map.of("type", "CREATED", "task", saved));
        return saved;
    }

    // Finds a task by ID or throws 404 if not found.
    public Task getTaskById(Long id) {
        return repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with id: " + id));
    }

    // Updates task fields and notifies subscribers with an UPDATED event.
    public Task updateTask(Long id, Task updated) {
        Task task = getTaskById(id);
        task.setTitle(updated.getTitle());
        task.setDescription(updated.getDescription());
        task.setStatus(updated.getStatus());
        Task saved = repo.save(task);
        messagingTemplate.convertAndSend("/topic/tasks", java.util.Map.of("type", "UPDATED", "task", saved));
        return saved;
    }

    // Deletes a task and notifies subscribers with a DELETED event.
    public Task deleteTask(Long id) {
        Task task = getTaskById(id);
        repo.delete(task);
        messagingTemplate.convertAndSend("/topic/tasks", java.util.Map.of("type", "DELETED", "task", task));
        return task;
    }
}
