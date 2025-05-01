import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchWithToken, postData } from '../utils/api';
import CreateProjectModal from '../components/CreateProjectModal';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect if not logged in
      return; // Stop execution if user is not logged in
    }

    const fetchProjects = async () => {
      try {
        const res = await fetchWithToken(`/projects`, 'GET', null, user.token); // Make sure `user.token` is passed
        console.log('Fetched Projects:', res); // Add this line

        setProjects(res);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, [user, navigate]);

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await fetchWithToken('/projects', 'POST', projectData, user.token);
      setProjects([...projects, newProject]);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Projects</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Create Projects
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={logout}>Logout</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <button
              onClick={() => navigate(`/project/${project._id}`)}
              className="bg-blue-500 mt-4 text-white-500 hover:underline"
            >
              View Tasks
            </button>
          </div>
        ))}
      </div>
      

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
};

export default DashboardPage;
