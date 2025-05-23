
# Todo App

### Overview
The Todo App is a simple RESTful API built with Go (Golang) to manage a list of todos. It uses a layered architecture (handlers, services, repository) for modularity and maintainability, with MongoDB as the database. The app supports creating, reading, updating, and deleting todos via HTTP endpoints.

### Features
- **Create Todo**: Add a new todo with a title, body, and completion status.
- **Read Todos**: Retrieve all todos.
- **Update Todo**: Mark a todo as completed.
- **Delete Todo**: Remove a todo by ID.

### Tech Stack
- **Language**: Go (Golang)
- **Framework**: Fiber (HTTP server)
- **Database**: MongoDB
- **Dependencies**: godotenv (environment variables), mongo-driver (MongoDB client)

### Project Structure
'''
todo-app/
├── main.go              # Entry point
├── models/             # Data models
│   └── todo.go
├── handlers/           # Presentation layer (HTTP handlers)
│   └── todo.go
├── services/           # Service layer (business logic)
│   └── todo.go
├── repository/         # Repository layer (data access)
│   └── todo.go
├── .env                # Environment variables
├── go.mod              # Go module file
├── go.sum              # Dependency checksums
└── README.md           # This file
'''

### Prerequisites
- **Go**: Version 1.16 or higher
- **MongoDB**: Running locally or accessible via a URI
- **Git**: For cloning the repository

### Setup Instructions
1. **Clone the Repository**
'''
git clone <repository-url>
    cd todo-app
    '''

    2. **Install Dependencies**
    Initialize a Go module and install required packages:
    '''
    go mod init todo-app
    go get github.com/gofiber/fiber/v2
    go get github.com/joho/godotenv
    go get go.mongodb.org/mongo-driver/mongo
    '''

    3. **Configure Environment Variables**
    Create a `.env` file in the root directory with the following:
    '''
    MONGODB_URI=mongodb://localhost:27017
    PORT=8080
    '''
    - `MONGODB_URI`: Your MongoDB connection string.
    - `PORT`: The port to run the app on (defaults to 8080 if not set).

    4. **Run MongoDB**
    Ensure MongoDB is running locally or update `MONGODB_URI` to point to your instance.

    5. **Start the Application**
    '''
    go run main.go
    '''
    The server will start at `http://localhost:8080` (or the port specified in `.env`).

    ### API Endpoints
    #### GET /api/todos
    - **Description**: Retrieve all todos.
    - **Response**:
    '''
    [
    {"id": "67f2c910cd9e3ddc42632dcd", "title": "Test", "completed": false, "body": "Test body"}
    ]
    '''

    #### POST /api/todos
    - **Description**: Create a new todo.
    - **Request Body**:
    '''
    {"title": "Test", "body": "Test body", "completed": false}
    '''
    - **Response**:
    '''
    {"status": "success", "todo": {"id": "67f2c910cd9e3ddc42632dcd", "title": "Test", "completed": false, "body": "Test body"}}
    '''
    - **Status**: 201 Created

    #### PATCH /api/todos/:id
    - **Description**: Mark a todo as completed.
    - **Example**: `PATCH /api/todos/67f2c910cd9e3ddc42632dcd`
    - **Response**:
    '''
    {"status": "success"}
    '''
    - **Status**: 200 OK

    #### DELETE /api/todos/:id
    - **Description**: Delete a todo by ID.
    - **Example**: `DELETE /api/todos/67f2c910cd9e3ddc42632dcd`
    - **Response**:
    '''
    {"status": "success"}
    '''
    - **Status**: 200 OK

    ### Error Handling
    - **400 Bad Request**: Invalid ID, missing fields, or malformed request body.
    - **500 Internal Server Error**: Database or server issues.

    ### Testing the API
    Use a tool like `curl`, Postman, or Insomnia:
    - **Get all todos**:
    '''
    curl http://localhost:8080/api/todos
    '''
    - **Create a todo**:
    '''
    curl -X POST -H "Content-Type: application/json" -d '{"title":"Test","body":"Test body"}' http://localhost:8080/api/todos
    '''
    - **Update a todo**:
    '''
    curl -X PATCH http://localhost:8080/api/todos/67f2c910cd9e3ddc42632dcd
    '''
    - **Delete a todo**:
    '''
    curl -X DELETE http://localhost:8080/api/todos/67f2c910cd9e3ddc42632dcd
    '''

    ### Notes
    - The app uses a layered architecture for separation of concerns:
    - **Handlers**: HTTP request/response logic.
    - **Services**: Business logic and validation.
    - **Repository**: MongoDB interactions.
    - The MongoDB database is `golang_todo_db`, collection `todos`.

    ### Contributing
    1. Fork the repository.
    2. Create a feature branch (`git checkout -b feature-name`).
    3. Commit changes (`git commit -m "Add feature"`).
    4. Push to the branch (`git push origin feature-name`).
    5. Open a pull request.

    ### License
    This project is unlicensed—feel free to use and modify it as needed!

    ---

    This `README.md` provides a clear guide for anyone using or contributing to your Todo App. Let me know if you’d like to adjust anything!