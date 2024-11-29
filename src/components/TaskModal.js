import React, { useState } from "react";
import API from "../api/api";

const TaskModal = ({ task, onClose, fetchTasks }) => {
  const [formData, setFormData] = useState(task || { title: "", description: "", dueDate: "", status: "Pending" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await API.put(`/tasks/${task._id}`, formData);
      } else {
        await API.post("/tasks", formData);
      }
      fetchTasks();
      onClose();
    } catch (err) {
      alert("Failed to save task");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Save</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default TaskModal;
