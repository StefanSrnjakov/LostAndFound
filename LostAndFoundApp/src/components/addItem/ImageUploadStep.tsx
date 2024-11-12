// src/pages/steps/ImageUploadStep.tsx
import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { Item } from '../../models/Item';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

interface ImageUploadStepProps {
    onNext: () => void;
    onBack: () => void;
    onInputChange: (field: keyof Item, value: any) => void;
    itemInput: Item;
}

const ImageUploadStep: React.FC<ImageUploadStepProps> = ({ onNext, onBack, onInputChange, itemInput }) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        onInputChange('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Upload an Image (Optional)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Adding an image can help others recognize the item more easily. You can upload a clear photo here.
            </Typography>

            {/* Styled Upload Button */}
            <Button
                variant="outlined"
                component="label"
                startIcon={<PhotoCamera />}
                sx={{ mb: 3 }}
            >
                Choose Image
                <input
                    type="file"
                    hidden
                    onChange={handleImageChange}
                    accept="image/*"
                />
            </Button>

            {imagePreview ? (
                <Card sx={{ maxWidth: 300, mt: 3, boxShadow: 2, mx: 'auto' }}>
                    <CardMedia component="img" height="200" image={imagePreview} alt="Item preview" />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Preview of the selected image
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <Box sx={{ mt: 3, color: 'text.secondary', textAlign: 'center' }}>
                    <Typography variant="body2">No image selected</Typography>
                </Box>
            )}

            <Box display="flex" justifyContent="space-between" mt={3}>
                <Button onClick={onBack}>Back</Button>
                <Button variant="contained" onClick={onNext}>
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default ImageUploadStep;
