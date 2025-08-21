import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { versionKey: false, timestamps: false }
);

export const CategoriesCollection = model('categories', categorySchema);
