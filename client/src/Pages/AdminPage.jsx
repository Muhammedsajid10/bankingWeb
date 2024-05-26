// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../Contexts/AuthContext';

// const AdminPage = () => {
//   const { user, logout } = useAuth();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:5000/userRoute', {
//           headers: { Authorization: `Bearer ${user.data}` }, // Include the token in the request headers
//         });
//         setUsers(data);
//       } catch (error) {
//         console.error('Failed to fetch users', error);
//       }
//     };
//     fetchData();
//   }, [user]); // Trigger useEffect when the user object changes

//   const disableUser = async (userId) => {
//     try {
//       await axios.put(`http://localhost:5000/userRoute/${userId}/disable`, {}, {
//         headers: { Authorization: `Bearer ${user.data}` }, // Include the token in the request headers
//       });
//       setUsers(users.map(u => u._id === userId ? { ...u, isActive: false } : u));
//     } catch (error) {
//       console.error('Failed to disable user', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Admin Panel</h1>
//       <button onClick={logout}>Logout</button>
//       <h3>Users</h3>
//       <ul>
//         {users.map((user) => (
//           <li key={user._id}>
//             {user.name} - {user.email} - {user.isActive ? 'Active' : 'Disabled'}
//             {user.isActive && <button onClick={() => disableUser(user._id)}>Disable</button>}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminPage;
















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useAuth } from '../Contexts/AuthContext';

const AdminPage = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook to navigate programmatically

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/userRoute', {
          headers: { Authorization: `Bearer ${user.data}` },
        });
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };
    fetchData();
  }, [user]);

  const disableUser = async (userId) => {
    try {
      await axios.put(`http://localhost:5000/userRoute/${userId}/disable`, {}, {
        headers: { Authorization: `Bearer ${user.data}` },
      });
      setUsers(users.map(u => u._id === userId ? { ...u, isActive: false } : u));
    } catch (error) {
      console.error('Failed to disable user', error);
    }
  };

  useEffect(() => {
    // Check if user is logged in and is admin, then navigate to admin page
    if (user && user.isAdmin) {
      navigate('/admin');
    }
  }, [user, navigate]); // Navigate only when user or navigate function changes

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={logout}>Logout</button>
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.isActive ? 'Active' : 'Disabled'}
            {user.isActive && <button onClick={() => disableUser(user._id)}>Disable</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
