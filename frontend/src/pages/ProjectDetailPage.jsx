import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateTaskModal from '../components/CreateTaskModal';
import { fetchWithToken, fetchTasksByProject } from '../utils/api';
import { useAuth } from '../context/AuthContext';


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
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task._id} className="border p-3 rounded shadow-sm">
              <h4 className="font-semibold">{task.title}</h4>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-sm text-blue-700 mt-1">Status: {task.status}</p>
              {task.completedAt && (
                <p className="text-sm text-green-600">Completed At: {new Date(task.completedAt).toLocaleString()}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectDetailPage;
