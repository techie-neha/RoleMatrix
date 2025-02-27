import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from "../../components/button";
import  ManageContact from './manageContact';
import { useAuth } from '../../context/authContext';
const user = JSON.parse(localStorage.getItem('user'));


function Navbar({ onSelect, onLogout }) {
  const { user } = useAuth();
  return (
    <div className="d-flex justify-content-between border-bottom">
      <p className="h3   text-dark font-bold">Contactify</p>
      <div>      {user && <h4 className='text-center pt-2'>Standard User : <span className='text-primary'>{user.firstname} {user.lastname} </span> </h4>}</div>
      <div className="flex gap-4">
        <Button onClick={() => onSelect("manageContact")}>Manage Contact</Button>
        <Button onClick={onLogout}>Logout</Button>
      </div>
    </div>
  );
}



const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('manageContact');
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
      <ManageContact/> 
    </div>
  );
};

export default UserDashboard;
