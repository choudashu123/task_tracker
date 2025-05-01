import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getData, postData } from '../utils/api';
import TaskCard from '../components/TaskCard';
import CreateTaskModal from '../components/CreateTaskModal';

const ProjectPage = () => {
  const { projectId } = useParams(); // Get project ID from URL
  const [tasks, setTasks] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getData(`/tasks?projectId=${projectId}`);
        setTasks(res);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, [projectId]);

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await postData(`/tasks`, { ...taskData, projectId });
      setTasks([...tasks, newTask]);
      setIsTaskModalOpen(false);
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Project Tasks</h2>
        <button
          onClick={() => setIsTaskModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Task
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
          key={task._id}
          task={task}
          onUpdate={(updatedTask) =>
            setTasks((prevTasks) =>
              prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
            )
          }
          onDelete={(deletedId) =>
            setTasks((prevTasks) => prevTasks.filter((t) => t._id !== deletedId))
          } />
        ))}
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onCreate={handleCreateTask}
      />
    </div>
  );
};

export default ProjectPage;
