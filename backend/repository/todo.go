package repository

import (
	"TaskApp/models"
	"context"
	"errors"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type TodoRepository struct {
	collection *mongo.Collection
}

func NewTodoRepository(collection *mongo.Collection) *TodoRepository {
	return &TodoRepository{collection: collection}
}

func (r *TodoRepository) FindAll() ([]models.Todo, error) {
	var todos []models.Todo
	cursor, err := r.collection.Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())
	for cursor.Next(context.Background()) {
		var todo models.Todo
		if err := cursor.Decode(&todo); err != nil {
			return nil, err
		}
		todos = append(todos, todo)
	}
	return todos, nil
}

func (r *TodoRepository) Insert(todo *models.Todo) (primitive.ObjectID, error) {
	result, err := r.collection.InsertOne(context.Background(), todo)
	if err != nil {
		return primitive.NilObjectID, err
	}
	return result.InsertedID.(primitive.ObjectID), nil
}

func (r *TodoRepository) Update(id primitive.ObjectID, completed bool) error {
	filter := bson.M{"_id": id} // Use "_id" instead of "id" to match MongoDB's convention
	update := bson.M{"$set": bson.M{"completed": completed}}
	result, err := r.collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return err
	}
	if result.MatchedCount == 0 {
		return errors.New("no todo found with the given ID")
	}
	if result.ModifiedCount == 0 {
		return errors.New("todo was not updated (possibly already in the desired state)")
	}
	return nil
}

func (r *TodoRepository) Delete(id primitive.ObjectID) error {
	filter := bson.M{"_id": id} // Use "_id" here too
	result, err := r.collection.DeleteOne(context.Background(), filter)
	if err != nil {
		return err
	}
	if result.DeletedCount == 0 {
		return errors.New("no todo found with the given ID")
	}
	return nil
}
