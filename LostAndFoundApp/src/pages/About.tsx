import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import ReportIcon from '@mui/icons-material/Report';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';

const AboutPage: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Container>
      <Box display="flex" alignItems="center" gap={2} mt={4}>
        <InfoIcon color="primary" fontSize="large" />
        <Typography variant="h4" gutterBottom>
          About the Lost and Found App
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 3, mt: 2, mb: 4 }}>
        <Typography variant="body1" paragraph>
          The Lost and Found App is a convenient, user-friendly platform designed to help users report, search, and connect over lost items.
          Whether you've lost a personal belonging or found something valuable, this app provides a streamlined way for you to communicate with others in the community and help reunite people with their possessions.
        </Typography>

        <Box
          component="img"
          src="about-page.png" // Replace with your image URL
          alt="Lost and Found concept"
          onLoad={() => setLoaded(true)}
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: 2,
            boxShadow: 3,
            transition: 'opacity 0.5s ease-in-out',
            opacity: loaded ? 1 : 0,
          }}
        />
      </Paper>

      <Box display="flex" alignItems="center" gap={2} mt={4}>
        <Typography variant="h6" gutterBottom>
          Key Features
        </Typography>
      </Box>

      <List>
        <ListItem>
          <ReportIcon color="primary" sx={{ mr: 2 }} />
          <ListItemText
            primary="Report Lost Items"
            secondary="Easily submit details and descriptions of lost items to alert others."
          />
        </ListItem>
        <Divider />
        <ListItem>
          <SearchIcon color="primary" sx={{ mr: 2 }} />
          <ListItemText
            primary="View Found Items"
            secondary="Browse items reported by others and contact them if something belongs to you."
          />
        </ListItem>
        <Divider />
        <ListItem>
          <GroupIcon color="primary" sx={{ mr: 2 }} />
          <ListItemText
            primary="Community Support"
            secondary="Encourage a helpful environment where everyone can contribute to reuniting people with their belongings."
          />
        </ListItem>
        <Divider />
        <ListItem>
          <SearchIcon color="primary" sx={{ mr: 2 }} />
          <ListItemText
            primary="Location-Based Search"
            secondary="Find items nearby or search by location to enhance your chances of recovery."
          />
        </ListItem>
      </List>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Our Mission
      </Typography>
      <Typography variant="body1" paragraph>
        Our mission is to foster a sense of community by empowering individuals to support each other in retrieving lost items.
        With easy-to-use reporting tools and a platform that prioritizes user engagement, we aim to bridge the gap between those who have lost belongings and those who have found them.
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
        <Typography variant="caption" color="textSecondary">
          "Together, we can create a supportive network that brings people closer to their lost belongings and strengthens our community."
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;
