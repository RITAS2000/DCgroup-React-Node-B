import { UsersCollection } from '../db/models/user.js';

export const delSavedRecipe = async (recipeId, userId) => {
  return await UsersCollection.findByIdAndUpdate(
    userId,
    { $pull: { savedRecipes: recipeId } },
    { new: true },
  );
};
