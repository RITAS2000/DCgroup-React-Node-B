import { Recipe } from '../db/models/get-Recipe.js';
import { UsersCollection } from '../db/models/user.js';
import mongoose from 'mongoose';
import createHttpError from 'http-errors';

export async function deleteOwnRecipe(userId, recipeId) {
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return { error: 'Recipe not found', status: 404 };
  }
  if (recipe.owner.toString() !== userId)
    throw createHttpError(403, 'This recipe does not belong to you');

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
          $slice: -100,
        },
      },
    },
  );

  const objectId = new mongoose.Types.ObjectId(recipeId);

  await Recipe.deleteOne({ _id: objectId });

  return true;
}
