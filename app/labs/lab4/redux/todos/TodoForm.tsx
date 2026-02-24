import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center gap-3 py-3">
      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        className="w-50"
      />

      <div className="ms-auto d-flex gap-3">
        <Button
          variant="warning"
          className="px-4"
          onClick={() => dispatch(updateTodo(todo))}
          id="wd-update-todo-click"
        >
          Update
        </Button>

        <Button
          variant="success"
          className="px-4"
          onClick={() => dispatch(addTodo(todo))}
          id="wd-add-todo-click"
        >
          Add
        </Button>
      </div>
    </ListGroupItem>
  );
}
