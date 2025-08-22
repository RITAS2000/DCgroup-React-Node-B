import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';

export const getSavedRecipesController = async (req, res) => {
  const userId = req.user.id;

  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 12;

  const user = await UsersCollection.findById(userId).populate('savedRecipes');
  if (!user) throw createHttpError(404, 'User not found');

  const totalItems = user.savedRecipes.length;
  const totalPages = Math.ceil(totalItems / perPage);

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  const paginatedRecipes = user.savedRecipes.slice(startIndex, endIndex);

  res.json({
    status: 200,
    message: 'User saved recipes fetched successfully',
    data: {
      data: paginatedRecipes,
      page,
      perPage,
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    },
  });
  // res.json({
  //   status: 200,
  //   message: 'User saved recipes fetched successfully',
  //   data: user.savedRecipes,
  // });
};
