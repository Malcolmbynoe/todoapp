// src/components/TaskList.jsx
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onTaskComplete, onTaskDelete }) {
  if (!tasks.length) {
    return <p className="text-center">No tasks available</p>;
  }

  return (
    <div className="task-list">
      {tasks.length}
      {tasks.map(task => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onTaskComplete={onTaskComplete} 
          onTaskDelete={onTaskDelete} 
        />
      ))}
    </div>
  );
}

export default TaskList;
