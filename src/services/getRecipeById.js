import Recipe from "../models/add-recipe.model.js";

export const getRecipeById = async (recipeId) => {
  const recipe = await Recipe.findOne({
    _id: recipeId,

  });
  return recipe;
};
