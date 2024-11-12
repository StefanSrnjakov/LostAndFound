// src/pages/ItemAdded.tsx
import React from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';

interface ItemAddedProps {
    status: 'loading' | 'success' | 'error';
    errorMessage: string | null;
    onRetry: () => void;
    onClose: () => void;
}

const ItemAdded: React.FC<ItemAddedProps> = ({ status, errorMessage, onRetry, onClose }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="300px">
            {status === 'loading' && (
                <>
                    <CircularProgress />
                    <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                        Submitting your item, please wait...
                    </Typography>
                </>
            )}

            {status === 'success' && (
                <>
                    <Typography variant="h4" color="success.main" align="center" sx={{ mt: 2 }}>
                        Item Successfully Submitted!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 1, mb: 3 }}>
                        Thank you for helping us with our lost and found services.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={onClose}>
                        Close
                    </Button>
                </>
            )}

            {status === 'error' && (
                <>
                    <Typography variant="h4" color="error.main" align="center" sx={{ mt: 2 }}>
                        Submission Failed
                    </Typography>
                    <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 1 }}>
                        {errorMessage || 'An unexpected error occurred. Please try again.'}
                    </Typography>
                    <Box display="flex" justifyContent="center" gap={2} mt={3}>
                        <Button variant="outlined" color="primary" onClick={onRetry}>
                            Retry
                        </Button>
                        <Button variant="contained" color="secondary" onClick={onClose}>
                            Close
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ItemAdded;
