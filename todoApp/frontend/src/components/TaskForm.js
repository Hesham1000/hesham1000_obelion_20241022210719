import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.js.css';

const TaskForm = ({ onSaveTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      dueDate,
      priority,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/tasks', newTask, {
        headers: { 'Content-Type': 'application/json' }
      });
      onSaveTask(response.data);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Low');
      setError(null);
    } catch (err) {
      setError('Error creating task. Please try again.');
    }
  };

  return (
    <div className="task-form">
      <header className="task-form-header">Task Creation</header>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="task-title">Task Title</label>
          <input
            type="text"
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-desc">Description</label>
          <textarea
            id="task-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="due-date">Due Date</label>
          <input
            type="date"
            id="due-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority Level</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="save-task-button">Save Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
