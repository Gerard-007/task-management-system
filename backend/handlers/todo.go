package handlers

import (
	"TaskApp/models"
	"TaskApp/services"
	"github.com/gofiber/fiber/v2"
)

type TodoHandler struct {
	service *services.TodoService
}

func NewTodoHandler(service *services.TodoService) *TodoHandler {
	return &TodoHandler{service: service}
}

func (h *TodoHandler) GetTodos(ctx *fiber.Ctx) error {
	todos, err := h.service.GetAllTodos()
	if err != nil {
		return ctx.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return ctx.JSON(todos)
}

func (h *TodoHandler) CreateTodo(ctx *fiber.Ctx) error {
	todo := new(models.Todo)
	if err := ctx.BodyParser(todo); err != nil {
		return ctx.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	id, err := h.service.CreateTodo(todo)
	if err != nil {
		return ctx.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	todo.ID = id
	return ctx.Status(201).JSON(fiber.Map{"status": "success", "todo": todo})
}

func (h *TodoHandler) UpdateTodo(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	if err := h.service.UpdateTodo(id, true); err != nil {
		return ctx.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return ctx.Status(200).JSON(fiber.Map{"status": "success"})
}

func (h *TodoHandler) DeleteTodo(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	if err := h.service.DeleteTodo(id); err != nil {
		return ctx.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return ctx.Status(200).JSON(fiber.Map{"status": "success"})
}
