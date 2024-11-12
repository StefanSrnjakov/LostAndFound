// src/App.tsx
import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import AppRoutes from './routes/AppRoutes';
import { lightTheme, darkTheme } from './themes/theme';

const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme(mode === 'light' ? lightTheme : darkTheme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes toggleTheme={toggleTheme} mode={mode} />
    </ThemeProvider>
  );
};

export default App;
