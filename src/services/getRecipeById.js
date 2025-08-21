import Recipe from '../models/addRecipe.js';

export const getRecipeById = async (recipeId) => {
  const recipe = await Recipe.findOne({
    _id: recipeId,
  });
  return recipe;
};
