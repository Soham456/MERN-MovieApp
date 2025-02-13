import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          MovieApp
        </Typography>
        <Button color="inherit" href="/">Home</Button>
        <Button color="inherit" href="/login">Admin</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
