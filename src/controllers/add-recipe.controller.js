import Recipe from '../models/add-recipe.model.js';
import { getRecipeById } from '../services/recipes.js';

export const createRecipe = async (req, res, next) => {
  try {
    if (typeof req.body.ingredients === 'string') {
      try {
        req.body.ingredients = JSON.parse(req.body.ingredients);
      } catch {
        return res
          .status(400)
          .json({ message: 'ingredients must be a valid JSON string' });
      }
    }

    const {
      title,
      description,
      time,
      calories,
      category,
      ingredients,
      instructions,
    } = req.body;

    const errors = [];

    if (!title || typeof title !== 'string' || !title.trim())
      errors.push('title is required');
    else if (title.trim().length > 64)
      errors.push('title must be at most 64 characters');

    if (!description || typeof description !== 'string' || !description.trim())
      errors.push('description is required');
    else if (description.trim().length > 200)
      errors.push('description must be at most 200 characters');

    const timeNum = Number(time);
    if (!Number.isInteger(timeNum)) errors.push('time must be an integer');
    else if (timeNum < 1 || timeNum > 360)
      errors.push('time must be between 1 and 360 minutes');

    let caloriesNum;
    if (
      calories !== undefined &&
      calories !== null &&
      `${calories}`.trim() !== ''
    ) {
      caloriesNum = Number(calories);
      if (
        !Number.isInteger(caloriesNum) ||
        caloriesNum < 1 ||
        caloriesNum > 10000
      ) {
        errors.push('calories must be an integer between 1 and 10000');
      }
    }

    if (!category || typeof category !== 'string' || !category.trim())
      errors.push('category is required');

    if (!Array.isArray(ingredients)) {
      errors.push('ingredients must be an array');
    } else {
      if (ingredients.length < 2)
        errors.push('ingredients must contain at least 2 items');
      if (ingredients.length > 16)
        errors.push('ingredients must contain at most 16 items');
      ingredients.forEach((ing, idx) => {
        if (!ing || typeof ing !== 'object')
          return errors.push(`ingredients[${idx}] must be an object`);
        if (!ing.name || typeof ing.name !== 'string' || !ing.name.trim())
          errors.push(`ingredients[${idx}].name is required`);
        if (!ing.amount || typeof ing.amount !== 'string' || !ing.amount.trim())
          errors.push(`ingredients[${idx}].amount is required`);
      });
    }

    if (
      !instructions ||
      typeof instructions !== 'string' ||
      !instructions.trim()
    )
      errors.push('instructions is required');
    else if (instructions.trim().length > 1200)
      errors.push('instructions must be at most 1200 characters');

    if (errors.length)
      return res.status(400).json({ message: 'Validation error', errors });

    const doc = {
      user: req.user.id,
      title: title.trim(),
      description: description.trim(),
      time: timeNum,
      category: category.trim(),
      ingredients: ingredients.map((i) => ({
        name: i.name.trim(),
        amount: i.amount.trim(),
      })),
      instructions: instructions.trim(),
    };

    if (caloriesNum !== undefined) doc.calories = caloriesNum;
    if (req.file) doc.photo = `/uploads/${req.file.filename}`;

    const recipe = await Recipe.create(doc);
    return res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

//отримання рецепта за його id

export const getRecipeByIdController = async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user._id;
  const recipe = await getRecipeById(recipeId, userId);

  // Відповідь, якщо  рецепт не знайдено
  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }
  // Відповідь, якщо рецепт знайдено
  res.status(200).json({
    status: 200,
    message: 'Successfully found recipe!',
    data: contact,
  });
};
