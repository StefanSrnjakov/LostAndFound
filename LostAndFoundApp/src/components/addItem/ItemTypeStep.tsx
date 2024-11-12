// src/pages/steps/ItemTypeStep.tsx
import React from 'react';
import { Box, Button, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Search, CheckCircle } from '@mui/icons-material';
import { Item } from '../../models/Item';

interface ItemTypeStepProps {
    onNext: () => void;
    itemInput: Item;
    onInputChange: (field: keyof Item, value: any) => void;
}

const ItemTypeStep: React.FC<ItemTypeStepProps> = ({ onNext, itemInput, onInputChange }) => {
    return (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Is the item lost or found?
            </Typography>
            
            <ToggleButtonGroup
                value={itemInput.type}
                exclusive
                onChange={(event, newType) => {
                    if (newType !== null) onInputChange('type', newType); // Update type directly
                }}
                sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'center',
                    mb: 4
                }}
            >
                <ToggleButton value="lost" sx={{ width: 150, height: 120, flexDirection: 'column' }}>
                    <Search fontSize="large" />
                    <Typography variant="subtitle1">Lost</Typography>
                </ToggleButton>
                <ToggleButton value="found" sx={{ width: 150, height: 120, flexDirection: 'column' }}>
                    <CheckCircle fontSize="large" />
                    <Typography variant="subtitle1">Found</Typography>
                </ToggleButton>
            </ToggleButtonGroup>

            <Button
                variant="contained"
                onClick={onNext}
                size="large"
                sx={{ mt: 2 }}
                disabled={!itemInput.type}
            >
                Next
            </Button>
        </Box>
    );
};

export default ItemTypeStep;
