import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    if (newTaskTitle) {
      setTasks((prevValues) => {
        const newTask = {
          id: new Date().getTime(),
          title: newTaskTitle,
          isComplete: false,
        };
        return [...prevValues, newTask];
      });
      setNewTaskTitle("");
    } else {
      null
    }
  }

  function handleToggleTaskCompletion(id: number) {
    let changedTasks = [...tasks];

    let task = {
      ...changedTasks[id],
    };

    if (task.isComplete === false) {
      task.isComplete = true;
    } else if (task.isComplete === true) {
      task.isComplete = false;
    }

    changedTasks[id] = task;

    setTasks(changedTasks);
    console.log(id);
  }

  function handleRemoveTask(id: number) {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => {
        return task.id !== id;
      });
    });
    console.log(tasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task, index) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(index)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
