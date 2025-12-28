import { Card, Checkbox, Input, Button } from "antd";
import { useTodosStore } from "../model/todoStore";

import { useState } from "react";
import clsx from "clsx";

export const SectionCounter = () => {
  const [title, setTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const { todos, addTodo, toggleTodo, deleteTodo } = useTodosStore();

  const handleDeleteTodo = () => {
    if (!currentIndex) return;

    deleteTodo(currentIndex);
    setCurrentIndex(null);
  };

  return (
    <div className="section_counter">
      <Input
        style={{ width: 300 }}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo(title);
            setTitle("");
          }
        }}
      />
      <Button onClick={() => addTodo(title)}>Добавить задачу</Button>
      <Button disabled={currentIndex === null} onClick={handleDeleteTodo}>
        Удалить задачу
      </Button>
      {todos.map(({ isCompleted, title }, index) => (
        <Card
          className={clsx("card", currentIndex === index && "card_active")}
          onClick={() => setCurrentIndex(index)}
          key={index}
        >
          <Checkbox checked={isCompleted} onChange={() => toggleTodo(index)} />
          <span>{title}</span>
        </Card>
      ))}
    </div>
  );
};
