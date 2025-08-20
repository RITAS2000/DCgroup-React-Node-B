import Recipe from "../db/models/recipe.js";




export const getRecipeById = async (recipeId, userId) => {
  const recipe = await Recipe.findOne({
    _id: recipeId,
    userId: userId,
  });
  return recipe;
};
