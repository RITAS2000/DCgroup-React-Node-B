import createHttpError from 'http-errors';
import { delSavedRecipe } from '../services/delSavedRecipe.js';

export const delSavedRecipeController = async (req, res) => {
  const { recipeId } = req.params;

  const userId = req.user._id;

  const recipe = await delSavedRecipe(recipeId, userId);
  if (!recipe) throw createHttpError(404, 'Recipe not found in favorites!');

  res.status(204).send();
};
