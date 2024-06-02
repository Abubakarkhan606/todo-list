import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState<{ name: string; done: boolean }[]>([]);
  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(tasks);
  }, []);
  function addTask(name: string) {
    setTasks((prev) => {
      return [...prev, { name: name, done: false }];
    });
  }

  function removeTask(indexToRemove: number) {
    setTasks((prev) => {
      return prev.filter((name, index) => index !== indexToRemove);
    });
  }

  function updateTaskDone(taskIndex: number, newDone: boolean) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  const numberComplete = tasks.filter((t) => t.done).length;
  const numberTotal = tasks.length;
  const getMessage = () => {
    const percentage = (numberComplete / numberTotal) * 100;
    if (percentage === 0) return "Try to do atleast one!";
    else if (percentage === 100) return "Nice job for today!";
    return "Keep it going!";
  };

  function renameTasks(index: number, newName: string) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }
  return (
    <main>
      <h1>
        {numberComplete}/{numberTotal} Complete
      </h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          {...task}
          onToggle={(done) => updateTaskDone(index, done)}
          onDelete={() => {
            removeTask(index);
          }}
          onRename={(newName) => renameTasks(index, newName)}
        />
      ))}
    </main>
  );
}

export default App;
