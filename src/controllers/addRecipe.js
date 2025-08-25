import Recipe from '../db/models/addRecipe.js';

export const createRecipe = async (req, res, next) => {
  try {
    let { ingredients } = req.body;
    if (typeof ingredients === 'string') {
      try {
        ingredients = JSON.parse(ingredients);
      } catch {
        return res.status(400).json({
          status: 400,
          message: 'Ingredients must be a valid JSON string',
        });
      }
    }
    if (!Array.isArray(ingredients)) ingredients = [];

    let { category } = req.body;
    if (Array.isArray(category)) {
      category = category.find((v) => typeof v === 'string' && v.trim()) || '';
    }
    if (typeof category !== 'string') category = '';
    category = category.trim();

    const toInt = (v) => {
      const n = Number(v);
      return Number.isInteger(n) ? n : undefined;
    };
    const time = toInt(req.body.time);
    const calories =
      req.body.calories === '' || req.body.calories === undefined
        ? undefined
        : toInt(req.body.calories);

    const doc = {
      owner: req.user.id,
      title: req.body.title?.trim(),
      description: req.body.description?.trim(),
      instructions: req.body.instructions?.trim(),
      time,
      calories,
      category,
      ingredients: ingredients
        .map((i) => ({
          name: String(i?.name ?? '').trim(),
          amount: String(i?.amount ?? '').trim(),
        }))
        .filter((i) => i.name && i.amount),
      thumb: req.file ? `/uploads/${req.file.filename}` : undefined,
    };

    const recipe = await Recipe.create(doc);

    return res.status(201).json({
      status: 201,
      message: 'Recipe created successfully',
      data: recipe,
    });
  } catch (err) {
    next(err);
  }
};
