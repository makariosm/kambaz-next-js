"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function ArrayStateVariable() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables">
      <h2 className="fw-bold">Array State Variable</h2>

      <button onClick={addElement} className="btn btn-success mb-3">
        Add Element
      </button>

      <ul className="list-group">
        {array.map((item, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span className="fs-5 fw-semibold">{item}</span>

            <button
              onClick={() => deleteElement(index)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
