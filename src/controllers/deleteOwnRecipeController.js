// import createHttpError from 'http-errors';
import { deleteOwnRecipe } from '../services/deleteOwnRecipe.js';

export async function deleteOwnRecipeController(req, res) {
  const { recipeId } = req.params;
  const userId = req.user.id;

  await deleteOwnRecipe(userId, recipeId);

  res.status(204).send();
}
