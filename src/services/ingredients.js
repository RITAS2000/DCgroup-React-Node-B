import { IngredientsCollection } from '../db/models/ingredient.js';

export async function getIngredientsService() {
  const ingredients = await IngredientsCollection.find().sort({ name: 1 });
  return ingredients;
}
