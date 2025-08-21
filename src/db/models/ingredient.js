import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { versionKey: false, timestamps: false }
);

export const IngredientsCollection = model('ingredients', ingredientSchema);
