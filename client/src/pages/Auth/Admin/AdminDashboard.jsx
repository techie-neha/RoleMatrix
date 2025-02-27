
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from "../../../components/button";
import ManageTeam from './ManageTeam';
import ManageUser from './ManageUser';
const admin = JSON.parse(localStorage.getItem('user'));

function Navbar({ onSelect, onLogout }) {
  

  return (
    <div className="d-flex justify-content-between border-bottom">
      <p className="h3   text-dark font-bold">Contactify</p>
      <div>      {admin && <h4 className='text-center pt-2'>Admin: <span className='text-primary'>{admin.firstname} {admin.lastname} </span> </h4>}</div>
      <div className="flex gap-4">
        <Button onClick={() => onSelect("manageUser")}>Manage User</Button>
        <Button onClick={() => onSelect("manageTeam")}>Manage Team</Button>
        <Button onClick={onLogout}>Logout</Button>
      </div>
    </div>
  );
}



const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('manageUser');
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
    <div className="pt-16" style={{ padding: '20px' }}>
      <Navbar onSelect={setActivePage} onLogout={handleLogout} />
      {activePage === 'manageUser' ? <ManageUser /> : <ManageTeam />}
    </div>
  );
};

export default AdminDashboard;
