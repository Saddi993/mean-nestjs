import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  email: string;
  password: string;
  name: string;
  age: number;
  location: string;
}