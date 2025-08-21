import createHttpError from 'http-errors';
import { getRecipeById } from '../services/getRecipeById.js';

export const getRecipeByIdController = async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await getRecipeById(recipeId);

  // Відповідь, якщо рецепт не знайдено
  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }
  // Відповідь, якщо рецепт знайдено
  res.status(200).json({
    status: 200,
    message: 'Successfully found recipe!',
    data: recipe,
  });
};
