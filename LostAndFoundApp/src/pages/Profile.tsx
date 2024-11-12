import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Divider,
  TextField,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { User } from '../models/Profile';

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const profile = await authService.fetchUserProfile();
        setUser(profile);
      } catch (err) {
        setError('Failed to load profile data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await authService.deleteAccount();
      authService.logout();
      navigate('/login');
    } catch (err) {
      setError('Failed to delete account. Please try again.');
    } finally {
      setDeleting(false);
      setOpen(false);
    }
  };

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
    setError(null);
  };

  const handleSaveProfile = async () => {
    try {
      if (user) {
        await authService.updateUserProfile(user);
        setEditMode(false);
        setError(null);
      }
    } catch (error) {
      setError('Failed to save profile. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, py: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        <PersonIcon fontSize="large" sx={{ mr: 1 }} />
        Profile
      </Typography>

      {error && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        {loading ? (
          <CircularProgress color="primary" sx={{ my: 4 }} />
        ) : (
          <>
            <Avatar alt="Profile Image" src="profile.png" sx={{ width: 120, height: 120, mb: 2 }} />

            {user ? (
              <>
                {editMode ? (
                  <>
                    <TextField
                      label="First Name"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Last Name"
                      value={user.surname}
                      onChange={(e) => setUser({ ...user, surname: e.target.value })}
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      label="Birthdate"
                      type="date"
                      value={user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : ''}
                      onChange={(e) => setUser({ ...user, birthdate: new Date(e.target.value) })}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      sx={{ mb: 2 }}
                    />
                    <Box display="flex" justifyContent="center" gap={2} mt={2}>
                      <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSaveProfile}>
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<CancelIcon />}
                        onClick={handleEditToggle}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                      <PersonIcon color="primary" /> {user.name} {user.surname}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" display="flex" alignItems="center" gap={1}>
                      <EmailIcon color="primary" /> {user.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" display="flex" alignItems="center" gap={1} mt={1}>
                      <CakeIcon color="primary" /> Birthdate: {new Date(user.birthdate).toLocaleDateString()}
                    </Typography>

                    <Divider sx={{ my: 2 }} />
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                      sx={{ px: 3 }}
                      onClick={handleEditToggle}
                    >
                      Edit Profile
                    </Button>
                  </>
                )}

                <Divider sx={{ my: 2 }} />

                {/* View Items Button */}
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ListAltIcon />}
                  component={Link}
                  to="/my-items"
                  sx={{ mt: 2 }}
                >
                  View My Items
                </Button>

                {/* Delete Account Button */}
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => setOpen(true)}
                  sx={{ mt: 4 }}
                  disabled={deleting}
                >
                  {deleting ? <CircularProgress size={24} color="inherit" /> : 'Delete Account'}
                </Button>
              </>
            ) : (
              <Typography color="textSecondary">Profile data not available</Typography>
            )}
          </>
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} disableEscapeKeyDown>
        <DialogTitle color="error">Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete your account? This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="error" disabled={deleting}>
            {deleting ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
