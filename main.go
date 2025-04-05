package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"log"
	"os"
)

type Todo struct {
	ID        int    `json:"id"`
	Completed bool   `json:"completed"`
	Text      string `json:"text"`
}

func main() {
	app := fiber.New()

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	PORT := os.Getenv("PORT")

	var todos []Todo

	// Todo List
	app.Get("/api/todos", func(ctx *fiber.Ctx) error {
		if len(todos) > 0 {
			return ctx.Status(200).JSON(todos)
		}
		return ctx.Status(404).JSON(fiber.Map{"message": "Empty, no tasks available"})
	})

	// Todo Create
	app.Post("/api/todos", func(ctx *fiber.Ctx) error {
		todo := &Todo{}
		if err := ctx.BodyParser(todo); err != nil {
			return err
		}
		if todo.Text == "" {
			return ctx.Status(400).JSON(fiber.Map{"error": "Todo body is required"})
		}

		todo.ID = len(todos) + 1
		todos = append(todos, *todo)
		return ctx.Status(201).JSON(todo)
	})

	// Todo Update
	app.Patch("/api/todos/:id", func(ctx *fiber.Ctx) error {
		id := ctx.Params("id")
		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos[i].Completed = true
				return ctx.Status(200).JSON(todos[i])
			}
		}
		return ctx.Status(400).JSON(fiber.Map{"error": "Todo not found"})
	})

	// Todo Delete
	app.Delete("/api/todos/:id", func(ctx *fiber.Ctx) error {
		id := ctx.Params("id")
		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos = append(todos[:i], todos[i+1:]...)
				return ctx.Status(200).JSON(fiber.Map{"message": "Deleted successfully"})
			}
		}
		return ctx.Status(400).JSON(fiber.Map{"error": "Todo not found"})
	})

	log.Fatal(app.Listen(":" + PORT))
}
