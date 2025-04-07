package services

import (
	"TaskApp/models"
	"TaskApp/repository"
	"fmt"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TodoService struct {
	repo *repository.TodoRepository
}

func NewTodoService(repo *repository.TodoRepository) *TodoService {
	return &TodoService{repo: repo}
}

func (s *TodoService) GetAllTodos() ([]models.Todo, error) {
	return s.repo.FindAll()
}

func (s *TodoService) CreateTodo(todo *models.Todo) (primitive.ObjectID, error) {
	if todo.Title == "" || todo.Body == "" {
		return primitive.NilObjectID, fmt.Errorf("title and body are required")
	}
	return s.repo.Insert(todo)
}

func (s *TodoService) UpdateTodo(id string, completed bool) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return fmt.Errorf("invalid ID")
	}
	return s.repo.Update(objectID, completed)
}

func (s *TodoService) DeleteTodo(id string) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return fmt.Errorf("invalid ID")
	}
	return s.repo.Delete(objectID)
}
