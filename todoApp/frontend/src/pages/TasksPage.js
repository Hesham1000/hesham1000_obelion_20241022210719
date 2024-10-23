import React, { useState } from 'react';
import axios from 'axios';
import './TasksPage.js.css';

const TasksPage = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState(null);

  const handleSaveTask = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/tasks', {
        title: taskTitle,
        description: taskDescription,
        dueDate,
        priority
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        setTaskTitle('');
        setTaskDescription('');
        setDueDate('');
        setPriority('Low');
        setError(null);
        alert('Task created successfully!');
      }
    } catch (err) {
      setError('Error creating task');
    }
  };

  return (
    <div className="tasks-page">
      <header className="tasks-page-header">
        Task Creation
      </header>
      <nav className="tasks-page-nav">
        <div className="nav-tab active">Details</div>
        <div className="nav-tab">Review</div>
      </nav>
      <main className="tasks-page-main">
        <form className="task-form">
          <label htmlFor="taskTitle">Task Title:</label>
          <input
            type="text"
            id="taskTitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <label htmlFor="taskDescription">Task Description:</label>
          <textarea
            id="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <label htmlFor="priority">Priority Level:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button
            type="button"
            className="save-task-button"
            onClick={handleSaveTask}
          >
            Save Task
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </main>
      <footer className="tasks-page-footer">
        <p>Manage your tasks efficiently with our task creation tool.</p>
        <a href="/terms">Terms</a>
        <a href="/contact">Contact</a>
      </footer>
    </div>
  );
};

export default TasksPage;
