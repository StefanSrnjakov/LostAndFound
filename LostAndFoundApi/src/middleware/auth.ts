import jwt from 'jsonwebtoken';
import { NextFunction,  Request, Response } from "express";
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).json({ error: 'Not authorized to access this resource' });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const {email, _id} = decoded as {email: string, _id: string};
        req.headers.email = email;
        req.headers._id = _id;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
        return
    }
};

