import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Request, Response } from 'express';
import { User } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, birthdate, surname } = req.body;
    const user = new User({
      name, email, birthdate, surname,
      passwordHash: await bcrypt.hash(password, 10)
    });
    await user.save();
    res.status(201).json(user);
  } catch (error: any) {
    console.log('error', error.message);
    res.status(400).json({ error: 'Failed to create user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.headers._id as string;
    const { name, birthdate, surname } = req.body;

    if (!userId) {
      res.status(400).json({ error: 'User ID is required in headers' });
      return;
    }

    // Build the update object by excluding fields with null values
    const updateData: { [key: string]: any } = {};
    if (name !== null) updateData.name = name;
    if (birthdate !== null) updateData.birthdate = birthdate;
    if (surname !== null) updateData.surname = surname;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { _id, email } = req.headers;
    const users = await User.find({ _id, email });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await User.findOne({ email });

  if (user === null || !(await bcrypt.compare(password, user.passwordHash))) {
    res.status(401).json({ error: 'Invalid email or password' });
    return;
  }

  const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '2h',
  });

  const userResponse = {
    _id: user._id,
    name: user.name,
    email: user.email
  }
  res.status(200).json({ token, user: userResponse });
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.headers;
    await User.deleteOne({ _id });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}