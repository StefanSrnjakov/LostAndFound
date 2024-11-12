import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const { login, error, loading } = useAuthContext();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleLogin = async () => {
    try { 
      setLocalError(null);
      await login(email, password);
    } catch (err) {
      setLocalError('Login failed. Please check your email or password.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, py: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Welcome Back!
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
        Please log in to continue
      </Typography>

      {localError && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {localError}
        </Typography>
      )}

      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          helperText="Enter your email address"
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          helperText="Enter your password"
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
      </Box>

      <Typography align="center" sx={{ mt: 2, color: 'text.secondary' }}>
        Don’t have an account?{' '}
        <Button component={Link} to="/register" sx={{ p: 0, textTransform: 'none', fontWeight: 'bold' }}>
          Register
        </Button>
      </Typography>
    </Container>
  );
};

export default Login;
