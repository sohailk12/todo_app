"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (session) {
      fetchTasks();
    }
  }, [session]);

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTask }),
    });
    if (res.ok) {
      fetchTasks();
      setNewTask("");
    }
  };

  const deleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  if (!session) {
    return <p>Loading...</p>;
  }
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome, {session.user.name}</h1>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded mt-4"
      >
        Sign Out
      </button>

      <div className="mt-8">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="border p-2 rounded"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
        >
          Add Task
        </button>
      </div>

      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center justify-between">
            <span>{task.name}</span>
            <div>
              <button
                onClick={() => deleteTask(task.id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
