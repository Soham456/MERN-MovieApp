import React, { useEffect, useState } from 'react';
import movieApi from '../api/movieApi';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await movieApi.loginUser({ email, password });
      localStorage.setItem('token', response.data.token);
      setError('');
      alert('Login successful!');
      navigate('/admin');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        padding: 3,
        gap: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>
      
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ maxWidth: 400 }}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ maxWidth: 400 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={loading}
        fullWidth
        sx={{ maxWidth: 400 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginPage;
