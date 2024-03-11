import { useTaskManager } from "../hook/userTaskManager";

export const Task = () => {
  const {
    title,
    setTitle,
    searchKeyword,
    tasks,
    addTask,
    completeTask,
    editTask,
    updateTask,
    handleSearch,
    editingTask,
  } = useTaskManager();

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearch}
          placeholder="Search Task"
        />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {tasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              {editingTask && editingTask.id === task.id ? (
                <>
                  <input
                    type="text"
                    value={editingTask.title}
                    onChange={(e) =>
                      updateTask(task.id, { title: e.target.value })
                    }
                  />
                  <button onClick={() => updateTask(task.id, editingTask)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{task.title}</span>
                  <button onClick={() => editTask(task)}>Edit</button>
                  <button onClick={() => completeTask(task.id)}>Done</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
