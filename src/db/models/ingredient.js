import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema(
  {
    name: { type: String, required: true },
    measure: { type: String, required: true },
  },
  { _id: false },
);

export const IngredientsCollection = model('ingredients', ingredientSchema);
