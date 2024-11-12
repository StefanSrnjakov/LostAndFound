import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

interface NavbarProps {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, mode }) => {
  const { user, logout } = useAuthContext();
  const [itemsMenuAnchor, setItemsMenuAnchor] = useState<null | HTMLElement>(null);
  const logoSrc = 'Logo.webp';

  const handleItemsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setItemsMenuAnchor(event.currentTarget);
  };

  const handleItemsMenuClose = () => {
    setItemsMenuAnchor(null);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <Box
            component="img"
            src={logoSrc}
            alt="Lost and Found concept"
            sx={{
              width: '120px',
              height: 'auto',
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          {/* Primary Navigation Links */}
          <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about" startIcon={<InfoIcon />}>
            About
          </Button>

          {/* Items Dropdown */}
          {user && (
            <>
              <Button
                color="inherit"
                startIcon={<MoreVertIcon />}
                onClick={handleItemsMenuOpen}
              >
                Items
              </Button>
              <Menu
                anchorEl={itemsMenuAnchor}
                open={Boolean(itemsMenuAnchor)}
                onClose={handleItemsMenuClose}
                keepMounted
              >
                <MenuItem onClick={handleItemsMenuClose} component={Link} to="/my-items">
                  <InventoryIcon fontSize="small" sx={{ mr: 1 }} />
                  My Items
                </MenuItem>
                <MenuItem onClick={handleItemsMenuClose} component={Link} to="/lost-items">
                  <SearchIcon fontSize="small" sx={{ mr: 1 }} />
                  Lost Items
                </MenuItem>
                <MenuItem onClick={handleItemsMenuClose} component={Link} to="/found-items">
                  <SearchIcon fontSize="small" sx={{ mr: 1 }} />
                  Found Items
                </MenuItem>
                <MenuItem onClick={handleItemsMenuClose} component={Link} to="/add-item">
                  <AddCircleOutlineIcon fontSize="small" sx={{ mr: 1 }} />
                  Add Item
                </MenuItem>
              </Menu>
            </>
          )}

          {/* Profile and Auth Buttons */}
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/profile" startIcon={<AccountCircleIcon />}>
                Profile
              </Button>
              <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon />}>
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}

          {/* Theme Toggle Button */}
          <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 2 }}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
