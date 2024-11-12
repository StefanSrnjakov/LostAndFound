import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SessionExpired: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20vh' }}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Session Expire
            </Box>
        </Container>
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20vh' }}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Session Expire
            </Box>
        </Container>
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20vh' }}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Session Expire
            </Box>
        </Container>
    );
};

export default SessionExpired;