// src/routes/itemRoutes.ts
import { Router } from 'express';
import { auth } from '../middleware/auth';
import { convertFormData, processImagePath } from '../middleware/convertFormData';
import { createItem, deleteItem, getItem, listItems, listUserItems, reportItem, updateItem } from '../controllers/itemControllers';

const router = Router();

router.get('/items', listItems);
router.get('/my-items', auth, listUserItems);
router.get('/items/:_id', getItem);
router.post('/items', auth, convertFormData, processImagePath, createItem);
router.put('/report/:_id', auth, reportItem);
router.put('/items/:_id', auth, convertFormData, processImagePath, updateItem);
router.delete('/items/:_id', auth, deleteItem);

export default router;
