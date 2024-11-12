// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

const commonColors = {
  success: {
    main: '#4caf50',
  },
  error: {
    main: '#f44336',
  },
  warning: {
    main: '#ff9800',
  },
  info: {
    main: '#2196f3',
  },
};

// Light theme scrollbar styles
const lightScrollbarStyles = {
  "&::-webkit-scrollbar": {
    width: '8px',
    height: '8px',
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: '#b0b0b0',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: '#9e9e9e',
  },
};

// Dark theme scrollbar styles
const darkScrollbarStyles = {
  "&::-webkit-scrollbar": {
    width: '8px',
    height: '8px',
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: '#2e2e2e',
    borderRadius: '8px',
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: '#5a5a5a',
    borderRadius: '8px',
    border: '2px solid #2e2e2e',
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: '#4a4a4a',
  },
};

// Light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    ...commonColors,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 400 },
    h6: { fontWeight: 400 },
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none' } },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // Apply the light scrollbar styles globally
        html: lightScrollbarStyles,
        body: lightScrollbarStyles,
        "*": lightScrollbarStyles,
      },
    },
  },
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#ffffff', secondary: '#bbbbbb' },
    ...commonColors,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 400 },
    h6: { fontWeight: 400 },
  },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: 'none' } },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // Apply the dark scrollbar styles globally
        html: darkScrollbarStyles,
        body: darkScrollbarStyles,
        "*": darkScrollbarStyles,
      },
    },
  },
});

export { lightTheme, darkTheme };
