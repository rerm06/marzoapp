import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleManager = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users').then((response) => {
      setUsers(response.data);
    }).catch((error) => {
      console.error('Failed to fetch users:', error.message, error.stack);
      alert('Failed to fetch users. Please try again.');
    });
  }, []);

  const updateUserRole = (userId, role) => {
    axios.patch(`/api/users/${userId}`, { role }).then(() => {
      alert('Role updated successfully!');
      // Refresh users to show updated roles
      axios.get('/api/users').then((response) => {
        setUsers(response.data);
      }).catch((error) => {
        console.error('Failed to fetch users after update:', error.message, error.stack);
        alert('Failed to refresh users. Please manually reload the page.');
      });
    }).catch((error) => {
      console.error('Failed to update user role:', error.message, error.stack);
      alert('Failed to update role. Please try again.');
    });
  };

  return (
    <div>
      <h2>User Roles</h2>
      {users.map((user) => (
        <div key={user._id}>
          <span>{user.username}: {user.roles.join(', ')}</span>
          <button onClick={() => updateUserRole(user._id, 'admin')}>Make Admin</button>
          <button onClick={() => updateUserRole(user._id, 'user')}>Make User</button>
        </div>
      ))}
    </div>
  );
};

export default RoleManager;