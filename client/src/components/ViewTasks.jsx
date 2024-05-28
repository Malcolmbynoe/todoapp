// src/pages/ViewTasks.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';

function ViewTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    const req = new Request(
      'http://localhost:3000/tasks', {
      headers: {
          "content-type": "application/json"
      }
  }
  )

  fetch(req)
      .then(res => res.json())
      .then(data => {
          console.log(data.length)
          setTasks(data)
          // setFilteredBooks(data)
      })
      .catch(err => console.error(err))
  };
  
  

  const handleTaskComplete = async (taskId) => {
    try {
      await axios.put(`/update/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await axios.delete(`/remove/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-blue-300 bg-opacity-70">
      {sessionStorage.getItem("username")}
      <h1 className="text-2xl font-bold mb-4">View Tasks</h1>
      <TaskList tasks={tasks} onTaskComplete={handleTaskComplete} onTaskDelete={handleTaskDelete} />
    </div>
  );
}

export default ViewTasks;

