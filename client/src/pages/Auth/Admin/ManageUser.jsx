import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/authContext';

const user = JSON.parse(localStorage.getItem('user'));
function ManageUser() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/v0/allusers', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        console.error('Failed to fetch users:', response.data.message);
      }
    })
    .catch((error) => {
      console.error('Error fetching users:', error);
    });
  }, []);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleCreateTeam = () => {
    if (!teamName || selectedUsers.length === 0) {
      alert('Please enter a team name and select at least one user!');
      return;
    }

    axios.post('http://localhost:3001/api/v0/team/createteam', {
      name: teamName,
      memberEmails: users.filter((user) => selectedUsers.includes(user._id)).map((user) => user.email)
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      if (response.data.success) {
        alert('Team created successfully!');
        setIsCreatingTeam(false);
        setSelectedUsers([]);
        setTeamName('');
      } else {
        alert('Failed to create team: ' + response.data.message);
      }
    })
    .catch((error) => {
      console.error('Error creating team:', error);
    });
  };

  return (
    <div className="p-4">
      <button 
        className="btn btn-primary mb-3" 
        onClick={() => setIsCreatingTeam(!isCreatingTeam)}
      >
        {isCreatingTeam ? 'Cancel Team Creation' : 'Create Team'}
      </button>

      {isCreatingTeam && (
        <div className="mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter Team Name" 
            value={teamName} 
            onChange={(e) => setTeamName(e.target.value)}
          />
          <button 
            className="btn btn-success mt-2" 
            onClick={handleCreateTeam}
          >
            Submit Team
          </button>
        </div>
      )}

      <table className="table table-bordered table-striped mt-3">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            {isCreatingTeam && <th>Select</th>}
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                {isCreatingTeam && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleCheckboxChange(user._id)}
                    />
                  </td>
                )}
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={isCreatingTeam ? 6 : 5} className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUser;

