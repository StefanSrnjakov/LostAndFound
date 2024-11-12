// src/pages/steps/CommunicationStep.tsx
import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Item } from '../../models/Item';

interface CommunicationStepProps {
    onBack: () => void;
    onNext: () => void;
    onInputChange: (field: keyof Item, value: any) => void;
    itemInput: Item;
}

const CommunicationStep: React.FC<CommunicationStepProps> = ({ onBack, onNext, itemInput, onInputChange }) => {

    return (
        <Box>
            <Typography variant="h6">Preferred Contact Information</Typography>
            <TextField
                label="Phone Number"
                value={itemInput.number || ''}
                onChange={(e) => onInputChange('number', e.target.value)}
                fullWidth
                margin="normal"
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Your user email will be used for communication by default. If you prefer to be contacted by phone, please provide your phone number.
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={3}>
                <Button onClick={onBack}>Back</Button>
                <Button
                    variant="contained"
                    onClick={onNext}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default CommunicationStep;
