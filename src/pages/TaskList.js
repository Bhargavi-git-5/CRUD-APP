import React, { useState, useEffect } from "react";
import API from "../api/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      alert("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  return (
    <div>
      <h1>Your Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
