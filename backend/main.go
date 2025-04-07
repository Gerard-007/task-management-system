package main

import (
	"TaskApp/handlers"
	"TaskApp/repository"
	"TaskApp/services"
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	if os.Getenv("ENV") != "production" {
		// Load environment variables
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	// MongoDB setup
	MONGODB_URI := os.Getenv("MONGODB_URI")
	clientOptions := options.Client().ApplyURI(MONGODB_URI)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())
	fmt.Println("Connected to MongoDB!")
	collection := client.Database("golang_todo_db").Collection("todos")

	// Initialize layers
	repo := repository.NewTodoRepository(collection)
	service := services.NewTodoService(repo)
	handler := handlers.NewTodoHandler(service)

	// Fiber app setup
	app := fiber.New()
	//app.Use(cors.New(cors.Config{
	//	AllowOrigins: "http://localhost:5173",
	//	AllowHeaders: "Origin,Content-Type,Accept",
	//}))
	app.Get("/api/todos", handler.GetTodos)
	app.Post("/api/todos", handler.CreateTodo)
	app.Patch("/api/todos/:id", handler.UpdateTodo)
	app.Delete("/api/todos/:id", handler.DeleteTodo)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	if os.Getenv("ENV") == "production" {
		app.Static("/", "../client/dist")
	}
	log.Fatal(app.Listen("0.0.0.0:" + port))
}
