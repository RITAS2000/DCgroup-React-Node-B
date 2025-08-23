import { searchRecipesService } from '../services/searchRecipesService.js';

export const searchRecipesController = async (req, res, next) => {
  try {
    const { title, category, ingredient, page } = req.query;

    const filter = {};

    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    if (category) {
      filter.category = category;
    }

    if (ingredient) {
      filter.ingredients = { $elemMatch: { name: ingredient } };
    }

    const result = await searchRecipesService(filter, {
      page: Number(page) || 1,
    });

    if (!result.recipes.length) {
      return res.status(404).json({
        status: 404,
        message: 'Recipe not found',
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Successfully found own recipes!',
      data: {
        data: result.recipes,
        page: result.page,
        perPage: result.perPage,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
        hasPreviousPage: result.hasPreviousPage,
        hasNextPage: result.hasNextPage,
      },
    });
  } catch (err) {
    next(err);
  }
};
