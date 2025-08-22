import { UsersCollection } from '../db/models/user.js';

export const getSavedRecipes = async (userId) => {
  const user = await UsersCollection.findById(userId).populate('savedRecipes');
  return user?.savedRecipes || [];
};
