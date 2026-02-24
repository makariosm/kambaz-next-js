"use client";
import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useTodosStore } from "./useTodoStore";

export default function ZustandTodoList() {
  const { todos } = useTodosStore((s) => s);

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
