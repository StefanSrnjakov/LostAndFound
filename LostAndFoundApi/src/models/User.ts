import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  surname: string;
  birthdate: Date;
  email: string;
  passwordHash: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  birthdate: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

export const User = mongoose.model<IUser>('User', UserSchema);
