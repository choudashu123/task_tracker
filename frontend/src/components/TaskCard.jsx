import { useState } from 'react';
import EditTaskModal from './EditTaskModal';
import { fetchWithToken } from '../utils/api';

const TaskCard = ({ task, onUpdate, onDelete, token }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      const data = await fetchWithToken(`/tasks/${task._id}`, "DELETE", null, token);
      onDelete(task._id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <div className="mt-2 text-sm text-gray-500">
        <p>Status: {task.status}
          {task.completedAt && (
            <span> @
            {task.completedAt
              ? new Date(task.completedAt).toLocaleDateString()
              : 'Unknown'}</span>
          )}
        </p>
        <p>Created:{' '}
      {task.createdAt
        ? new Date(task.createdAt).toLocaleDateString()
        : 'Unknown'}</p>
      </div>

      <div className="flex justify-end mt-3 space-x-2">
        <button onClick={() => setIsEditOpen(true)} className="text-blue-600 hover:underline">
          Edit
        </button>
        <button onClick={handleDelete} className="text-red-600 hover:underline">
          Delete
        </button>
      </div>

      {isEditOpen && (
        <EditTaskModal
          task={task}
          onClose={() => setIsEditOpen(false)}
          onUpdate={(updatedTask) => {
            onUpdate(updatedTask);
            setIsEditOpen(false);
          }}
          token={token}
        />
      )}
    </div>
  );
};

export default TaskCard;
