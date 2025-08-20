import { Recipe } from '../models/Recipe.js';

export const getOwnRecipes = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limitRaw = Math.max(parseInt(req.query.limit || '10', 10), 1);
    const perPage = Math.min(limitRaw, 100);

    const filter = { owner: req.user.id };

    const [totalItems, items] = await Promise.all([
      Recipe.countDocuments(filter),
      Recipe.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .lean(),
    ]);

    const normalized = items.map((doc) => {
      const { _id, __v, ...rest } = doc;
      return { id: _id.toString(), ...rest };
    });

    const totalPages = Math.max(Math.ceil(totalItems / perPage), 1);

    const hasPreviousPage = page > 1;
    const hasNextPage = page < totalPages;

    return res.json({
      status: 200,
      message: 'Successfully found own recipes!',
      data: {
        data: normalized,
        page,
        perPage,
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage,
      },
    });
  } catch (err) {
    next(err);
  }
};

// import { Recipe } from '../models/Recipe.js';

// export const getOwnRecipes = async (req, res, next) => {
//   try {
//     const page = Math.max(parseInt(req.query.page || '1', 10), 1);
//     const limitRaw = Math.max(parseInt(req.query.limit || '20', 10), 1);
//     const limit = Math.min(limitRaw, 100);

//     const filter = { owner: req.user.id };

//     const [total, items] = await Promise.all([
//       Recipe.countDocuments(filter),
//       Recipe.find(filter)
//         .sort({ createdAt: -1 })
//         .skip((page - 1) * limit)
//         .limit(limit)
//         .lean(),
//     ]);

//     const normalized = items.map((doc) => {
//       const { _id, __v, ...rest } = doc;
//       return { id: _id.toString(), ...rest };
//     });

//     const totalPages = Math.max(Math.ceil(total / limit), 1);

//     return res.json({
//       meta: { page, limit, total, totalPages },
//       items: normalized,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
