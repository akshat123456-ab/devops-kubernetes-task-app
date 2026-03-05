"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../lib/api";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import Input from "../components/Input";
import Button from "../components/Button"
import Card from "../components/Card";
import Loader from "../components/Loader";
import Toast from "../components/Toast";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [completingId, setCompletingId] = useState(null);
  const { user } = useAuth();
  const { toast, showToast, closeToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    loadTasks();
  }, [user, router]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
      setError("");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to load tasks";
      setError(errorMsg);
      showToast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const validateTask = () => {
    if (!title.trim()) {
      setTitleError("Task title is required");
      return false;
    }
    if (title.length > 200) {
      setTitleError("Task title must be 200 characters or less");
      return false;
    }
    return true;
  };

  const addTask = async (e) => {
    e.preventDefault();
    
    if (!validateTask()) {
      showToast("Please fix the errors", "error");
      return;
    }

    setSubmitting(true);
    try {
      await API.post("/tasks", { title: title.trim() });
      setTitle("");
      setTitleError("");
      showToast("Task added successfully!", "success");
      await loadTasks();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to add task";
      showToast(errorMsg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const completeTask = async (id) => {
    setCompletingId(id);
    try {
      await API.put(`/tasks/${id}`, { completed: true });
      showToast("Task marked as complete!", "success");
      await loadTasks();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to complete task";
      showToast(errorMsg, "error");
    } finally {
      setCompletingId(null);
    }
  };

  const deleteTask = async (id) => {
    setDeletingId(id);
    try {
      await API.delete(`/tasks/${id}`);
      showToast("Task deleted successfully!", "success");
      await loadTasks();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to delete task";
      showToast(errorMsg, "error");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Dashboard</h1>
          <p className="text-gray-600">Manage and organize your tasks efficiently</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card variant="subtle">
            <div className="text-3xl font-bold text-blue-600">{tasks.length}</div>
            <p className="text-gray-600 text-sm">Total Tasks</p>
          </Card>
          <Card variant="subtle">
            <div className="text-3xl font-bold text-green-600">{completedCount}</div>
            <p className="text-gray-600 text-sm">Completed</p>
          </Card>
          <Card variant="subtle">
            <div className="text-3xl font-bold text-orange-600">{pendingCount}</div>
            <p className="text-gray-600 text-sm">Pending</p>
          </Card>
        </div>

        {/* Add Task Section */}
        <Card variant="elevated" className="mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Task</h2>
          <form onSubmit={addTask} className="space-y-4">
            <Input
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError("");
              }}
              error={titleError}
              disabled={submitting}
            />
            <Button
              type="submit"
              variant="primary"
              loading={submitting}
              disabled={submitting || !title.trim()}
            >
              {submitting ? "Adding..." : "Add Task"}
            </Button>
          </form>
        </Card>

        {/* Tasks List */}
        <Card variant="elevated">
          <h2 className="text-xl font-bold mb-4">Tasks ({tasks.length})</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-gray-500 text-lg">No tasks yet. Create one to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className={`flex items-center gap-4 p-4 border rounded-lg transition-all ${
                    task.completed
                      ? "bg-gray-50 border-gray-200"
                      : "bg-white border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => completeTask(task._id)}
                    disabled={completingId === task._id}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 cursor-pointer"
                  />
                  
                  <div className="flex-1">
                    <p
                      className={`text-lg ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {!task.completed && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => completeTask(task._id)}
                        loading={completingId === task._id}
                        disabled={completingId === task._id}
                      >
                        ✓ Done
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteTask(task._id)}
                      loading={deletingId === task._id}
                      disabled={deletingId === task._id}
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </div>
  );
}