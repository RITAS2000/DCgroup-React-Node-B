import { Recipe } from '../db/models/get-Recipe.js';

export const getOwnRecipesService = async (userId, page = 1, perPage = 12) => {
  const limit = Math.min(Math.max(Number(perPage) || 12, 1), 100);
  const currentPage = Math.max(Number(page) || 1, 1);

  const filter = { owner: userId };

  const [totalItems, items] = await Promise.all([
    Recipe.countDocuments(filter),
    Recipe.find(filter)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * limit)
      .limit(limit)
      .lean(),
  ]);

  const normalized = items.map((doc) => {
    const { _id, ...rest } = doc;
    return { id: _id.toString(), ...rest };
  });

  const totalPages = Math.max(Math.ceil(totalItems / limit), 1);

  return {
    data: normalized,
    page: currentPage,
    perPage: limit,
    totalItems,
    totalPages,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
  };
};
