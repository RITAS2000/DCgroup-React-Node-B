import { getOwnRecipesService } from '../services/recipes.js';

export const getOwnRecipes = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page ?? '1', 10);
    const perPage = parseInt(req.query.limit ?? '12', 10);

    const result = await getOwnRecipesService(req.user.id, page, perPage);

    res.status(200).json({
      status: 200,
      message: 'Successfully found own recipes!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
