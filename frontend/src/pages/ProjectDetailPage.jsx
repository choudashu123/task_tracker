import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateTaskModal from '../components/CreateTaskModal';
import { fetchWithToken, fetchTasksByProject } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';


const ProjectDetailPage = () => {
  const { user } = useAuth();
  const { id: projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const data = await fetchWithToken(`/tasks/project/${projectId}`, "GET", null, user.token);
      console.log('Fetched Tasks:', data);
      setTasks(data);
    } catch {
      console.error("unable to fetch tasks")
    }
  }
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await fetchWithToken('/tasks', "POST", taskData, user.token)
      console.log("adding new task", newTask)
      setTasks([...tasks, newTask]);
      setModalOpen(false);
    } catch (err) {
      console.error("error creating task", err)
    }
  };
  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };
  
  const handleDeleteTask = (deletedId) => {
    setTasks((prev) => prev.filter((task) => task._id !== deletedId));
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Project Details</h2>
      <p className="mb-4 text-gray-600">Project ID: {projectId}</p>

      <button
        onClick={() => setModalOpen(true)}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Create Task
      </button>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateTask}
        projectId={projectId}
      />

      <h3 className="text-xl font-semibold mb-2">Tasks:</h3>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet for this project.</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} token={user.token} />
          ))}
          </div>
        )}
    </div>
  );
};

export default ProjectDetailPage;
