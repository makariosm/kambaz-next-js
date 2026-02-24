"use client";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

export type Todo = { id: string; title: string };

type TodosContextState = {
  todos: Todo[];
  todo: Todo;

  setTodo: (todo: Todo) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
};

const TodosContext = createContext<TodosContextState | undefined>(undefined);

const emptyTodo = (): Todo => ({ id: "", title: "" });

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo>(emptyTodo());

  const addTodo = (incoming: Todo) => {
    const title = incoming.title.trim();
    if (!title) return;

    const newTodo: Todo = { id: makeId(), title };
    setTodos((prev) => [newTodo, ...prev]);
    setTodo(emptyTodo());
  };

  const updateTodo = (incoming: Todo) => {
    const title = incoming.title.trim();
    if (!incoming.id) return; // must be editing an existing todo
    if (!title) return;

    setTodos((prev) =>
      prev.map((t) => (t.id === incoming.id ? { ...t, title } : t)),
    );
    setTodo(emptyTodo());
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    // if deleting the currently edited todo, clear the form
    setTodo((curr) => (curr.id === id ? emptyTodo() : curr));
  };

  const value = useMemo(
    () => ({
      todos,
      todo,
      setTodo,
      addTodo,
      updateTodo,
      deleteTodo,
    }),
    [todos, todo],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used within <TodosProvider />");
  return ctx;
}
