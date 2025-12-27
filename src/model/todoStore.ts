import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

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

export const todoSlice: StateCreator<
  TodosState & TodosActions,
  [["zustand/devtools", never]]
> = (set, get) => ({
  todos: [],
  addTodo: (title: string) => {
    set(
      { todos: [...get().todos, { title, isCompleted: false }] },
      false,
      `add Todo ${title}`
    );
  },
  toggleTodo: (index: number) => {
    const { todos } = get();

    set(
      {
        todos: [
          ...todos.slice(0, index),
          { ...todos[index], isCompleted: !todos[index].isCompleted },
          ...todos.slice(index + 1),
        ],
      },
      false,
      `change Todo ${index}`
    );
  },
  deleteTodo: (index: number) => {
    set({ todos: get().todos.filter((_, i) => i !== index) });
  },
});

export const useTodosStore = create<TodosState & TodosActions>()(
  devtools(todoSlice)
);
