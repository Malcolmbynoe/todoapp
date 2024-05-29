// src/components/TaskItem.jsx
import React from 'react';
import TaskList from './TaskList';
import ViewTasks from './ViewTasks';
import { useNavigate } from 'react-router-dom';

function TaskItem({ task,  onTaskComplete, onTaskDelete }) {
  const handleComplete = () => {
    onTaskComplete(task._id,task.completed);
  };

  const handleDelete = () => {
    onTaskDelete(task._id);
  };

  return (
    <div className="task-item p-4 border border-gray-300 rounded mb-4">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Task's: {""}</p>
      <p>Details: {""}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Status: {task.completed ? 'Completed' : 'To be completed'}</p>
      <button 
        onClick={handleComplete} 
        className={`p-2 rounded ${task.completed ? 'bg-gray-400' : 'bg-green-500 text-white'}`}
        // disabled={task.completed}
      >
        {task.completed ? 'Completed' : 'Mark as Complete'}
      </button>
      <button 
        onClick={handleDelete} 
        className="p-2 bg-red-500 text-white rounded ml-4"
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
