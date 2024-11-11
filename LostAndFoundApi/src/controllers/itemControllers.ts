import { Request, Response } from 'express';
import Item from '../models/Item';

// Create a new item
export const createItem = async (req: Request, res: Response) => {
    try {
        req.body.email = req.headers.email;
        delete req.body._id;
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error: any) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};
export const reportItem = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        const email = req.headers.email as string;

        const item = await Item.findOne({ _id });

        if (!item) {
            res.status(404).json({ error: 'Item not found' });
            return;
        }

        if (!item.reports.includes(email)) {
            item.reports.push(email);

            if (item.reports.length >= 5) {
                await Item.deleteOne({ _id });
                res.status(200).json({ message: 'Item deleted due to multiple reports' });
                return;
            }
            await item.save();
        }

        res.status(200).json(item);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const listItems = async (req: Request, res: Response) => {
    try {
        const filters = req.query.filters ? JSON.parse(req.query.filters as string) : {};
        const query: any = {};

        // Filters setup
        if (filters.type) query.type = filters.type;
        if (filters.status) query.status = filters.status;
        if (filters.locations && Array.isArray(filters.locations) && filters.locations.length > 0) {
            query.locationFound = { $in: filters.locations };
        }
        if (filters.categories && Array.isArray(filters.categories) && filters.categories.length > 0) {
            query.category = { $in: filters.categories };
        }

        query.status = 'listed';

        // Pagination setup
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 12;
        const skip = (page - 1) * limit;

        // Fetch filtered and paginated items
        const items = await Item.find(query)
            .sort({ publishedAt: -1 })
            .skip(skip)
            .limit(limit);

        // Count total items for pagination metadata
        const totalItems = await Item.countDocuments(query);

        res.status(200).json({
            items,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        });
    } catch (error: any) {
        console.error("Error listing items:", error);
        res.status(500).json({ error: error.message });
    }
};


export const listUserItems = async (req: Request, res: Response) => {
    try {
        const query: any = {};
        query.email = req.headers.email;

        // Pagination setup
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 12;
        const skip = (page - 1) * limit;

        // Fetch filtered and paginated items
        const items = await Item.find(query)
            .sort({ publishedAt: -1 })
            .skip(skip)
            .limit(limit);

        // Count total items for pagination metadata
        const totalItems = await Item.countDocuments(query);

        res.status(200).json({
            items,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        });
    } catch (error: any) {
        console.error("Error listing items:", error);
        res.status(500).json({ error: error.message });
    }
};




export const getItem = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        const item = await Item.findById(_id);
        if (!item) {
            res.status(404).json({ error: 'Item not found' });
            return;
        }
        res.status(200).json(item);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateItem = async (req: Request, res: Response) => {
    try {
        const { email } = req.headers;
        const { _id } = req.params;

        req.body.lastUpdatedAt = new Date();

        const updatedItem = await Item.findOneAndUpdate({_id: _id, email: email}, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedItem) {
            res.status(404).json({ error: 'Item not found' });
            return;
        }
        res.status(200).json(updatedItem);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteItem = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        const { email } = req.headers;

        const item = await Item.findById({_id, email});

        if (!item) {
            res.status(404).json({ error: 'Item not found' });
            return;
        }

        if (item.email !== email) {
            res.status(403).json({ error: 'Unauthorized action' });
            return;
        }

        const deletedItem = await Item.findOneAndDelete({_id, email});
        if (!deletedItem) {
            res.status(404).json({ error: 'Item not found' });
            return;
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};