import Recipe from '../db/models/addRecipe.js';

export const searchRecipesService = async (filter, { page = 1 }) => {
  const limit = 12;
  const skip = (page - 1) * limit;

  const recipes = await Recipe.find(filter).skip(skip).limit(limit);
  const total = await Recipe.countDocuments(filter);

  return {
    recipes,
    page,
    perPage: limit,
    totalItems: total,
    totalPages: Math.ceil(total / limit),
    hasPreviousPage: page > 1,
    hasNextPage: page < Math.ceil(total / limit),
  };
};
