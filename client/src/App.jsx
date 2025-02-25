import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import AdminDashboard from './pages/Auth/Admin/AdminDashboard';
import UserDashboard from './pages/User/UserDashboard';

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserRole=()=>{
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log(user.role)
        setUserRole(user.role);
      } catch (error) {
        console.log("Error parsing user data:", error);
      }
    }
    setLoading(false);
  }

  useEffect(()=>{getUserRole();},[])
  // Check user role from localStorage
  // useEffect(() => {
  //   const userData = localStorage.getItem('user');
  //   if (userData) {
  //     try {
  //       const user = JSON.parse(userData);
  //       console.log(user.role)
  //       setUserRole(user.role);
  //     } catch (error) {
  //       console.log("Error parsing user data:", error);
  //     }
  //   }
  //   setLoading(false);
  // }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Role-based routing */}
        
        { userRole === 'admin' ? (
          <Route path="/" element={<AdminDashboard />} />
        ) : (
          <Route path="/" element={<UserDashboard />} />
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
