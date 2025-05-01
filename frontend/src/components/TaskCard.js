
const TaskCard = ({ task }) => {
    const { title, description, status, dateCreated, dateCompleted } = task;
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <div className="mt-2 text-sm text-gray-500">
          <p>Status: {status}</p>
          <p>Created: {new Date(dateCreated).toLocaleDateString()}</p>
          {dateCompleted && <p>Completed: {new Date(dateCompleted).toLocaleDateString()}</p>}
        </div>
      </div>
    );
  };
  
  export default TaskCard;
  