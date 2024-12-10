import { useEffect, useState } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
      } else {
        setError("There was a problem retrieving tasks.");
      }
    } catch (err) {
      setError("Connection to the server failed.");
    }
  };

  // Add a new task
  const addTask = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTask }),
      });
      if (response.ok) {
        setNewTask("");
        fetchTasks();
      } else {
        setError("There was a problem adding the task.");
      }
    } catch (err) {
      setError("Connection to the server failed.");
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchTasks();
      } else {
        setError("There was a problem deleting the task.");
      }
    } catch (err) {
      setError("Connection to the server failed.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {error && <p>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="New task ..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
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

export default Dashboard;
