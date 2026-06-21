import React from 'react'

export default function Tasklist({ tasks, updateTask, deleteTask }) {
  const toggleComplete = (index) => {
    // FIX 1: Renamed the variable to 'updatedTask' to avoid shadowing the 'updateTask' prop
    const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
    updateTask(updatedTask, index);
  }

  return (
    <ul className='task-list'>
      {/* FIX 2: Added a 'return' statement inside the map function so items actually render */}
      {tasks.map((task, index) => {
        return (
          <li key={index}>
            <div>
              {/* Optional UI fix: apply line-through if completed */}
              <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.text}
                <small> ({task.priority}, {task.category})</small>
              </span>
            </div>
            <div>
              <button onClick={() => toggleComplete(index)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => deleteTask(index)}>Delete</button>
            </div>
          </li>
        );
      })} 
    </ul>
  )
}