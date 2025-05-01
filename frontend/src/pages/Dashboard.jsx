// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { fetchWithToken, postData } from '../utils/api';
// import CreateProjectModal from '../components/CreateProjectModal';
// import { Button } from '../components/ui/button'
// import { Plus, LogOut } from 'lucide-react'

// const DashboardPage = () => {
//   const { user, logout } = useAuth();
//   const [projects, setProjects] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate('/login'); // Redirect if not logged in
//       return; // Stop execution if user is not logged in
//     }

//     const fetchProjects = async () => {
//       try {
//         const res = await fetchWithToken(`/projects`, 'GET', null, user.token); // Make sure `user.token` is passed
//         console.log('Fetched Projects:', res); // Add this line

//         setProjects(res);
//       } catch (err) {
//         console.error('Error fetching projects:', err);
//       }
//     };

//     fetchProjects();
//   }, [user, navigate]);

//   const handleCreateProject = async (projectData) => {
//     try {
//       const newProject = await fetchWithToken('/projects', 'POST', projectData, user.token);
//       setProjects([...projects, newProject]);
//       setIsModalOpen(false);
//     } catch (err) {
//       console.error('Error creating project:', err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-700 p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Your Projects</h2>
//         <Button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//         >
//           <Plus />Create Projects
//         </Button>
//         <Button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" onClick={logout}><LogOut />Logout</Button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {projects.map((project) => (
//           <div key={project._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold">{project.title}</h3>
//             <Button
//               onClick={() => navigate(`/project/${project._id}`)}
//               className="bg-blue-500 mt-4 text-white dark:text-white hover:bg-black hover:underline"
//             >
//               View Tasks
//             </Button>
//           </div>
//         ))}
//       </div>


//       {/* Create Project Modal */}
//       <CreateProjectModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onCreate={handleCreateProject}
//       />
//     </div>
//   );
// };

// export default DashboardPage;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchWithToken } from '../utils/api';
import CreateProjectModal from '../components/CreateProjectModal';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, LogOut, FolderOpen } from 'lucide-react';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProjects = async () => {
      try {
        const res = await fetchWithToken(`/projects`, 'GET', null, user.token);
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
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">📁 Your Projects</h2>
        <div className="flex gap-2">
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
          <Button variant="destructive" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project._id} className="transition hover:shadow-xl hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-muted-foreground" />
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate(`/project/${project._id}`)}
                variant="outline"
                className="w-full"
              >
                View Tasks
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
};

export default DashboardPage;
