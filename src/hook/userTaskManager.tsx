import { nanoid } from "nanoid";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
}

export const useTaskManager = () => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const completeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, ...taskUpdate };
      }
      return task;
    });
    setTasks(newTasks);
    setEditingTask(null);
  };

  const addTask = () => {
    if (title.length < 1) {
      return;
    }
    const newTask = {
      id: nanoid(),
      title,
    };
    setTasks((prev) => prev.concat(newTask));
    setTitle("");
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    title,
    setTitle,
    searchKeyword,
    setSearchKeyword,
    tasks: filteredTasks,
    addTask,
    completeTask,
    editTask,
    updateTask,
    handleSearch,
    editingTask,
  };
};
