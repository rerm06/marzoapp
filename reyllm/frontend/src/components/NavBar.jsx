import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAppContext } from '../context/AppContext.jsx';

const NavBar = () => {
  const { user, setUser } = useAppContext();

  const handleLogout = () => {
    console.log("Attempting to log out...");
    setUser(null);
    console.log("User logged out successfully.");
    // Note: Actual logout logic like API call to invalidate session should be implemented here.
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          reyllm
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/workspace">
              Workspace
            </Button>
            {user.roles && user.roles.includes('admin') && (
              <Button color="inherit" component={Link} to="/role-manager">
                Role Manager
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;