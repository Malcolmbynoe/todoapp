// src/pages/AddTask.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const navigate = useNavigate()
  const [msg, setMsg] = useState("")
  const [task, setTask] = useState("")
  const [owner, setOwner] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [formData, setFormData] = useState({
    task: "",
    owner: "",
    dueDate: "",
    isPublic: ""
  })


  
  const handleSubmit = (e) => {
    e.preventDefault()

    setFormData({
      ...formData,
      ["task"]: task,
      ["owner"]:owner,
      ["dueDate"]:dueDate
  })

    const req = new Request(
    'http://localhost:3000/tasks', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(formData)
    }
    )
      fetch(req)
      .then(res => res.json())
      .then(data => {
          console.log(data)
          setMsg(data)
          navigate("/tasks")
      })
      .catch(err => console.error(err))
}

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Task</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={owner}
          onChange={(e) =>setOwner (e.target.value)}
          placeholder="Task"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Owner"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <label className="block mb-4">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          Public Task
        </label>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
