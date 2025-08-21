// import { UsersCollection } from '../db/models/user.js';
// import Recipe from '../db/models/addRecipe.js';

// export const postSavedRecipes = async (recipeId, userId) => {
//   const recipe = await Recipe.findOne({ _id: recipeId, user: userId });
//   if (!recipe) return;

//   const user = await UsersCollection.findById(userId);
//   if (user.savedRecipes.some((id) => id.toString() === recipeId)) return;
//   await UsersCollection.findByIdAndUpdate(userId, {
//     $push: { savedRecipes: recipeId },
//   });
//   return recipe;
// };

import { UsersCollection } from '../db/models/user.js';
import Recipe from '../db/models/addRecipe.js';

export const postSavedRecipes = async (recipeId, userId) => {
  // Шукаємо рецепт лише за ID
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) return null;

  const user = await UsersCollection.findById(userId);
  if (!user) return null;

  // Якщо рецепт вже в savedRecipes, нічого не робимо
  if (user.savedRecipes.some((id) => id.toString() === recipeId)) return recipe;

  // Додаємо рецепт в savedRecipes
  user.savedRecipes.push(recipe._id);
  await user.save();

  return recipe;
};
