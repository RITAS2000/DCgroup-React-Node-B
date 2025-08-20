import { getIngredientsService } from '../services/ingredients.js';

export async function getIngredientsController(req, res) {
  const ingredients = await getIngredientsService();
  res.json({
    data: ingredients,
  });
}
