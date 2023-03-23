import * as mongoose from 'mongoose';

export const FilmSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: String, required: true },
  actors: { type: Array, required: true },
});

export interface Film extends mongoose.Document {
  id: string;
  title: string;
  director: string;
  year: string;
  actors: [];
}