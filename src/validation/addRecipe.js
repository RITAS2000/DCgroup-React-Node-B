import Joi from 'joi';

const ingredientItem = Joi.object({
  name: Joi.string().trim().required(),
  measure: Joi.string().trim().required(),
  id: Joi.string().trim(),
});

export const recipeSchema = Joi.object({
  title: Joi.string().trim().max(64).required(),
  description: Joi.string().trim().max(200).required(),
  time: Joi.number().integer().min(1).max(360).required(),
  calories: Joi.number().integer().min(1).max(10000).optional(),

  category: Joi.alternatives()
    .try(
      Joi.string().trim().min(1),
      Joi.array().items(Joi.string().trim().min(1)).min(1),
    )
    .required(),

  ingredients: Joi.array().items(ingredientItem).min(2).max(16).required(),

  instructions: Joi.string().trim().max(1200).required(),
  thumb: Joi.string(),
});
