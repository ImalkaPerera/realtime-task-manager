# Realtime Collaborative Task Manager

A full-stack web application for managing tasks in real time, where changes made by any user are instantly reflected across all connected clients — no page refresh needed.

---

## 🚀 Overview

Built with **Spring Boot** on the backend and **React** on the frontend, this app uses **STOMP over WebSocket** to push live task events (created, updated, deleted) to every connected browser the moment a change happens.

---

## 📊 Project Status

| Feature                          | Status |
|----------------------------------|--------|
| Backend setup & database         | ✅ Done |
| Task entity & repository         | ✅ Done |
| Full CRUD REST APIs              | ✅ Done |
| WebSocket real-time updates      | ✅ Done |
| React frontend UI                | ✅ Done |
| Frontend ↔ Backend integration   | ✅ Done |

---

## ✨ Features

- **Create, update, delete, and view tasks** via REST API
- **Real-time sync** — all connected browsers update instantly via WebSocket (STOMP)
- **Auto-reconnect** — frontend reconnects automatically if the connection drops
- **Persistent storage** using PostgreSQL (local or Neon Cloud)
- Clean layered backend architecture (Controller → Service → Repository)

---

## 🛠️ Tech Stack

### Backend
- Java 17+
- Spring Boot
- Spring Web (REST APIs)
- Spring Data JPA
- Spring WebSocket + STOMP

### Database
- PostgreSQL (Local or Neon Cloud)

### Frontend
- React (Vite)
- Axios (REST calls)
- `@stomp/stompjs` (WebSocket client)

---

## 🧱 Architecture

```
Browser (React)
   │
   ├── REST (Axios) ──────► TaskController ──► TaskService ──► PostgreSQL
   │
   └── WebSocket (STOMP) ◄── SimpMessagingTemplate (broadcasts on every mutation)
                              │
                         /topic/tasks
```

### Real-Time Flow
1. User action triggers a REST call (POST / PUT / DELETE)
2. Backend saves the change to the database
3. `SimpMessagingTemplate` broadcasts a JSON event to `/topic/tasks`
4. All subscribed React clients receive `{ type, task }` instantly
5. React updates its local state — no re-fetch needed

---

## 📁 Project Structure

```text
.
├── backend/
│   ├── src/main/java/com/senesh/taskmanager/
│   │   ├── config/
│   │   │   └── WebSocketConfig.java      # STOMP broker + endpoint config
│   │   ├── controller/
│   │   │   └── TaskController.java       # REST endpoints
│   │   ├── service/
│   │   │   └── TaskService.java          # CRUD logic + WebSocket broadcasts
│   │   ├── repository/
│   │   │   └── TaskRepository.java       # JPA repository
│   │   ├── model/
│   │   │   └── Task.java                 # Task entity
│   │   ├── exception/
│   │   │   └── ResourceNotFoundException.java
│   │   └── TaskManagerApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
└── frontend/
    └── src/
        ├── App.jsx          # Main UI component
        ├── App.css          # Styles
        ├── api.js           # Axios REST helper functions
        ├── websocket.js     # STOMP WebSocket client
        └── main.jsx         # React entry point
```

---

## 🔌 API Endpoints

| Method | Endpoint          | Description        |
|--------|-------------------|--------------------|
| GET    | `/api/tasks`      | Get all tasks      |
| POST   | `/api/tasks`      | Create a task      |
| PUT    | `/api/tasks/{id}` | Update a task      |
| DELETE | `/api/tasks/{id}` | Delete a task      |

### WebSocket
| Destination     | Direction         | Description                        |
|-----------------|-------------------|------------------------------------|
| `/ws`           | Client → Server   | WebSocket handshake endpoint       |
| `/topic/tasks`  | Server → Clients  | Real-time task event broadcasts    |

---

## 🧪 Example API Usage

### Create a Task
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Learn Spring Boot",
  "description": "Build backend APIs",
  "status": "TODO"
}
```

### WebSocket Event (received by all clients)
```json
{
  "type": "CREATED",
  "task": {
    "id": 1,
    "title": "Learn Spring Boot",
    "description": "Build backend APIs",
    "status": "TODO"
  }
}
```

Event `type` values: `CREATED` · `UPDATED` · `DELETED`

---

## 🗃️ Database Configuration

### Local PostgreSQL (`application.properties`)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/task_manager
spring.datasource.username=postgres
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Neon Cloud (Optional)
```properties
spring.datasource.url=jdbc:postgresql://<your-neon-url>?sslmode=require
spring.datasource.username=<your-username>
spring.datasource.password=<your-password>
```

---

## ▶️ Running the Application

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL (local or Neon Cloud)

### Backend
```bash
cd backend
./mvnw spring-boot:run        # Linux / macOS
mvnw.cmd spring-boot:run      # Windows
```
Runs at: `http://localhost:8080`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at: `http://localhost:5173`

---

## ⚠️ Known Limitations

- No authentication or authorization
- No conflict resolution for simultaneous edits
- WebSocket uses an in-memory broker (not suitable for multi-instance deployments)

---

## 🚧 Future Improvements

- Add user authentication (Spring Security / JWT)
- Replace in-memory broker with RabbitMQ or Redis for scalability
- Add task filtering, search, and priority levels
- Dockerize both services
- Deploy to cloud (Render / Railway / AWS)

---

## 🧠 Key Learning Areas

- Spring Boot layered architecture
- REST API design with Spring Web
- Real-time communication with Spring WebSocket + STOMP
- React state management with live WebSocket data

---

## 👤 Author

- **Senesh**
- GitHub: [ImalkaPerera](https://github.com/ImalkaPerera)

---

## 📄 License

This project is intended for educational purposes.
