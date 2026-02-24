"use client";
import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useTodosStore } from "./useTodoStore";

export default function TodoForm() {
  const { todo, setTodo, addTodo, updateTodo } = useTodosStore((s) => s);

  return (
    <ListGroupItem className="d-flex align-items-center gap-3 py-3">
      <FormControl
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        className="w-50"
      />

      <div className="ms-auto d-flex gap-3">
        <Button
          variant="warning"
          className="px-4"
          onClick={() => updateTodo(todo)}
          id="wd-update-todo-click"
        >
          Update
        </Button>

        <Button
          variant="success"
          className="px-4"
          onClick={() => addTodo(todo)}
          id="wd-add-todo-click"
        >
          Add
        </Button>
      </div>
    </ListGroupItem>
  );
}
