// src/pages/Login.jsx
import React, { useState } from 'react';
import  'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [input, setInput] = useState('');
  const navigate = useNavigate()

  const handleLogin = () => {
    sessionStorage.setItem("username", input)
    navigate("/tasks")
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Enter your username"
        />
        <button onClick={handleLogin} className="w-full p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
