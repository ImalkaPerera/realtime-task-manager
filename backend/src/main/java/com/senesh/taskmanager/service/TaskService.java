package com.senesh.taskmanager.service;

import com.senesh.taskmanager.model.Task;
import com.senesh.taskmanager.repository.TaskRepository;
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
}