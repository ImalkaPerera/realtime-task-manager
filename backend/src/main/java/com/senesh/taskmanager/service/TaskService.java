package com.senesh.taskmanager.service;

import com.senesh.taskmanager.model.Task;
import com.senesh.taskmanager.repository.TaskRepository;
import com.senesh.taskmanager.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repo;

    private final SimpMessagingTemplate messagingTemplate;

    public TaskService(TaskRepository repo,SimpMessagingTemplate messagingTemplate) {
        this.repo = repo;
        this.messagingTemplate = messagingTemplate;
    }

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task createTask(Task task) {
        Task saved = repo.save(task);

        messagingTemplate.convertAndSend("/topic/tasks", saved);

        return saved;
    }

    public Task getTaskById(Long id) {
        return repo.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with id: " + id));
    }

    public Task updateTask(Long id, Task updated) {
        Task task = getTaskById(id);

        task.setTitle(updated.getTitle());
        task.setDescription(updated.getDescription());
        task.setStatus(updated.getStatus());

        Task saved = repo.save(task);

        messagingTemplate.convertAndSend("/topic/tasks", saved);

        return saved;
    }

    public Task deleteTask(Long id) {
        Task task = getTaskById(id);
        repo.delete(task);

        messagingTemplate.convertAndSend("/topic/tasks", task);

        return task;
    }
}