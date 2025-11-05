import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AccountCircle } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };
  return (
    <AppBar position="static" sx={{ bgcolor: '#1976d2', boxShadow: 3 }}>
      <Toolbar>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            fontWeight: 700,
            letterSpacing: 1.2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
          onClick={() => navigate('/')}
        >
          🗺️ SafeMap
        </Typography>
        
        {isAuthenticated ? (
          <Box>
            <Button color="inherit" onClick={() => navigate('/map')}>
              Map
            </Button>
            <Button color="inherit" onClick={() => navigate('/reports')}>
              Reports
            </Button>
            {user?.role === 'admin' && (
              <Button color="inherit" onClick={() => navigate('/admin')}>
                Admin
              </Button>
            )}
            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate('/register')}>
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

