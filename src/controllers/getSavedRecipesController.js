import createHttpError from 'http-errors';
import { UsersCollection } from '../models/user.js';

export const getSavedRecipesController = async (req, res) => {
  const userId = req.user.id;

  const user = await UsersCollection.findById(userId).populate('savedRecipes');
  if (!user) throw createHttpError(404, 'User not found');

  res.json({
    status: 200,
    message: 'User saved recipes fetched successfully',
    data: user.savedRecipes,
  });
};
