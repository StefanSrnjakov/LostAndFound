// src/middleware/convertFormData.ts
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save images in 'uploads/' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Math.floor(10000 + Math.random() * 90000); // Generate 5-digit random number
        const fileExtension = path.extname(file.originalname);
        cb(null, `${Date.now()}-${uniqueSuffix}${fileExtension}`);
    }
});

// Initialize multer with storage settings
const upload = multer({ storage });

// Middleware to process FormData and add the image path to req.body
export const convertFormData = upload.single('image');

export const processImagePath = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.file) {
        return next();
    }

    const filePath = path.join('uploads', req.file.filename);

    try {
        const compressedFilePath = path.join('uploads', `compressed-${req.file.filename}`);
        
        await sharp(filePath)
            .resize({ width: 300 })
            .jpeg({ quality: 90 })
            .toFile(compressedFilePath);

        fs.unlinkSync(filePath);

        req.body.image = `/uploads/compressed-${req.file.filename}`;
        
        next();
    } catch (error) {
        console.error('Error compressing image:', error);
        next(new Error('Failed to process image'));
    }
};
