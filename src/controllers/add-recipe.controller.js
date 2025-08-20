import Recipe from '../models/add-recipe.model.js';

export const createRecipe = async (req, res, next) => {
  try {
    const {
      title,
      description,
      time,
      calories,
      category,
      ingredients,
      instructions,
      photo,
    } = req.body;

    if (
      !title?.trim() ||
      !description?.trim() ||
      !time ||
      !category?.trim() ||
      !instructions?.trim() ||
      !ingredients ||
      !Array.isArray(ingredients) ||
      ingredients.length === 0
    ) {
      return res.status(400).json({
        message: 'Please fill in all required fields',
      });
    }

    const recipe = await Recipe.create({
      user: req.user.id,
      title,
      description,
      time,
      calories,
      category,
      ingredients,
      instructions,
      photo,
    });

    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};
