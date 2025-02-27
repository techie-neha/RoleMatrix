

  
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaUsers } from 'react-icons/fa';

// function ManageTeam() {
//   const [teams, setTeams] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3001/api/v0/team/getTeams', {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//     })
//     .then((response) => {
//       if (response.data.success) {
//         setTeams(response.data.teams);
//       } else {
//         console.error('Failed to fetch teams:', response.data.message);
//       }
//     })
//     .catch((error) => {
//       console.error('Error fetching teams:', error);
//     });
//   }, []);

//   return (
//     <div className="container py-4">
//       <div className="row g-4">
//         {teams.length > 0 ? (
//           teams.map((team) => (
//             <div key={team._id} className="col-12 col-md-6 col-lg-4">
//               <div className="card shadow-sm p-3">
//                 <div className="d-flex align-items-center gap-3">
//                 <FaUsers size={32} className="text-primary" />

//                   <div>
//                     <h3 className="h5 fw-bold mb-1">{team.name}</h3>
//                     <p className="text-muted mb-0">{team.members.length} Members</p>
//                     <p className="text-muted mb-0">{team.members.map(member => member.email).join(', ')}</p>

//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-muted">No teams found</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ManageTeam;


import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers } from 'react-icons/fa';



function ManageTeam() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/v0/team/getTeams', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      if (response.data.success) {
        setTeams(response.data.teams);
      } else {
        console.error('Failed to fetch teams:', response.data.message);
      }
    })
    .catch((error) => {
      console.error('Error fetching teams:', error);
    });
  }, []);


  const handleDeleteTeam = (id,name) => {
    axios.delete(`http://localhost:3001/api/v0/team/deleteTeam/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((response) => {
      if (response.data.success) {
        alert(`Team ${name} Deleted Successfully`)
        setTeams((prevTeams) => prevTeams.filter((team) => team._id !== id));
      } else {
        console.error('Failed to delete team:', response.data.message);
      }
    })
    .catch((error) => {
      console.error('Error deleting team:', error);
    });
  };

  return (
    <div className="container py-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team._id} className="col">
              <div className="card team-card h-100">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex align-items-center mb-3">
                    <FaUsers size={32} className="text-primary me-3" />
                    <h5 className="card-title mb-0">{team.name}</h5>
                  </div>
                  <p className="card-text text-muted">
                    {team.members.length} Members
                  </p>
                  <p className="card-text text-muted">
                    {team.members.map(member => member.email).join(', ')}
                  </p>
                  <div className="mt-auto">
                  <button 
                      className="btn btn-outline-danger" 
                      onClick={() => handleDeleteTeam(team._id,team.name)}
                    >
                      Delete Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-center  text-muted">No teams found</h3>
        )}
      </div>
    </div>
  );
}

export default ManageTeam;
