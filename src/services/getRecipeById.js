import Recipe from '../db/models/addRecipe.js';

export const getRecipeById = async (recipeId) => {
  const recipe = await Recipe.findOne({
    _id: recipeId,
  });
  return recipe;
};
