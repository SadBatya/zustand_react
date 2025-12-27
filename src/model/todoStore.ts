import { create, type StateCreator } from "zustand";

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

export const todoSlice: StateCreator<TodosState & TodosActions> = (
  set,
  get
) => ({
  todos: [],
  addTodo: (title: string) => {
    set({ todos: [...get().todos, { title, isCompleted: false }] });
  },
  toggleTodo: (index: number) => {
    const { todos } = get();

    set({
      todos: [
        ...todos.slice(0, index),
        { ...todos[index], isCompleted: !todos[index].isCompleted },
        ...todos.slice(index + 1),
      ],
    });
  },
  deleteTodo: (index: number) => {
    set({ todos: get().todos.filter((_, i) => i !== index) });
  },
});

export const useTodosStore = create<TodosState & TodosActions>(todoSlice);
