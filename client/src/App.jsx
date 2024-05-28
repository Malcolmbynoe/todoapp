import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ViewTasks from './components/ViewTasks';
import Login from './components/Login';
import AddTask from './components/AddTask';


function App() { 
    return (
        <>
        {sessionStorage.getItem("username")? sessionStorage.getItem("username"):"No user"}
        <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/tasks" element={<ViewTasks />} />
            <Route path="/addtask" element={<AddTask/>}/>
        </Routes>
        </>
    );
}

export default App;