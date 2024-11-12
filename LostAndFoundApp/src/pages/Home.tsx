import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Button, CardContent, CardMedia, Card, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { Item } from '../models/Item';
import { itemService } from '../services/itemService';
import ItemCard from '../components/item/ItemCard';

const HomePage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [popularCategories, setPopularCategories] = useState<string[]>(['Electronics', 'Wallets', 'Keys']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getItems = async () => {
      setLoading(true);
      try {
        const { items: fetchedItems } = await itemService.fetchLostItems({});
        setItems(fetchedItems.slice(0, 4)); // Limit to 4 items
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, []);

  return (
    <Container sx={{ mt: 8, mb: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" color="primary" gutterBottom>
          Welcome to the Lost and Found App
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Easily report lost items or find those that have been found by others in your community.
        </Typography>
        <Button
          component={Link}
          to="/add-item"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
        >
          Report Lost Item
        </Button>
      </Box>

      {/* Feature Section */}
      <Typography variant="h5" color="primary" align="center" gutterBottom>
        How It Works
      </Typography>
      <Grid container spacing={3} sx={{ mb: 8 }}>
        {[
          { title: 'Report Lost Items', description: 'Easily create a report for your lost item with details and location.' },
          { title: 'Find Lost Items', description: 'Browse the list of found items and filter by location or category.' },
          { title: 'Track Your Reports', description: 'View and manage items you have reported, including updates from other users.' },
        ].map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image={`lost-item-home${index + 1}.png`}
                alt={feature.title}
              />
              <CardContent>
                <Typography variant="h6" color="text.primary">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
        

      {/* Explore More Section */}
      <Typography variant="h5" color="primary" align="center" gutterBottom>
        Featured Lost and Found Items
      </Typography>
      <Grid container spacing={3}>
        {loading ? (
          <Typography variant="body1" color="text.secondary" align="center">
            Loading items...
          </Typography>
        ) : (
          items.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item._id}>
              <ItemCard item={item} strict={true} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default HomePage;
