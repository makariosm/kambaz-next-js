"use client";
import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
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
