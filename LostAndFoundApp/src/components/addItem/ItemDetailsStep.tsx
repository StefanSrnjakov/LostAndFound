// src/pages/steps/ItemDetailsStep.tsx
import React from 'react';
import { Box, Button, TextField, MenuItem, Typography, Autocomplete } from '@mui/material';
import { CATEGORIES, LOCATIONS } from '../../constants/common';
import { Item } from '../../models/Item';

interface ItemDetailsStepProps {
    onNext: () => void;
    itemInput: Item;
    onInputChange: (field: keyof Item, value: any) => void;
}

const ItemDetailsStep: React.FC<ItemDetailsStepProps> = ({ onNext, itemInput, onInputChange }) => {
    const isNextDisabled = () => {
        return (
            !itemInput.name ||
            !itemInput.category ||
            !itemInput.description ||
            !itemInput.locationFound ||
            (itemInput.type === 'found' && !itemInput.dateFound)
        );
    };

    return (
        <Box>
            <Typography variant="h6">Item Details</Typography>
            
            <TextField
                label="Item Name"
                value={itemInput.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Category"
                value={itemInput.category}
                onChange={(e) => onInputChange('category', e.target.value)}
                select
                fullWidth
                margin="normal"
                required
            >
                {CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                        {cat}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Description"
                value={itemInput.description}
                onChange={(e) => onInputChange('description', e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
                required
            />

            {itemInput.type === 'found' && (
                <TextField
                    label="Date Found"
                    type="date"
                    value={itemInput.dateFound ? itemInput.dateFound.toISOString().split('T')[0] : ''}
                    onChange={(e) => onInputChange('dateFound', e.target.value ? new Date(e.target.value) : null)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    required
                />
            )}

            {itemInput.type === 'lost' && (
                <TextField
                    label="Date Lost"
                    type="date"
                    value={itemInput.dateLost ? itemInput.dateLost.toISOString().split('T')[0] : ''}
                    onChange={(e) => onInputChange('dateLost', e.target.value ? new Date(e.target.value) : null)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
            )}

            <Autocomplete
                options={LOCATIONS}
                value={itemInput.locationFound}
                onChange={(event, newValue) => onInputChange('locationFound', newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Location Found"
                        fullWidth
                        margin="normal"
                        required
                    />
                )}
            />

            <Box display="flex" justifyContent="flex-end" mt={3}>
                <Button variant="contained" onClick={onNext} disabled={isNextDisabled()}>
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default ItemDetailsStep;
