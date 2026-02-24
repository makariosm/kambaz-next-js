import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center py-3">
      <span className="fs-5">{todo.title}</span>

      <div className="d-flex gap-3">
        <Button
          variant="primary"
          className="px-4"
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
        >
          Edit
        </Button>

        <Button
          variant="danger"
          className="px-4"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
        >
          Delete
        </Button>
      </div>
    </ListGroupItem>
  );
}
