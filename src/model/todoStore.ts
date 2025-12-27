import { create } from "zustand";

export type TodoType = {
  title: string;
  isCompleted: boolean;
};

type TodosActions = {
  addTodo: (title: string) => void;
  toggleTodo: (index: number) => void;
  deleteTodo: (index: number) => void;
};

export type TodosState = {
  todos: TodoType[];
};

export const useTodosStore = create<TodosState & TodosActions>((set, get) => ({
  todos: [],
  addTodo: (title: string) => {
    set({ todos: [...get().todos, { title, isCompleted: false }] });
  },
  toggleTodo: (index: number) => {
    set({
      todos: get().todos.map((todo, i) =>
        i === index ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    });
  },
  deleteTodo: (index: number) => {
    set({ todos: get().todos.filter((_, i) => i !== index) });
  },
}));
