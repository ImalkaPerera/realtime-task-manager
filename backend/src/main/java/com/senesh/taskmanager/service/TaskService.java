package com.senesh.taskmanager.service;

import com.senesh.taskmanager.model.Task;
import com.senesh.taskmanager.repository.TaskRepository;
import com.senesh.taskmanager.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task createTask(Task task) {
        return repo.save(task);
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

        return repo.save(task);
    }

    public Task deleteTask(Long id) {
        Task task = getTaskById(id);
        repo.delete(task);
        return task;
    }
}