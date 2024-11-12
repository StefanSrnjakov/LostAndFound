import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, CardActions, Button } from '@mui/material';
import { Item } from '../../models/Item';
import PlaceIcon from '@mui/icons-material/Place';
import FocusCard from './FocusCard';

const API_URL = process.env.API_HOST || 'http://localhost:3001';

interface FoundItemCardProps {
    item: Item;
    strict?: boolean;
}

const FoundItemCard: React.FC<FoundItemCardProps> = ({ item, strict }) => {
    const [open, setOpen] = useState(false);

    const imageUrl = item.image ? `${API_URL}${item.image}` : `${API_URL}/uploads/placeholder.png`;
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            {/* Main Card */}
            <Card sx={{ maxWidth: 345, boxShadow: '0px 8px 16px rgba(0,0,0,0.15)', borderRadius: 3, position: 'relative' }}>
                {/* Chip to display if it's Lost or Found */}

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
                        {item.description.slice(0, 100)}...
                        {!strict && (
                            <Button onClick={handleOpen} size="small" color="primary">
                                Read More
                            </Button>
                        )}
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
                    {!strict && (item.email || item.number) && (
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => window.location.href = item.email ? `mailto:${item.email}` : `tel:${item.number}`}
                        >
                            Contact
                        </Button>
                    )}
                </CardActions>
            </Card>

            {/* Modal for Full Details */}
            <FocusCard item={item} open={open} handleClose={handleClose} />
        </>
    );
};

export default FoundItemCard;
