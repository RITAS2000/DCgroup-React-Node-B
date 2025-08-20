import { UsersCollection } from '../db/models/user.js';
import Recipe from '../models/add-recipe.model.js';

export const postSavedRecipes = async (recipeId, userId) => {
  const recipe = await Recipe.findOne({ _id: recipeId, user: userId });
  if (!recipe) return;

  const user = await UsersCollection.findById(userId);
  if (user.savedRecipes.some((id) => id.toString() === recipeId.toString()))
    return;
  await UsersCollection.findByIdAndUpdate(userId, {
    $push: { savedRecipes: recipeId },
  });
  return recipe;
};
