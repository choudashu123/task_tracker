import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import ProjectDetailPage from './pages/ProjectDetailPage';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <header className="p-4 flex justify-end">
        <DarkModeToggle />
      </header>
    <Routes>
      <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/project/:id" element={<ProjectDetailPage />} />
    </Routes>
    </div>
  );
}

export default App;