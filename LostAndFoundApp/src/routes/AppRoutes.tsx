// src/routes/AppRoutes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import HomePage from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import { useAuthContext } from '../context/AuthContext';
import { Box, Container } from '@mui/material';
import Navbar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import About from '../pages/About';
import SessionExpired from '../pages/SessionExpired';
import LostItems from '../pages/LostItems';
import FoundItems from '../pages/FoundItems';
import MyItems from '../pages/MyItems';
import AddItem from '../pages/AddItem';


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const context = useAuthContext();

  if (context.loading) {
    return <h1>Loading...</h1>;
  }
  if (context.user?.exp && context.user.exp < Date.now() / 1000) {
    return <Navigate to="/session-expired" />;
  }
  if (!context) {
    return <Navigate to="/login" />;
  }
  if (!context.user) {
    return <Navigate to="/login" />;
  }
  return children;
};

interface AppRoutesProps {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

const AppRoutes: React.FC<AppRoutesProps> = ({ toggleTheme, mode }) => {
  return (
    <Router>
      <AuthProvider>
        <Navbar toggleTheme={toggleTheme} mode={mode} />
        <Container>
          <Box
            display="flex"
            flexDirection="column"
            minHeight="calc(100vh - 64px)"
            justifyContent="center"
            paddingY={2}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/session-expired" element={<SessionExpired />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/lost-items"
                element={
                  <PrivateRoute>
                    <LostItems />
                  </PrivateRoute>
                }
              />
              <Route
                path="/found-items"
                element={
                  <PrivateRoute>
                    <FoundItems />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-items"
                element={
                  <PrivateRoute>
                    <MyItems />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-item"
                element={
                  <PrivateRoute>
                    <AddItem />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </Box>
        </Container>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
