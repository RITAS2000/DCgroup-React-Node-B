import { Recipe } from '../db/models/get-Recipe.js';
import { UsersCollection } from '../db/models/user.js';

export async function deleteOwnRecipe(userId, recipeId) {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return { error: 'Recipe not found', status: 404 };
  }
  if (recipe.user.toString() !== userId) {
    return { error: 'This recipe does not belong to you', status: 403 };
  }

  await UsersCollection.updateMany(
    { savedRecipes: recipeId },
    {
      $pull: { savedRecipes: recipeId },
      $push: {
        notifications: {
          $each: [
            {
              message: `Sorry, the recipe "${recipe.title}" was deleted by the owner`,
              recipeId: recipe._id,
            },
          ],
          $slice: -200, // залишаємо тільки останні 200 повідомлень
        },
      },
    },
  );

  await Recipe.deleteOne({ _id: recipeId });

  return true;
}
