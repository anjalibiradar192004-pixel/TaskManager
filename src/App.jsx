import React, { useEffect, useState } from 'react'
import Taskform from './Taskform'
import Tasklist from './Tasklist'
import ProgressTracker from './ProgressTracker'

export default function App() {
  // Load tasks from localStorage initially so they don't disappear on refresh
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    // FIX 1: Prevent adding empty tasks if the user just clicks the button
    if (!task.text || !task.text.trim()) return;

    setTasks((prevTasks) => [...prevTasks, task]);
  }

  const updateTask = (updatedTask, index) => {
    const newtasks = [...tasks];
    newtasks[index] = updatedTask;
    setTasks(newtasks);
  }

  // FIX 2: Added 'index' to the function parameter so delete actually works
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  }
const clearTasks = () => {
    setTasks([]);
  }

  return (
    <div>
      <h1 style={{color: '#4361ee' }}>Task Master</h1>
      <p><i>The friendly task manager</i></p>
      <Taskform addTask={addTask} />
      <Tasklist tasks={tasks} 
       updateTask = {updateTask}
       deleteTask = {deleteTask}
       />

      <ProgressTracker tasks={tasks} />

      {tasks.length>0 &&
      (<button onClick= {clearTasks}
        className='cleat-btn'>
          Cear All Tasks</button>
        )}
    </div>
  )
}


