import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, CardActions, IconButton } from '@mui/material';
import { Item } from '../../models/Item';
import PlaceIcon from '@mui/icons-material/Place';
import EditIcon from '@mui/icons-material/Edit'; // Import edit icon
import MyFocusCard from './MyFocusCard';

const API_URL = process.env.API_HOST || 'http://localhost:3001';

interface MyItemCardProps {
    item: Item;
    onUpdate: (itemId: string, updatedItem: Partial<Item>) => void;
}

const MyItemCard: React.FC<MyItemCardProps> = ({ item, onUpdate }) => {
    const [open, setOpen] = useState(false);

    const imageUrl = item.image ? `${API_URL}${item.image}` : `${API_URL}/uploads/placeholder.png`;
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = (updatedItem: Partial<Item>) => {
        const adaptedItem: Partial<Item> = {
            ...updatedItem
        };
        onUpdate(item._id, adaptedItem);
        handleClose();
    };

    return (
        <>
            <Card sx={{ maxWidth: 345, boxShadow: '0px 8px 16px rgba(0,0,0,0.15)', borderRadius: 3, position: 'relative' }}>
                <Chip
                    label={item.type === 'lost' ? 'Lost Item' : 'Found Item'}
                    color={item.type === 'lost' ? 'error' : 'primary'}
                    sx={{ position: 'absolute', top: 10, left: 10, fontWeight: 'bold' }}
                />
                <CardMedia
                    component="img"
                    height="180"
                    image={imageUrl}
                    alt={item.name}
                    sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <CardContent>
                    <Typography variant="h6" component="div" color="primary" noWrap>
                        {item.name}
                    </Typography>
                    <Chip label={item.category} color="secondary" size="small" sx={{ mt: 1, mb: 1 }} />
                    <Typography variant="body2" color="text.secondary" paragraph>
                        {item.description.slice(0, 100)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                        <PlaceIcon fontSize="small" sx={{ mr: 0.5 }} />
                        {item.locationFound}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
                    {item.status === 'listed' ? (
                        <Chip label="Available" color="success" variant="outlined" />
                    ) : (
                        <Chip label="Claimed" color="default" variant="outlined" />
                    )}
                    <IconButton color="primary" onClick={handleOpen} aria-label="Edit item">
                        <EditIcon /> {/* Edit icon to indicate edit functionality */}
                    </IconButton>
                </CardActions>
            </Card>

            {/* Editable Modal for Full Details */}
            <MyFocusCard item={item} open={open} handleClose={handleClose} onSave={handleSave} />
        </>
    );
};

export default MyItemCard;
