import React, { useState } from 'react';
import { CardMedia, Typography, Chip, Modal, Box, IconButton, Divider, Button } from '@mui/material';
import { Item } from '../../models/Item';
import CloseIcon from '@mui/icons-material/Close';
import PlaceIcon from '@mui/icons-material/Place';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import UpdateIcon from '@mui/icons-material/Update';
import LabelIcon from '@mui/icons-material/Label';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import ReportIcon from '@mui/icons-material/Report';
import { itemService } from '../../services/itemService';
import { useAuthContext } from '../../context/AuthContext';

const API_URL = process.env.API_HOST || 'http://localhost:3001';

interface FocusCardProps {
    item: Item;
    handleClose: () => void;
    open: boolean;
}

const FocusCard: React.FC<FocusCardProps> = ({ item, handleClose, open }) => {
    const { user } = useAuthContext();
    const [reported, setReported] = useState(item.reports.includes(user?.email || ''));
    const imageUrl = item.image ? `${API_URL}${item.image}` : `${API_URL}/uploads/placeholder.png`;

    const handleReport = async () => {
        try {

            await itemService.reportItem(item._id);
            setReported(true);
            item.reports.push(user?.email as string);
        } catch (error) {
            console.error("Error reporting item:", error);
        }
    };
    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="item-details-modal" closeAfterTransition>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: 500,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 3,
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box display="flex" alignItems="center" gap={1} sx={{ flexGrow: 1, overflow: 'hidden' }}>
                        <Typography
                            id="item-details-modal"
                            variant="h6"
                            color="primary"
                            sx={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 2,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                fontWeight: 'bold',
                            }}
                        >
                            {item.name}
                        </Typography>
                        <Chip
                            label={item.type === 'lost' ? 'Lost Item' : 'Found Item'}
                            color={item.type === 'lost' ? 'error' : 'primary'}
                            sx={{ fontWeight: 'bold' }}
                        />
                    </Box>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                
                {/* Image with max dimensions */}
                <CardMedia
                    component="img"
                    height="auto"
                    image={imageUrl}
                    alt={item.name}
                    sx={{
                        maxHeight: 200,
                        maxWidth: '100%',
                        objectFit: 'contain',
                        borderRadius: 2,
                        mb: 2,
                    }}
                />
                
                {/* Category */}
                <Chip label={item.category} icon={<LabelIcon />} color="secondary" size="small" sx={{ mb: 2 }} />

                <Divider sx={{ my: 2 }} />

                {/* Description with line clamping */}
                <Typography variant="body2" color="text.secondary" paragraph sx={{ display: '-webkit-box', overflow: 'auto', WebkitBoxOrient: 'vertical', WebkitLineClamp: 6 }}>
                    {item.description}
                </Typography>
                
                <Divider sx={{ my: 2 }} />

                {/* Location with overflow handling */}
                <Box display="flex" alignItems="center" sx={{ mb: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <PlaceIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        <strong>Location:</strong> {item.locationFound}
                    </Typography>
                </Box>

                {/* Status */}
                <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                    <LabelIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        <strong>Status:</strong> {item.status === 'listed' ? 'Available' : 'Claimed'}
                    </Typography>
                </Box>

                {/* Date Information */}
                <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                    <EventAvailableIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        <strong>Date Found:</strong> {item.dateFound ? new Date(item.dateFound).toLocaleDateString() : 'N/A'}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                    <EventAvailableIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        <strong>Date Lost:</strong> {item.dateLost ? new Date(item.dateLost).toLocaleDateString() : 'N/A'}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                    <EventAvailableIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        <strong>Date Created:</strong> {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'N/A'}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                    <UpdateIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        <strong>Last Updated:</strong> {item.lastUpdatedAt ? new Date(item.lastUpdatedAt).toLocaleDateString() : 'N/A'}
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Contact Information with ellipsis for overflow */}
                {(item.email || item.number) && (
                    <Box mt={2}>
                        {item.email && (
                            <Box display="flex" alignItems="center" sx={{ mb: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                <MailOutlineIcon fontSize="small" sx={{ mr: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Email:</strong> {item.email}
                                </Typography>
                            </Box>
                        )}
                        {item.number && (
                            <Box display="flex" alignItems="center" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Phone:</strong> {item.number}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}

                {/* Report Button */}
                <Divider sx={{ my: 2 }} />
                <Box display="flex" justifyContent="center">
                    {reported ? (
                        <Typography variant="body2" color="text.secondary">
                            You've reported this item.
                        </Typography>
                    ) : (
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<ReportIcon />}
                            onClick={handleReport}
                        >
                            Report as Inappropriate
                        </Button>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

export default FocusCard;
