import Recipe from "../models/add-recipe.model.js";




export const getRecipeById = async (recipeId, userId) => {
  const recipe = await Recipe.findOne({
    _id: recipeId,
    userId: userId,
  });
  return recipe;
};
