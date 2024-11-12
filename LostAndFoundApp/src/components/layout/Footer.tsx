// src/components/Footer.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <AppBar position="static" color="primary" sx={{ top: 'auto', bottom: 0, padding: '5px 0' }}>
      <Toolbar sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
        
        <Typography variant="body2" align="center" color="inherit" sx={{ mb: 1 }}>
          Your go-to app for finding and reporting lost items. Secure, reliable, and community-driven.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Link href="/" color="inherit" underline="none" variant="body2">
            Home
          </Link>
          <Link href="/about" color="inherit" underline="none" variant="body2">
            About Us
          </Link>
          <Link href="/contact" color="inherit" underline="none" variant="body2">
            Contact
          </Link>
          <Link href="/privacy" color="inherit" underline="none" variant="body2">
            Privacy Policy
          </Link>
          <Link href="/terms" color="inherit" underline="none" variant="body2">
            Terms of Service
          </Link>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
          <IconButton color="inherit" href="#" aria-label="Facebook">
            <Facebook fontSize="small" />
          </IconButton>
          <IconButton color="inherit" href="#" aria-label="Twitter">
            <Twitter fontSize="small" />
          </IconButton>
          <IconButton color="inherit" href="#" aria-label="Instagram">
            <Instagram fontSize="small" />
          </IconButton>
          <IconButton color="inherit" href="#" aria-label="LinkedIn">
            <LinkedIn fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="caption" align="center" color="inherit" sx={{ mt: 1 }}>
          © 2024 My Application. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
