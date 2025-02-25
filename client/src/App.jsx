import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Login from './pages/Auth/Login';
import AdminDashboard from './pages/Auth/Admin/AdminDashboard';
import UserDashboard from './pages/User/UserDashboard';
import { ProtectedRoute, ProtectedRouteNonAdmin } from './components/ProtectedRoute';
import Signup from './pages/Auth/Signup';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>

          {/* Admin Dashboard*/}
          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={['admin']} />}
          />

          {/* UserDashboard*/}
          <Route path="/dashboard" element={<ProtectedRouteNonAdmin element={<UserDashboard />} />} />

          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
