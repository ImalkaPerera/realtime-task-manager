# Realtime Collaborative Task Manager

A full-stack web application designed to manage tasks collaboratively, with planned real-time synchronization across multiple users.

---

## 🚀 Overview

This project aims to demonstrate how to build a real-time system using Spring Boot, PostgreSQL, and WebSockets, where task updates are reflected instantly across all connected clients.

Currently, the backend foundation and database integration are implemented, with real-time features and frontend integration in progress.

---

## 📊 Project Status

* Backend setup and database connection: ✅ Completed
* Task entity and repository: ✅ Completed
* Basic CRUD APIs (GET, POST): ⏳ In Progress
* Update & Delete APIs: ❌ Not implemented yet
* WebSocket real-time updates: ❌ Not implemented yet
* Frontend (React) integration: ❌ Not implemented yet

---

## 🧩 Features (Planned & In Progress)

* Create, update, delete, and view tasks
* Real-time synchronization across multiple clients (via WebSockets)
* Persistent storage using PostgreSQL
* Clean layered backend architecture

---

## 🛠️ Tech Stack

### Backend

* Java
* Spring Boot
* Spring Web (REST APIs)
* Spring Data JPA
* Spring WebSocket (planned)

### Database

* PostgreSQL (Local or Neon Cloud)

### Frontend (Planned)

* React
* Axios
* STOMP.js
* Vite

---

## 🧱 Architecture Overview

The backend follows a layered architecture:

Client → Controller → Service → Repository → Database

### Responsibilities:

* **Controller**: Handles HTTP requests and responses
* **Service**: Contains business logic
* **Repository**: Manages database operations using JPA
* **Database**: Stores persistent task data

---

## 📁 Repository Structure

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
└── frontend/ (planned)
```

---

## 🔌 API Endpoints

| Method | Endpoint        | Description   |
| ------ | --------------- | ------------- |
| POST   | /api/tasks      | Create a task |
| GET    | /api/tasks      | Get all tasks |
| PUT    | /api/tasks/{id} | Update a task |
| DELETE | /api/tasks/{id} | Delete a task |

---

## 🧪 Example API Usage

### Create Task

POST /api/tasks

```json
{
    "title": "Learn Spring Boot",
    "description": "Build backend APIs",
    "status": "TODO"
}
```

---

### Get All Tasks

GET /api/tasks

Response:

```json
[]
```

---

## 🔄 Planned Real-Time Flow

1. Client sends request (REST API)
2. Backend updates database
3. Backend broadcasts event via WebSocket
4. All connected clients receive update
5. UI updates automatically

---

## 🗃️ Database Configuration

### Local PostgreSQL

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/task_manager
spring.datasource.username=postgres
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### Neon Cloud Database (Optional)

```properties
spring.datasource.url=jdbc:postgresql://<your-neon-url>?sslmode=require
spring.datasource.username=<your-username>
spring.datasource.password=<your-password>
```

---

## ▶️ Running the Application

### Prerequisites

* Java 17+
* PostgreSQL (local or Neon)
* Node.js 18+

---

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Windows:

```bat
mvnw.cmd spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

---

### Frontend (Planned)

```bash
cd frontend
npm install
npm run dev
```

---

## ⚠️ Known Limitations

* No authentication implemented
* Real-time updates not implemented yet
* Conflict resolution not handled
* No frontend UI currently

---

## 🚧 Future Improvements

* Implement WebSocket-based real-time updates
* Build React frontend interface
* Add authentication & authorization
* Add task filtering and search
* Dockerize application
* Improve scalability and performance

---

## 🧠 Key Learning Areas

* Spring Boot backend architecture
* REST API design
* Database integration with JPA
* Preparing for real-time systems using WebSockets

---

## 👤 Author

* Senesh
* GitHub: https://github.com/ImalkaPerera

---

## 📄 License

This project is intended for educational purposes.
