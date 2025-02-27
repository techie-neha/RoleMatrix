import { useEffect, useState } from 'react';
import axios from 'axios';

function ManageUser() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/api/v0/allusers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      })
      .then((response) => {
        if (response.data.success) {
          setUsers(response.data.users); // Set users in state
        } else {
          console.error('Failed to fetch users:', response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className="p-4">
 
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-primary">
          <tr>
            <th>#</th>
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
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
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
