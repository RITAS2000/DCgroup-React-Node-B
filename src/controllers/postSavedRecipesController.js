import createHttpError from 'http-errors';

import { postSavedRecipes } from '../services/postSavedRecipes.js';

export const postSavedRecipesController = async (req, res) => {
  const { recipeId } = req.body;
  if (!recipeId) throw createHttpError(400, 'Recipe ID is required');

  const recipe = await postSavedRecipes(recipeId, req.user.id);
  if (!recipe) throw createHttpError(404, 'Recipe not found!');

  res.json({
    status: 200,
    message: 'Recipe added to saved recipes',
    data: recipe,
  });
};
