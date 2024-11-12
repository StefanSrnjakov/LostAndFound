import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    birthdate: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Check if passwords match
    if (formData.password !== formData.repeatPassword) {
      setError("Passwords don't match.");
      setLoading(false);
      return;
    }

    // Convert birthdate to Date object before sending to backend
    const userData = {
      ...formData,
      birthdate: new Date(formData.birthdate),
    };

    try {
      await authService.register(userData);
      setSuccess(true);
      setLoading(false);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, py: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Create an Account
      </Typography>

      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {success && (
        <Typography color="primary" align="center" sx={{ mb: 2 }}>
          Registration successful! You can now log in.
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="First Name"
          name="name"
          variant="outlined"
          required
          value={formData.name}
          onChange={handleChange}
          helperText="Enter your first name"
        />
        <TextField
          label="Last Name"
          name="surname"
          variant="outlined"
          required
          value={formData.surname}
          onChange={handleChange}
          helperText="Enter your last name"
        />
        <TextField
          label="Birthdate"
          name="birthdate"
          type="date"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          required
          value={formData.birthdate}
          onChange={handleChange}
          helperText="Select your date of birth"
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          variant="outlined"
          required
          value={formData.email}
          onChange={handleChange}
          helperText="We'll never share your email with anyone else"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          required
          value={formData.password}
          onChange={handleChange}
          helperText="Must be at least 8 characters"
        />
        <TextField
          label="Confirm Password"
          name="repeatPassword"
          type="password"
          variant="outlined"
          required
          value={formData.repeatPassword}
          onChange={handleChange}
          helperText="Re-enter your password to confirm"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            py: 1.2,
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
