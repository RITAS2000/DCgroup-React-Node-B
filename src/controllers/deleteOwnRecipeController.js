import createHttpError from 'http-errors';
import { deleteOwnRecipe } from '../services/deleteOwnRecipe.js';

export async function deleteOwnRecipeController(req, res) {
  try {
    const { recipeId } = req.params;
    const userId = req.user._id;

    await deleteOwnRecipe(userId, recipeId);

    res.status(204).send();
  } catch {
    throw createHttpError(403, 'Recipe not your!');
  }
}
