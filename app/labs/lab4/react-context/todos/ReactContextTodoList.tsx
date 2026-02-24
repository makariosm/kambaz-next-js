"use client";
import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useTodos } from "./todosContext";

export default function ReactContextTodoList() {
  const { todos } = useTodos();

  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
