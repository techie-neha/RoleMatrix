import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Dashboard</h1>
      {user && <h2>Welcome, {user.firstname}!</h2>}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default UserDashboard;