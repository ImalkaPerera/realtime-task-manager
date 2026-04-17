# Realtime Collaborative Task Manager

A full-stack web application that enables multiple users to manage tasks collaboratively with real-time updates across all connected clients.

## Overview

This project demonstrates a real-time system where task updates (create, update, delete) are instantly synchronized across users using WebSocket-based communication.

- Backend: Spring Boot + PostgreSQL
- Frontend: React (Vite)

## Features

- Create, update, delete, and view tasks
- Real-time synchronization across multiple clients
- WebSocket-based event broadcasting
- Persistent storage using PostgreSQL
- Clean layered architecture (Controller -> Service -> Repository)

## Tech Stack

### Backend

- Java
- Spring Boot
- Spring Web (REST APIs)
- Spring Data JPA
- Spring WebSocket (STOMP messaging)

### Database

- PostgreSQL

### Frontend

- React
- Axios
- STOMP.js
- Vite

## Repository Structure

```text
.
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```

## API Endpoints

| Method | Endpoint        | Description   |
| ------ | --------------- | ------------- |
| POST   | /api/tasks      | Create a task |
| GET    | /api/tasks      | Get all tasks |
| PUT    | /api/tasks/{id} | Update a task |
| DELETE | /api/tasks/{id} | Delete a task |

## Real-Time Flow

1. Client sends request (REST API)
2. Backend updates database
3. Backend broadcasts event via WebSocket
4. All connected clients receive event
5. UI updates automatically

## Database Configuration

Update backend/src/main/resources/application.properties with your local PostgreSQL settings:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/task_manager
spring.datasource.username=postgres
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## Running the Application

### Prerequisites

- Java 17+
- PostgreSQL installed and running
- Node.js 18+

### Backend

1. Create the database:

```sql
CREATE DATABASE task_manager;
```

2. Move into the backend folder and run Spring Boot:

```bash
cd backend
./mvnw spring-boot:run
```

On Windows CMD:

```bat
cd backend
mvnw.cmd spring-boot:run
```

Backend server runs at:

```text
http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend dev server runs at:

```text
http://localhost:5173
```

## Known Limitations

- Authentication is not implemented yet
- Conflict resolution currently follows last-write-wins
- Offline support is not implemented

## Future Improvements

- User authentication and authorization
- Task filtering and search
- Notification system
- Dockerized deployment
- Pagination and performance optimization

## Key Learning Areas

- Real-time communication with WebSockets
- State synchronization across clients
- Backend architecture with Spring Boot
- Database integration with JPA

## Author

- Your Name
- GitHub: https://github.com/yourusername

## License

This project is currently intended for educational purposes.
