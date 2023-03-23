import * as mongoose from 'mongoose';

export const FilmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: Number, required: true },
  actors: { type: Array, required: true },
});

export interface Film extends mongoose.Document {
  id: string;
  title: string;
  password: string;
  direcor: string;
  year: number;
  actors: [];
}