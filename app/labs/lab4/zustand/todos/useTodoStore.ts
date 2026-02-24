import { create } from "zustand";

export type Todo = { id: string; title: string };

interface TodosState {
  todos: Todo[];
  todo: Todo;

  setTodo: (todo: Todo) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
  resetTodo: () => void;
}

const emptyTodo = (): Todo => ({ id: "", title: "" });

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const useTodosStore = create<TodosState>((set) => ({
  todos: [],
  todo: emptyTodo(),

  setTodo: (todo) => set({ todo }),

  resetTodo: () => set({ todo: emptyTodo() }),

  addTodo: (incoming) =>
    set((state) => {
      const title = incoming.title.trim();
      if (!title) return state;

      const newTodo: Todo = { id: makeId(), title };
      return {
        todos: [newTodo, ...state.todos],
        todo: emptyTodo(),
      };
    }),

  updateTodo: (incoming) =>
    set((state) => {
      const title = incoming.title.trim();
      if (!incoming.id) return state;
      if (!title) return state;

      return {
        todos: state.todos.map((t) =>
          t.id === incoming.id ? { ...t, title } : t,
        ),
        todo: emptyTodo(),
      };
    }),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
      todo: state.todo.id === id ? emptyTodo() : state.todo,
    })),
}));
