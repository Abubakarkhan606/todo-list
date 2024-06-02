import { useState } from "react";

interface Props {
  onAdd: (name: string) => void;
}

function TaskForm({ onAdd }: Props) {
  const [taskName, setTaskName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd(taskName);
    setTaskName("");
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <button>+</button>
        <input
          type="text"
          placeholder="Enter new task..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </form>
    </>
  );
}

export default TaskForm;
