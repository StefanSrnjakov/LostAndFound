import React, { useState } from 'react';
import { Modal, Box, TextField, Typography, Chip, IconButton, Divider, Button, FormControlLabel, Switch } from '@mui/material';
import { Item } from '../../models/Item';
import CloseIcon from '@mui/icons-material/Close';
import PlaceIcon from '@mui/icons-material/Place';
import LabelIcon from '@mui/icons-material/Label';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';

const API_URL = process.env.API_HOST || 'http://localhost:3001';

interface MyFocusCardProps {
    item: Item;
    handleClose: () => void;
    open: boolean;
    onSave: (updatedItem: Partial<Item>) => void;
}

const MyFocusCard: React.FC<MyFocusCardProps> = ({ item, handleClose, open, onSave }) => {
    const [editedItem, setEditedItem] = useState<Partial<Item>>({ ...item, image: null });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const imageUrl = selectedImage ? URL.createObjectURL(selectedImage) : item.image ? `${API_URL}${item.image}` : `${API_URL}/uploads/placeholder.png`;

    const handleFieldChange = (field: keyof Item, value: any) => {
        setEditedItem((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave(editedItem);
        handleClose();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedImage(file);
        handleFieldChange('image', file);
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
                    maxWidth: 600,
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: 24,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" color="primary">
                        Edit Item
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Image Upload */}
                <Box position="relative" textAlign="center">
                    <Box
                        component="img"
                        src={imageUrl}
                        alt={item.name}
                        sx={{
                            maxHeight: 200,
                            maxWidth: '100%',
                            objectFit: 'contain',
                            borderRadius: 2,
                            mb: 2,
                            boxShadow: 1,
                        }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        color="primary"
                        startIcon={<PhotoCamera />}
                        sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    >
                        Change Image
                        <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                    </Button>
                </Box>

                {/* Editable Fields */}
                <Box display="flex" alignItems="center" gap={1}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        value={editedItem.name}
                        onChange={(e) => handleFieldChange('name', e.target.value)}
                        InputProps={{
                            startAdornment: <LabelIcon sx={{ color: 'primary.main', mr: 1 }} />,
                        }}
                    />
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <CategoryIcon sx={{ color: 'secondary.main', mr: 1 }} />
                    <Chip label={item.category} color="secondary" size="small" />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" alignItems="center" gap={1}>
                    <DescriptionIcon sx={{ color: 'action.active', mr: 1 }} />
                    <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        label="Description"
                        variant="outlined"
                        value={editedItem.description}
                        onChange={(e) => handleFieldChange('description', e.target.value)}
                    />
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <PlaceIcon fontSize="small" sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                        <strong>Location:</strong> {item.locationFound}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <LabelIcon fontSize="small" sx={{ color: 'info.main', mr: 1 }} />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={editedItem.status === 'claimed'}
                                onChange={(e) => handleFieldChange('status', e.target.checked ? 'claimed' : 'listed')}
                                color="primary"
                            />
                        }
                        label={editedItem.status === 'listed' ? 'Available' : 'Claimed'}
                    />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                        fullWidth
                        label="Phone"
                        variant="outlined"
                        value={editedItem.number || ''}
                        onChange={(e) => handleFieldChange('number', e.target.value)}
                        InputProps={{
                            startAdornment: <PhoneIcon sx={{ color: 'primary.main', mr: 1 }} />,
                        }}
                    />
                </Box>

                <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
                    <Button variant="outlined" color="error" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default MyFocusCard;
