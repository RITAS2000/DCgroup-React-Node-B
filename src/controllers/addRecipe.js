import { addRecipeService } from '../services/addRecipe.js';

export const createRecipe = async (req, res, next) => {
  try {
    const recipe = await addRecipeService({
      userId: req.owner.id,
      body: req.body,
      file: req.file || null,
    });

    res.status(201).json({
      status: 201,
      message: 'Recipe created successfully',
      data: recipe,
    });
  } catch (err) {
    next(err);
  }
};
